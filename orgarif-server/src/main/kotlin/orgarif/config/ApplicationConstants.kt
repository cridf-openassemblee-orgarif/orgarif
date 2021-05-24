package orgarif.config

import java.time.ZoneId

object ApplicationConstants {
    // FIXMENOW remove !
    const val springMvcModelKeyStackTrace = "stackTrace"

    const val applicationMailSenderName = "Mail automatique Orgarif"

    // TODO[orgarif]
    const val applicationMail = "nepasrepondre@iledefrance.fr"

    const val staticResourcesPath = "/static"

    val parisZoneId = ZoneId.of("Europe/Paris")
}
