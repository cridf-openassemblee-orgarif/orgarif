package orgarif.utils

import org.apache.commons.lang3.StringUtils
import java.util.*

object OrgarifStringUtils {

    val filteredPassword = "************"

    fun stripAccents(value: String) = StringUtils.stripAccents(value)

    fun serializeUuid(uuid: UUID) = uuid.toString().replace("-", "").toLowerCase()

    fun deserializeUuid(id: String) =
            if (id.length == 32) {
                UUID.fromString("${id.substring(0, 8)}-${id.substring(8, 12)}-${id.substring(12, 16)}-" +
                        "${id.substring(16, 20)}-${id.substring(20)}")
            } else if (id.length == 36) {
                UUID.fromString(id)
            } else {
                throw IllegalAccessException("Can't unserialize UUID $id")
            }

}