/*
 * This file is generated by jOOQ.
 */
package orgarif.jooq.generated.tables

import java.time.Instant
import java.time.LocalDate
import java.util.UUID
import org.jooq.Field
import org.jooq.ForeignKey
import org.jooq.Name
import org.jooq.Record
import org.jooq.Records
import org.jooq.Row7
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
import orgarif.jooq.generated.keys.DELIBERATION_PKEY
import orgarif.jooq.generated.tables.records.DeliberationRecord

/** This class is generated by jOOQ. */
@Suppress("UNCHECKED_CAST")
open class DeliberationTable(
    alias: Name,
    child: Table<out Record>?,
    path: ForeignKey<out Record, DeliberationRecord>?,
    aliased: Table<DeliberationRecord>?,
    parameters: Array<Field<*>?>?
) :
    TableImpl<DeliberationRecord>(
        alias,
        PublicTable.PUBLIC,
        child,
        path,
        aliased,
        parameters,
        DSL.comment(""),
        TableOptions.table()) {
    companion object {

        /** The reference instance of <code>public.deliberation</code> */
        val DELIBERATION: DeliberationTable = DeliberationTable()
    }

    /** The class holding records for this type */
    override fun getRecordType(): Class<DeliberationRecord> = DeliberationRecord::class.java

    /** The column <code>public.deliberation.id</code>. */
    val ID: TableField<DeliberationRecord, UUID?> =
        createField(DSL.name("id"), SQLDataType.UUID.nullable(false), this, "")

    /** The column <code>public.deliberation.libelle</code>. */
    val LIBELLE: TableField<DeliberationRecord, String?> =
        createField(DSL.name("libelle"), SQLDataType.VARCHAR(255).nullable(false), this, "")

    /** The column <code>public.deliberation.search_libelle</code>. */
    val SEARCH_LIBELLE: TableField<DeliberationRecord, String?> =
        createField(DSL.name("search_libelle"), SQLDataType.VARCHAR(255).nullable(false), this, "")

    /** The column <code>public.deliberation.deliberation_date</code>. */
    val DELIBERATION_DATE: TableField<DeliberationRecord, LocalDate?> =
        createField(DSL.name("deliberation_date"), SQLDataType.LOCALDATE.nullable(false), this, "")

    /** The column <code>public.deliberation.status</code>. */
    val STATUS: TableField<DeliberationRecord, String?> =
        createField(DSL.name("status"), SQLDataType.VARCHAR(255).nullable(false), this, "")

    /** The column <code>public.deliberation.creation_date</code>. */
    val CREATION_DATE: TableField<DeliberationRecord, Instant?> =
        createField(
            DSL.name("creation_date"),
            SQLDataType.TIMESTAMPWITHTIMEZONE(6).nullable(false),
            this,
            "",
            TimestampWithTimeZoneToInstantJooqConverter())

    /** The column <code>public.deliberation.last_modification_date</code>. */
    val LAST_MODIFICATION_DATE: TableField<DeliberationRecord, Instant?> =
        createField(
            DSL.name("last_modification_date"),
            SQLDataType.TIMESTAMPWITHTIMEZONE(6).nullable(false),
            this,
            "",
            TimestampWithTimeZoneToInstantJooqConverter())

    private constructor(
        alias: Name,
        aliased: Table<DeliberationRecord>?
    ) : this(alias, null, null, aliased, null)
    private constructor(
        alias: Name,
        aliased: Table<DeliberationRecord>?,
        parameters: Array<Field<*>?>?
    ) : this(alias, null, null, aliased, parameters)

    /** Create an aliased <code>public.deliberation</code> table reference */
    constructor(alias: String) : this(DSL.name(alias))

    /** Create an aliased <code>public.deliberation</code> table reference */
    constructor(alias: Name) : this(alias, null)

    /** Create a <code>public.deliberation</code> table reference */
    constructor() : this(DSL.name("deliberation"), null)

    constructor(
        child: Table<out Record>,
        key: ForeignKey<out Record, DeliberationRecord>
    ) : this(Internal.createPathAlias(child, key), child, key, DELIBERATION, null)
    override fun getSchema(): Schema? = if (aliased()) null else PublicTable.PUBLIC
    override fun getPrimaryKey(): UniqueKey<DeliberationRecord> = DELIBERATION_PKEY
    override fun `as`(alias: String): DeliberationTable = DeliberationTable(DSL.name(alias), this)
    override fun `as`(alias: Name): DeliberationTable = DeliberationTable(alias, this)
    override fun `as`(alias: Table<*>): DeliberationTable =
        DeliberationTable(alias.getQualifiedName(), this)

    /** Rename this table */
    override fun rename(name: String): DeliberationTable = DeliberationTable(DSL.name(name), null)

    /** Rename this table */
    override fun rename(name: Name): DeliberationTable = DeliberationTable(name, null)

    /** Rename this table */
    override fun rename(name: Table<*>): DeliberationTable =
        DeliberationTable(name.getQualifiedName(), null)

    // -------------------------------------------------------------------------
    // Row7 type methods
    // -------------------------------------------------------------------------
    override fun fieldsRow():
        Row7<UUID?, String?, String?, LocalDate?, String?, Instant?, Instant?> =
        super.fieldsRow() as Row7<UUID?, String?, String?, LocalDate?, String?, Instant?, Instant?>

    /** Convenience mapping calling {@link SelectField#convertFrom(Function)}. */
    fun <U> mapping(
        from: (UUID?, String?, String?, LocalDate?, String?, Instant?, Instant?) -> U
    ): SelectField<U> = convertFrom(Records.mapping(from))

    /** Convenience mapping calling {@link SelectField#convertFrom(Class, Function)}. */
    fun <U> mapping(
        toType: Class<U>,
        from: (UUID?, String?, String?, LocalDate?, String?, Instant?, Instant?) -> U
    ): SelectField<U> = convertFrom(toType, Records.mapping(from))
}