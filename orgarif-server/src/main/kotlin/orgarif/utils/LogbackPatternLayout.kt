package orgarif.utils

import ch.qos.logback.classic.PatternLayout

class LogbackPatternLayout : PatternLayout() {
    companion object {
        init {
            defaultConverterMap["userSession"] = LogbackUserSessionConverter::class.qualifiedName
        }
    }
}