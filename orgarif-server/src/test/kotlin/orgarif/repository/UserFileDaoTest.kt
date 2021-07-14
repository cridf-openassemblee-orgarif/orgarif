package orgarif.repository

import orgarif.jooq.generated.Tables.USER_FILE
import orgarif.repository.UserFileDao
import org.jooq.TableField
import org.junit.Assert.assertEquals
import org.junit.Test
import org.reflections.ReflectionUtils

internal class UserFileDaoTest {

    @Test
    fun `test fields exhaustiveness`() {
        val jooqFields = ReflectionUtils.getAllFields(USER_FILE.javaClass)
        val fields = jooqFields
            .filter { it.type == TableField::class.java }
            .map { it.get(USER_FILE) }
            .toSet()
        val daoFields = UserFileDao.UserFileField.values().map { it.field }.toSet()
        assertEquals(fields, daoFields)
    }

}
