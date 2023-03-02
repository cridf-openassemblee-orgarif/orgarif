package orgarif.config

import java.time.ZoneId

object ApplicationConstants {
    // FIXME[tmpl] remove !
    const val springMvcModelKeyStackTrace = "stackTrace"

    // TODO[tmpl] /res vs /static
    const val resourcesPath = "/static"

    // TODO[tmpl] naming... Monitoring ?
    const val applicationMailSenderName = "Automatic email Orgarif"

    // FIXME[tmpl] mail !
    const val applicationMail = ""

    val parisZoneId = ZoneId.of("Europe/Paris")
}
