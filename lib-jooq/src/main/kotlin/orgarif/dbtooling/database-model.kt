package orgarif.dbtooling

import org.jooq.Table

inline class SqlQueryString(val sql: String)
inline class References(val tables: Set<Table<*>>)

