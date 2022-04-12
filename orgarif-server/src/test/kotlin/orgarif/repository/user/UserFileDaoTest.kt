package orgarif.repository.user

import org.jooq.TableField
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.reflections.ReflectionUtils
import orgarif.ResetTestDatabase
import orgarif.jooq.generated.Tables.USER_FILE

internal class UserFileDaoTest {

    @BeforeEach
    fun init() {
        ResetTestDatabase.resetDatabaseSchema(false)
    }

    @Test
    fun `test fields exhaustiveness`() {
        val jooqFields = ReflectionUtils.getAllFields(USER_FILE.javaClass)
        val fields =
            jooqFields
                .filter { it.type == TableField::class.java }
                .map { it.get(USER_FILE) }
                .toSet()
        val daoFields = UserFileDao.UserFileField.values().map { it.field }.toSet()
        assertEquals(fields, daoFields)
    }
}
