package orgarif.service

import mu.KotlinLogging
import okhttp3.Credentials
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import orgarif.config.ApplicationConstants
import orgarif.service.MailService.MailJetMail
import orgarif.service.utils.ApplicationTaskExecutor

@Service
class DebugMailService(
    @Value("\${mailjet.url}") val url: String,
    @Value("\${mailjet.api-key}") val apiKey: String,
    @Value("\${mailjet.secret-key}") val secretKey: String,
    @Value("\${mail.devLogSender}") val devLogSenderMail: String,
    @Value("\${mail.devDestination}") val devDestinationMail: String,
    val applicationInstance: ApplicationInstance,
    val httpService: HttpService,
    val taskExecutor: ApplicationTaskExecutor
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

    fun devMail(
        mailSubject: String,
        mailContent: String,
        monitoringCategory: String? = null
    ) {
        taskExecutor.execute {
            val body = DebugMailJetMessages(
                listOf(
                    DebugMailJetMessage(
                        MailJetMail(devLogSenderMail, "Orgarif app"),
                        listOf(MailJetMail(devDestinationMail, "dev orgarif")),
                        "[${applicationInstance.env}] $mailSubject", mailContent, monitoringCategory
                    )
                )
            )
            val json = MailService.mailJetObjectMapper.writeValueAsString(body)
            val r = try {
                httpService.postAndReturnString(
                    url, json, HttpService.HttpMediaType.json,
                    HttpService.Header.authorization to Credentials.basic(apiKey, secretKey)
                )
            } catch (e: Exception) {
                logger.error { "Failed to send debug mail" }
                throw e
            }
            if (r.code != 200) {
                logger.error {
                    "Couldn't send mail :\n${r.body}\n$json"
                }
            }
        }
    }

}
