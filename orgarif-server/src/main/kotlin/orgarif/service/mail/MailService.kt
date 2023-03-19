package orgarif.service.mail

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategy
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.databind.cfg.MapperConfig
import com.fasterxml.jackson.databind.introspect.AnnotatedField
import com.fasterxml.jackson.databind.introspect.AnnotatedMethod
import java.util.Base64
import mu.KotlinLogging
import okhttp3.Credentials
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import orgarif.domain.ApplicationEnvironment
import orgarif.domain.DeploymentLogId
import orgarif.domain.MailLogId
import orgarif.domain.MailReference
import orgarif.domain.MimeType
import orgarif.domain.Uri
import orgarif.domain.UserId
import orgarif.error.MessageNotSentException
import orgarif.repository.log.MailLogDao
import orgarif.service.utils.ApplicationInstance
import orgarif.service.utils.DateService
import orgarif.service.utils.HttpService
import orgarif.service.utils.random.RandomService

@Service
class MailService(
    @Value("\${mailjet.url}") private val url: Uri,
    @Value("\${mailjet.api-key}") private val apiKey: String,
    @Value("\${mailjet.secret-key}") private val secretKey: String,
    @Value("\${mail.devLogSender}") private val devLogSenderMail: String,
    private val httpService: HttpService,
    private val mailLogDao: MailLogDao,
    private val dateService: DateService,
    private val randomService: RandomService
) {

    private val logger = KotlinLogging.logger {}

    companion object {
        val mailJetObjectMapper by lazy {
            ObjectMapper().apply {
                propertyNamingStrategy = MyPropertyNamingStrategy()
                enable(SerializationFeature.INDENT_OUTPUT)
            }
        }
    }

    // TODO[tmpl][mail] the uppercase on first letter: ask it to the serializer ?
    data class MailJetMail(val Email: String, val Name: String)

    // TODO[tmpl][mail] is it possible to limit the strings here ?
    data class MailJetAttachment(
        val ContentType: String,
        val Filename: String,
        val Base64Content: String
    )

    private data class MailJetMessage(
        val From: MailJetMail,
        val To: List<MailJetMail>,
        val Subject: String,
        // TODO[tmpl] ?
        //                          val TextPart: String,
        val HTMLPart: String,
        val Attachments: List<MailJetAttachment>,
        val CustomID: String,
        val CustomCampaign: String,
        val EventPayload: String
    )

    private data class MailJetMessages(val Messages: List<MailJetMessage>)

    // TODO[tmpl][mail][doc] this informations is here to display the environnement which sent the
    // mail in mailjet ui
    private data class MailJetEventPayload(val env: String)

    // TODO[tmpl][mail] check this... + uppercase first letter handled here ?
    private class MyPropertyNamingStrategy : PropertyNamingStrategy() {
        override fun nameForField(
            config: MapperConfig<*>?,
            field: AnnotatedField,
            defaultName: String
        ) = convert(field.name)

        override fun nameForGetterMethod(
            config: MapperConfig<*>?,
            method: AnnotatedMethod,
            defaultName: String
        ) = convert(method.name.toString())

        override fun nameForSetterMethod(
            config: MapperConfig<*>?,
            method: AnnotatedMethod,
            defaultName: String
        ) = convert(method.name.toString())

        private fun convert(input: String) = input.substring(3)
    }

    enum class MailLog {
        DoLog,
        DoNotLog
    }

    data class MailLogProperties(
        val deploymentLogId: DeploymentLogId,
        val userId: UserId,
        val jsonData: String
    )

    data class Attachment(val filename: String, val content: ByteArray, val contentType: MimeType)

    fun sendMail(
        senderName: String,
        senderMail: String,
        recipientName: String,
        recipientMail: String,
        mailSubject: String,
        mailContent: String,
        mailReference: MailReference,
        logMail: MailLog,
        mailLogProperties: MailLogProperties? = null,
        attachments: List<Attachment>? = null
    ): MailLogId? {
        if (ApplicationInstance.env == ApplicationEnvironment.Dev &&
            recipientMail != devLogSenderMail) {
            throw IllegalArgumentException("Mail send canceled en env dev to ${recipientMail}")
        }
        val mailLogId = randomService.id<MailLogId>()
        val payload =
            mailJetObjectMapper.writeValueAsString(
                MailJetEventPayload(ApplicationInstance.env.name))
        val subject =
            if (ApplicationInstance.env == ApplicationEnvironment.Prod) mailSubject
            else "[${ApplicationInstance.env}] $mailSubject"
        val mailJetAttachments =
            (attachments ?: emptyList()).map {
                MailJetAttachment(
                    it.contentType.fullType,
                    it.filename,
                    Base64.getEncoder().encodeToString(it.content))
            }
        val campaignName =
            mailReference.name +
                (if (ApplicationInstance.env != ApplicationEnvironment.Prod)
                    "-${ApplicationInstance.env}"
                else "")
        val body =
            MailJetMessages(
                listOf(
                    MailJetMessage(
                        MailJetMail(senderMail, senderName),
                        listOf(MailJetMail(recipientMail, recipientName)),
                        subject,
                        mailContent,
                        mailJetAttachments,
                        mailLogIdToString(mailLogId),
                        campaignName,
                        payload)))
        val json = mailJetObjectMapper.writeValueAsString(body)
        val response =
            try {
                httpService.execute(
                    HttpMethod.POST,
                    url,
                    json,
                    HttpService.Header.Authorization to Credentials.basic(apiKey, secretKey))
            } catch (e: Exception) {
                logger.error {
                    "Failed to send mail to $recipientMail. Mail log properties & content is following =>"
                }
                logger.info { mailLogProperties }
                logger.info { mailContent }
                throw e
            }
        if (response.code != HttpStatus.OK) {
            logger.trace { response }
            throw MessageNotSentException("${response.code} $recipientMail $mailSubject")
        }
        return when (logMail) {
            MailLog.DoLog -> {
                mailLogProperties ?: throw IllegalArgumentException("$recipientMail $mailSubject")
                try {
                    mailLogDao.insert(
                        MailLogDao.Record(
                            mailLogId,
                            mailLogProperties.deploymentLogId,
                            mailLogProperties.userId,
                            mailReference,
                            recipientMail,
                            mailLogProperties.jsonData,
                            subject,
                            mailContent,
                            dateService.now()))
                    logger.info { "Mail sent & logged to $recipientMail" }
                } catch (e: Exception) {
                    logger.error {
                        "Mail sent but failed to log mail to $recipientMail. Mail log properties & content is " +
                            "following =>"
                    }
                    logger.info { mailLogProperties }
                    logger.info { mailContent }
                    throw e
                }
                mailLogId
            }
            MailLog.DoNotLog -> {
                logger.info { "Mail sent (no log) to $recipientMail" }
                null
            }
        }
    }

    fun mailLogIdToString(mailLogId: MailLogId) = mailLogId.rawId.toString()
}
