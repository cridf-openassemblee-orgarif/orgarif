/*
 * This file is generated by jOOQ.
 */
package orgarif.jooq.generated.tables

import java.time.Instant
import java.util.UUID
import kotlin.collections.List
import org.jooq.Field
import org.jooq.ForeignKey
import org.jooq.Index
import org.jooq.Name
import org.jooq.Record
import org.jooq.Records
import org.jooq.Row5
import org.jooq.Schema
import org.jooq.SelectField
import org.jooq.Table
import org.jooq.TableField
import org.jooq.TableOptions
import org.jooq.UniqueKey
import org.jooq.impl.DSL
import org.jooq.impl.Internal
import org.jooq.impl.SQLDataType
import org.jooq.impl.TableImpl
import orgarif.database.jooq.converter.TimestampWithTimeZoneToInstantJooqConverter
import orgarif.jooq.generated.PublicTable
import orgarif.jooq.generated.indexes.USER_MAIL_LOG_USER_ID_IDX
import orgarif.jooq.generated.keys.USER_MAIL_LOG_PKEY
import orgarif.jooq.generated.keys.USER_MAIL_LOG__USER_MAIL_LOG_USER_ID_FKEY
import orgarif.jooq.generated.tables.records.UserMailLogRecord

/** This class is generated by jOOQ. */
@Suppress("UNCHECKED_CAST")
open class UserMailLogTable(
    alias: Name,
    child: Table<out Record>?,
    path: ForeignKey<out Record, UserMailLogRecord>?,
    aliased: Table<UserMailLogRecord>?,
    parameters: Array<Field<*>?>?
) :
    TableImpl<UserMailLogRecord>(
        alias,
        PublicTable.PUBLIC,
        child,
        path,
        aliased,
        parameters,
        DSL.comment(""),
        TableOptions.table()) {
    companion object {

        /** The reference instance of <code>public.user_mail_log</code> */
        val USER_MAIL_LOG: UserMailLogTable = UserMailLogTable()
    }

    /** The class holding records for this type */
    override fun getRecordType(): Class<UserMailLogRecord> = UserMailLogRecord::class.java

    /** The column <code>public.user_mail_log.id</code>. */
    val ID: TableField<UserMailLogRecord, UUID?> =
        createField(DSL.name("id"), SQLDataType.UUID.nullable(false), this, "")

    /** The column <code>public.user_mail_log.user_id</code>. */
    val USER_ID: TableField<UserMailLogRecord, UUID?> =
        createField(DSL.name("user_id"), SQLDataType.UUID.nullable(false), this, "")

    /** The column <code>public.user_mail_log.mail</code>. */
    val MAIL: TableField<UserMailLogRecord, String?> =
        createField(DSL.name("mail"), SQLDataType.VARCHAR(255).nullable(false), this, "")

    /** The column <code>public.user_mail_log.type</code>. */
    val TYPE: TableField<UserMailLogRecord, String?> =
        createField(DSL.name("type"), SQLDataType.VARCHAR(255).nullable(false), this, "")

    /** The column <code>public.user_mail_log.creation_date</code>. */
    val CREATION_DATE: TableField<UserMailLogRecord, Instant?> =
        createField(
            DSL.name("creation_date"),
            SQLDataType.TIMESTAMPWITHTIMEZONE(6).nullable(false),
            this,
            "",
            TimestampWithTimeZoneToInstantJooqConverter())

    private constructor(
        alias: Name,
        aliased: Table<UserMailLogRecord>?
    ) : this(alias, null, null, aliased, null)
    private constructor(
        alias: Name,
        aliased: Table<UserMailLogRecord>?,
        parameters: Array<Field<*>?>?
    ) : this(alias, null, null, aliased, parameters)

    /** Create an aliased <code>public.user_mail_log</code> table reference */
    constructor(alias: String) : this(DSL.name(alias))

    /** Create an aliased <code>public.user_mail_log</code> table reference */
    constructor(alias: Name) : this(alias, null)

    /** Create a <code>public.user_mail_log</code> table reference */
    constructor() : this(DSL.name("user_mail_log"), null)

    constructor(
        child: Table<out Record>,
        key: ForeignKey<out Record, UserMailLogRecord>
    ) : this(Internal.createPathAlias(child, key), child, key, USER_MAIL_LOG, null)
    override fun getSchema(): Schema? = if (aliased()) null else PublicTable.PUBLIC
    override fun getIndexes(): List<Index> = listOf(USER_MAIL_LOG_USER_ID_IDX)
    override fun getPrimaryKey(): UniqueKey<UserMailLogRecord> = USER_MAIL_LOG_PKEY
    override fun getReferences(): List<ForeignKey<UserMailLogRecord, *>> =
        listOf(USER_MAIL_LOG__USER_MAIL_LOG_USER_ID_FKEY)

    private lateinit var _appUser: AppUserTable

    /** Get the implicit join path to the <code>public.app_user</code> table. */
    fun appUser(): AppUserTable {
        if (!this::_appUser.isInitialized)
            _appUser = AppUserTable(this, USER_MAIL_LOG__USER_MAIL_LOG_USER_ID_FKEY)

        return _appUser
    }

    val appUser: AppUserTable
        get(): AppUserTable = appUser()
    override fun `as`(alias: String): UserMailLogTable = UserMailLogTable(DSL.name(alias), this)
    override fun `as`(alias: Name): UserMailLogTable = UserMailLogTable(alias, this)
    override fun `as`(alias: Table<*>): UserMailLogTable =
        UserMailLogTable(alias.getQualifiedName(), this)

    /** Rename this table */
    override fun rename(name: String): UserMailLogTable = UserMailLogTable(DSL.name(name), null)

    /** Rename this table */
    override fun rename(name: Name): UserMailLogTable = UserMailLogTable(name, null)

    /** Rename this table */
    override fun rename(name: Table<*>): UserMailLogTable =
        UserMailLogTable(name.getQualifiedName(), null)

    // -------------------------------------------------------------------------
    // Row5 type methods
    // -------------------------------------------------------------------------
    override fun fieldsRow(): Row5<UUID?, UUID?, String?, String?, Instant?> =
        super.fieldsRow() as Row5<UUID?, UUID?, String?, String?, Instant?>

    /** Convenience mapping calling {@link SelectField#convertFrom(Function)}. */
    fun <U> mapping(from: (UUID?, UUID?, String?, String?, Instant?) -> U): SelectField<U> =
        convertFrom(Records.mapping(from))

    /** Convenience mapping calling {@link SelectField#convertFrom(Class, Function)}. */
    fun <U> mapping(
        toType: Class<U>,
        from: (UUID?, UUID?, String?, String?, Instant?) -> U
    ): SelectField<U> = convertFrom(toType, Records.mapping(from))
}