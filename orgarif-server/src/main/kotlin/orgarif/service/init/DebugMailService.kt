package orgarif.service.init

import mu.KotlinLogging
import okhttp3.Credentials
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import orgarif.domain.ApplicationEnvironment
import orgarif.service.mail.MailService
import orgarif.service.mail.MailService.MailJetMail
import orgarif.service.utils.ApplicationInstance
import orgarif.service.utils.ApplicationTaskExecutor
import orgarif.service.utils.HttpService

@Service
class DebugMailService(
    @Value("\${mailjet.url}") private val url: String,
    @Value("\${mailjet.api-key}") private val apiKey: String,
    @Value("\${mailjet.secret-key}") private val secretKey: String,
    @Value("\${mail.devLogSender}") private val devLogSenderMail: String,
    @Value("\${mail.devDestination}") private val devDestinationMail: String,
    private val httpService: HttpService,
    private val taskExecutor: ApplicationTaskExecutor
) {

    private val logger = KotlinLogging.logger {}

    private data class DebugMailJetMessage(
        val From: MailJetMail,
        val To: List<MailJetMail>,
        val Subject: String,
        val HTMLPart: String,
        val MonitoringCategory: String?
    )

    private data class DebugMailJetMessages(val Messages: List<DebugMailJetMessage>)

    // TODO[tmpl] warn if devDestination empty at start (async)
    fun devMail(mailSubject: String, mailContent: String, monitoringCategory: String? = null) {
        // TODO[tmpl] in conf instead ?
        if (ApplicationInstance.env !in
            setOf(ApplicationEnvironment.Dev, ApplicationEnvironment.Test)) {
            taskExecutor.execute {
                val body =
                    DebugMailJetMessages(
                        listOf(
                            DebugMailJetMessage(
                                MailJetMail(devLogSenderMail, "Orgarif app"),
                                listOf(MailJetMail(devDestinationMail, "dev orgarif")),
                                "[${ApplicationInstance.env}] $mailSubject",
                                mailContent,
                                monitoringCategory)))
                val json = MailService.mailJetObjectMapper.writeValueAsString(body)
                try {
                    val r =
                        httpService.execute(
                            HttpMethod.POST,
                            url,
                            json,
                            HttpService.Header.Authorization to
                                Credentials.basic(apiKey, secretKey))
                    if (r.code != HttpStatus.OK) {
                        logger.error {
                            "Failed to send debug mail: ${r.code}\n${r.bodyString}\n$json"
                        }
                    }
                } catch (e: Exception) {
                    logger.error(e) { "Failed to send debug mail\n$json" }
                }
            }
        }
    }
}
