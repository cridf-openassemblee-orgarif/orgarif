package orgarif.utils

import org.apache.commons.lang3.StringUtils

object OrgarifStringUtils {

    val filteredPassword = "****** filteredPassword ******"

    fun removeAccents(value: String) = StringUtils.stripAccents(value)
}
