/*
 * This file is generated by jOOQ.
 */
package orgarif.jooq.generated.tables

import java.time.Instant
import java.util.UUID
import kotlin.collections.List
import org.jooq.Field
import org.jooq.ForeignKey
import org.jooq.Name
import org.jooq.Record
import org.jooq.Records
import org.jooq.Row6
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
import orgarif.jooq.generated.keys.USER_FILE_PKEY
import orgarif.jooq.generated.keys.USER_FILE__USER_FILE_USER_ID_FKEY
import orgarif.jooq.generated.tables.records.UserFileRecord

/** This class is generated by jOOQ. */
@Suppress("UNCHECKED_CAST")
open class UserFileTable(
    alias: Name,
    child: Table<out Record>?,
    path: ForeignKey<out Record, UserFileRecord>?,
    aliased: Table<UserFileRecord>?,
    parameters: Array<Field<*>?>?
) :
    TableImpl<UserFileRecord>(
        alias,
        PublicTable.PUBLIC,
        child,
        path,
        aliased,
        parameters,
        DSL.comment(""),
        TableOptions.table()) {
    companion object {

        /** The reference instance of <code>public.user_file</code> */
        val USER_FILE: UserFileTable = UserFileTable()
    }

    /** The class holding records for this type */
    override fun getRecordType(): Class<UserFileRecord> = UserFileRecord::class.java

    /** The column <code>public.user_file.id</code>. */
    val ID: TableField<UserFileRecord, UUID?> =
        createField(DSL.name("id"), SQLDataType.UUID.nullable(false), this, "")

    /** The column <code>public.user_file.user_id</code>. */
    val USER_ID: TableField<UserFileRecord, UUID?> =
        createField(DSL.name("user_id"), SQLDataType.UUID.nullable(false), this, "")

    /** The column <code>public.user_file.file_content</code>. */
    val FILE_CONTENT: TableField<UserFileRecord, ByteArray?> =
        createField(DSL.name("file_content"), SQLDataType.BLOB.nullable(false), this, "")

    /** The column <code>public.user_file.content_type</code>. */
    val CONTENT_TYPE: TableField<UserFileRecord, String?> =
        createField(DSL.name("content_type"), SQLDataType.VARCHAR(255).nullable(false), this, "")

    /** The column <code>public.user_file.original_filename</code>. */
    val ORIGINAL_FILENAME: TableField<UserFileRecord, String?> =
        createField(DSL.name("original_filename"), SQLDataType.CLOB.nullable(false), this, "")

    /** The column <code>public.user_file.upload_date</code>. */
    val UPLOAD_DATE: TableField<UserFileRecord, Instant?> =
        createField(
            DSL.name("upload_date"),
            SQLDataType.TIMESTAMPWITHTIMEZONE(6).nullable(false),
            this,
            "",
            TimestampWithTimeZoneToInstantJooqConverter())

    private constructor(
        alias: Name,
        aliased: Table<UserFileRecord>?
    ) : this(alias, null, null, aliased, null)
    private constructor(
        alias: Name,
        aliased: Table<UserFileRecord>?,
        parameters: Array<Field<*>?>?
    ) : this(alias, null, null, aliased, parameters)

    /** Create an aliased <code>public.user_file</code> table reference */
    constructor(alias: String) : this(DSL.name(alias))

    /** Create an aliased <code>public.user_file</code> table reference */
    constructor(alias: Name) : this(alias, null)

    /** Create a <code>public.user_file</code> table reference */
    constructor() : this(DSL.name("user_file"), null)

    constructor(
        child: Table<out Record>,
        key: ForeignKey<out Record, UserFileRecord>
    ) : this(Internal.createPathAlias(child, key), child, key, USER_FILE, null)
    override fun getSchema(): Schema? = if (aliased()) null else PublicTable.PUBLIC
    override fun getPrimaryKey(): UniqueKey<UserFileRecord> = USER_FILE_PKEY
    override fun getReferences(): List<ForeignKey<UserFileRecord, *>> =
        listOf(USER_FILE__USER_FILE_USER_ID_FKEY)

    private lateinit var _appUser: AppUserTable

    /** Get the implicit join path to the <code>public.app_user</code> table. */
    fun appUser(): AppUserTable {
        if (!this::_appUser.isInitialized)
            _appUser = AppUserTable(this, USER_FILE__USER_FILE_USER_ID_FKEY)

        return _appUser
    }

    val appUser: AppUserTable
        get(): AppUserTable = appUser()
    override fun `as`(alias: String): UserFileTable = UserFileTable(DSL.name(alias), this)
    override fun `as`(alias: Name): UserFileTable = UserFileTable(alias, this)
    override fun `as`(alias: Table<*>): UserFileTable =
        UserFileTable(alias.getQualifiedName(), this)

    /** Rename this table */
    override fun rename(name: String): UserFileTable = UserFileTable(DSL.name(name), null)

    /** Rename this table */
    override fun rename(name: Name): UserFileTable = UserFileTable(name, null)

    /** Rename this table */
    override fun rename(name: Table<*>): UserFileTable =
        UserFileTable(name.getQualifiedName(), null)

    // -------------------------------------------------------------------------
    // Row6 type methods
    // -------------------------------------------------------------------------
    override fun fieldsRow(): Row6<UUID?, UUID?, ByteArray?, String?, String?, Instant?> =
        super.fieldsRow() as Row6<UUID?, UUID?, ByteArray?, String?, String?, Instant?>

    /** Convenience mapping calling {@link SelectField#convertFrom(Function)}. */
    fun <U> mapping(
        from: (UUID?, UUID?, ByteArray?, String?, String?, Instant?) -> U
    ): SelectField<U> = convertFrom(Records.mapping(from))

    /** Convenience mapping calling {@link SelectField#convertFrom(Class, Function)}. */
    fun <U> mapping(
        toType: Class<U>,
        from: (UUID?, UUID?, ByteArray?, String?, String?, Instant?) -> U
    ): SelectField<U> = convertFrom(toType, Records.mapping(from))
}
