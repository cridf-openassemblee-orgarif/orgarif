package orgarif.utils

import ch.qos.logback.classic.PatternLayout

class LogbackPatternLayout : PatternLayout() {
    companion object {
        init {
            defaultConverterMap["ip"] = LogbackIpConverter::class.qualifiedName
            defaultConverterMap["userSession"] = LogbackUserSessionConverter::class.qualifiedName
        }
    }
}
