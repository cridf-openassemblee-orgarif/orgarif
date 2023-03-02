package orgarif.repository.user

import org.jooq.Field
import org.jooq.TableField
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.reflections.ReflectionUtils
import orgarif.jooq.generated.Tables.USER_FILE

internal class UserFileDaoTest {

    @Test
    fun `test fields exhaustiveness`() {
        val jooqFields =
            ReflectionUtils.getAllFields(USER_FILE.javaClass)
                .filter { it.type == TableField::class.java }
                .map { it.get(USER_FILE) as Field<*> }
        val nonDataFields = jooqFields.filter { it.type != ByteArray::class.java }.toSet()
        assertEquals(nonDataFields, UserFileDao.nonDataFields)
    }
}
