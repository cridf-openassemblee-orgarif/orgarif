package orgarif.config

import java.time.ZoneId

object ApplicationConstants {
    const val springMvcModelKeyStackTrace = "stackTrace"

    const val applicationMailSenderName = "Mail automatique Orgarif"

    // TODO[orgarif]
    const val applicationMail = "nepasrepondre@iledefrance.fr"

    const val resourcesPath = "/res"

    val parisZoneId = ZoneId.of("Europe/Paris")
}
