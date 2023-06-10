package orgarif.database.utils

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class SqlDependenciesResolverTest {

    // TODO a dependency fail
    @Test
    fun test() {
        val userSql =
            """
CREATE TABLE app_user
(
    id UUID PRIMARY KEY,
    file UUID
);

ALTER TABLE app_user ADD FOREIGN KEY(file) REFERENCES user_file(id);

CREATE INDEX ON app_user (mail);
        """
                .trimIndent()
        val userFileSql =
            """
-- comments are simply removed
CREATE TABLE user_file
(
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES app_user (id)
);
        """
                .trimIndent()
        assertEquals(
            """
CREATE TABLE app_user
(
    id UUID PRIMARY KEY,
    file UUID
);

CREATE TABLE user_file
(
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES app_user (id)
);

ALTER TABLE app_user ADD FOREIGN KEY(file) REFERENCES user_file(id);

CREATE INDEX ON app_user (mail);
        """
                .trimIndent(),
            SqlDependenciesResolver.resolveSql(listOf(userSql, userFileSql)))
    }

    @Test
    fun `test cyclic reference`() {
        val sql1 =
            """
CREATE TABLE test1
(
    id UUID PRIMARY KEY,
    test_id UUID,
    FOREIGN KEY (test_id) REFERENCES test2 (id)
);
"""
        val sql2 =
            """
CREATE TABLE test2
(
    id UUID PRIMARY KEY,
    test_id UUID,
    FOREIGN KEY (test_id) REFERENCES test3 (id)
);
"""
        val sql3 =
            """
CREATE TABLE test3
(
    id UUID PRIMARY KEY,
    test_id UUID,
    FOREIGN KEY (test_id) REFERENCES test1 (id)
);
"""
        SqlDependenciesResolver.resolveSql(listOf(sql1, sql2, sql3))
    }
}
