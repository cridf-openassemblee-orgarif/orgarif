package orgarif.utils

import ch.qos.logback.classic.PatternLayout

class LogbackPatternLayout : PatternLayout() {
    companion object {
        init {
            DEFAULT_CONVERTER_MAP["ip"] = LogbackIpConverter::class.qualifiedName
            DEFAULT_CONVERTER_MAP["userSession"] = LogbackUserSessionConverter::class.qualifiedName
        }
    }
}
