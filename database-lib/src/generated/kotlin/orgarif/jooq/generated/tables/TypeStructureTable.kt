/*
 * This file is generated by jOOQ.
 */
package orgarif.jooq.generated.tables

import java.time.Instant
import java.util.UUID
import org.jooq.Field
import org.jooq.ForeignKey
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
import orgarif.jooq.generated.keys.TYPE_STRUCTURE_PKEY
import orgarif.jooq.generated.tables.records.TypeStructureRecord

/** This class is generated by jOOQ. */
@Suppress("UNCHECKED_CAST")
open class TypeStructureTable(
    alias: Name,
    child: Table<out Record>?,
    path: ForeignKey<out Record, TypeStructureRecord>?,
    aliased: Table<TypeStructureRecord>?,
    parameters: Array<Field<*>?>?
) :
    TableImpl<TypeStructureRecord>(
        alias,
        PublicTable.PUBLIC,
        child,
        path,
        aliased,
        parameters,
        DSL.comment(""),
        TableOptions.table()) {
    companion object {

        /** The reference instance of <code>public.type_structure</code> */
        val TYPE_STRUCTURE: TypeStructureTable = TypeStructureTable()
    }

    /** The class holding records for this type */
    override fun getRecordType(): Class<TypeStructureRecord> = TypeStructureRecord::class.java

    /** The column <code>public.type_structure.id</code>. */
    val ID: TableField<TypeStructureRecord, UUID?> =
        createField(DSL.name("id"), SQLDataType.UUID.nullable(false), this, "")

    /** The column <code>public.type_structure.libelle</code>. */
    val LIBELLE: TableField<TypeStructureRecord, String?> =
        createField(DSL.name("libelle"), SQLDataType.VARCHAR(255).nullable(false), this, "")

    /** The column <code>public.type_structure.status</code>. */
    val STATUS: TableField<TypeStructureRecord, String?> =
        createField(DSL.name("status"), SQLDataType.VARCHAR(255).nullable(false), this, "")

    /** The column <code>public.type_structure.creation_date</code>. */
    val CREATION_DATE: TableField<TypeStructureRecord, Instant?> =
        createField(
            DSL.name("creation_date"),
            SQLDataType.TIMESTAMPWITHTIMEZONE(6).nullable(false),
            this,
            "",
            TimestampWithTimeZoneToInstantJooqConverter())

    /** The column <code>public.type_structure.last_modification_date</code>. */
    val LAST_MODIFICATION_DATE: TableField<TypeStructureRecord, Instant?> =
        createField(
            DSL.name("last_modification_date"),
            SQLDataType.TIMESTAMPWITHTIMEZONE(6).nullable(false),
            this,
            "",
            TimestampWithTimeZoneToInstantJooqConverter())

    private constructor(
        alias: Name,
        aliased: Table<TypeStructureRecord>?
    ) : this(alias, null, null, aliased, null)
    private constructor(
        alias: Name,
        aliased: Table<TypeStructureRecord>?,
        parameters: Array<Field<*>?>?
    ) : this(alias, null, null, aliased, parameters)

    /** Create an aliased <code>public.type_structure</code> table reference */
    constructor(alias: String) : this(DSL.name(alias))

    /** Create an aliased <code>public.type_structure</code> table reference */
    constructor(alias: Name) : this(alias, null)

    /** Create a <code>public.type_structure</code> table reference */
    constructor() : this(DSL.name("type_structure"), null)

    constructor(
        child: Table<out Record>,
        key: ForeignKey<out Record, TypeStructureRecord>
    ) : this(Internal.createPathAlias(child, key), child, key, TYPE_STRUCTURE, null)
    override fun getSchema(): Schema? = if (aliased()) null else PublicTable.PUBLIC
    override fun getPrimaryKey(): UniqueKey<TypeStructureRecord> = TYPE_STRUCTURE_PKEY
    override fun `as`(alias: String): TypeStructureTable = TypeStructureTable(DSL.name(alias), this)
    override fun `as`(alias: Name): TypeStructureTable = TypeStructureTable(alias, this)
    override fun `as`(alias: Table<*>): TypeStructureTable =
        TypeStructureTable(alias.getQualifiedName(), this)

    /** Rename this table */
    override fun rename(name: String): TypeStructureTable = TypeStructureTable(DSL.name(name), null)

    /** Rename this table */
    override fun rename(name: Name): TypeStructureTable = TypeStructureTable(name, null)

    /** Rename this table */
    override fun rename(name: Table<*>): TypeStructureTable =
        TypeStructureTable(name.getQualifiedName(), null)

    // -------------------------------------------------------------------------
    // Row5 type methods
    // -------------------------------------------------------------------------
    override fun fieldsRow(): Row5<UUID?, String?, String?, Instant?, Instant?> =
        super.fieldsRow() as Row5<UUID?, String?, String?, Instant?, Instant?>

    /** Convenience mapping calling {@link SelectField#convertFrom(Function)}. */
    fun <U> mapping(from: (UUID?, String?, String?, Instant?, Instant?) -> U): SelectField<U> =
        convertFrom(Records.mapping(from))

    /** Convenience mapping calling {@link SelectField#convertFrom(Class, Function)}. */
    fun <U> mapping(
        toType: Class<U>,
        from: (UUID?, String?, String?, Instant?, Instant?) -> U
    ): SelectField<U> = convertFrom(toType, Records.mapping(from))
}
