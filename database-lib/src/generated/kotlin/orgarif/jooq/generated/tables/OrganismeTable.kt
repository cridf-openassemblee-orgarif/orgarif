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
import org.jooq.Row11
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
import orgarif.jooq.generated.indexes.ORGANISME_DEPARTEMENT_ID_IDX
import orgarif.jooq.generated.indexes.ORGANISME_NATURE_JURIDIQUE_ID_IDX
import orgarif.jooq.generated.indexes.ORGANISME_SECTEUR_ID_IDX
import orgarif.jooq.generated.indexes.ORGANISME_TYPE_STRUCTURE_ID_IDX
import orgarif.jooq.generated.keys.ORGANISME_PKEY
import orgarif.jooq.generated.keys.ORGANISME__ORGANISME_NATURE_JURIDIQUE_ID_FKEY
import orgarif.jooq.generated.keys.ORGANISME__ORGANISME_SECTEUR_ID_FKEY
import orgarif.jooq.generated.keys.ORGANISME__ORGANISME_TYPE_STRUCTURE_ID_FKEY
import orgarif.jooq.generated.tables.records.OrganismeRecord

/** This class is generated by jOOQ. */
@Suppress("UNCHECKED_CAST")
open class OrganismeTable(
    alias: Name,
    child: Table<out Record>?,
    path: ForeignKey<out Record, OrganismeRecord>?,
    aliased: Table<OrganismeRecord>?,
    parameters: Array<Field<*>?>?
) :
    TableImpl<OrganismeRecord>(
        alias,
        PublicTable.PUBLIC,
        child,
        path,
        aliased,
        parameters,
        DSL.comment(""),
        TableOptions.table()) {
    companion object {

        /** The reference instance of <code>public.organisme</code> */
        val ORGANISME: OrganismeTable = OrganismeTable()
    }

    /** The class holding records for this type */
    override fun getRecordType(): Class<OrganismeRecord> = OrganismeRecord::class.java

    /** The column <code>public.organisme.id</code>. */
    val ID: TableField<OrganismeRecord, UUID?> =
        createField(DSL.name("id"), SQLDataType.UUID.nullable(false), this, "")

    /** The column <code>public.organisme.nom</code>. */
    val NOM: TableField<OrganismeRecord, String?> =
        createField(DSL.name("nom"), SQLDataType.VARCHAR(255).nullable(false), this, "")

    /** The column <code>public.organisme.departement_id</code>. */
    val DEPARTEMENT_ID: TableField<OrganismeRecord, UUID?> =
        createField(DSL.name("departement_id"), SQLDataType.UUID, this, "")

    /** The column <code>public.organisme.nature_juridique_id</code>. */
    val NATURE_JURIDIQUE_ID: TableField<OrganismeRecord, UUID?> =
        createField(DSL.name("nature_juridique_id"), SQLDataType.UUID, this, "")

    /** The column <code>public.organisme.secteur_id</code>. */
    val SECTEUR_ID: TableField<OrganismeRecord, UUID?> =
        createField(DSL.name("secteur_id"), SQLDataType.UUID, this, "")

    /** The column <code>public.organisme.type_structure_id</code>. */
    val TYPE_STRUCTURE_ID: TableField<OrganismeRecord, UUID?> =
        createField(DSL.name("type_structure_id"), SQLDataType.UUID, this, "")

    /** The column <code>public.organisme.nombre_representants</code>. */
    val NOMBRE_REPRESENTANTS: TableField<OrganismeRecord, Int?> =
        createField(DSL.name("nombre_representants"), SQLDataType.INTEGER.nullable(false), this, "")

    /** The column <code>public.organisme.presence_suppleants</code>. */
    val PRESENCE_SUPPLEANTS: TableField<OrganismeRecord, Boolean?> =
        createField(DSL.name("presence_suppleants"), SQLDataType.BOOLEAN.nullable(false), this, "")

    /** The column <code>public.organisme.status</code>. */
    val STATUS: TableField<OrganismeRecord, String?> =
        createField(DSL.name("status"), SQLDataType.VARCHAR(255).nullable(false), this, "")

    /** The column <code>public.organisme.creation_date</code>. */
    val CREATION_DATE: TableField<OrganismeRecord, Instant?> =
        createField(
            DSL.name("creation_date"),
            SQLDataType.TIMESTAMPWITHTIMEZONE(6).nullable(false),
            this,
            "",
            TimestampWithTimeZoneToInstantJooqConverter())

    /** The column <code>public.organisme.last_modification_date</code>. */
    val LAST_MODIFICATION_DATE: TableField<OrganismeRecord, Instant?> =
        createField(
            DSL.name("last_modification_date"),
            SQLDataType.TIMESTAMPWITHTIMEZONE(6).nullable(false),
            this,
            "",
            TimestampWithTimeZoneToInstantJooqConverter())

    private constructor(
        alias: Name,
        aliased: Table<OrganismeRecord>?
    ) : this(alias, null, null, aliased, null)
    private constructor(
        alias: Name,
        aliased: Table<OrganismeRecord>?,
        parameters: Array<Field<*>?>?
    ) : this(alias, null, null, aliased, parameters)

    /** Create an aliased <code>public.organisme</code> table reference */
    constructor(alias: String) : this(DSL.name(alias))

    /** Create an aliased <code>public.organisme</code> table reference */
    constructor(alias: Name) : this(alias, null)

    /** Create a <code>public.organisme</code> table reference */
    constructor() : this(DSL.name("organisme"), null)

    constructor(
        child: Table<out Record>,
        key: ForeignKey<out Record, OrganismeRecord>
    ) : this(Internal.createPathAlias(child, key), child, key, ORGANISME, null)
    override fun getSchema(): Schema? = if (aliased()) null else PublicTable.PUBLIC
    override fun getIndexes(): List<Index> =
        listOf(
            ORGANISME_DEPARTEMENT_ID_IDX,
            ORGANISME_NATURE_JURIDIQUE_ID_IDX,
            ORGANISME_SECTEUR_ID_IDX,
            ORGANISME_TYPE_STRUCTURE_ID_IDX)
    override fun getPrimaryKey(): UniqueKey<OrganismeRecord> = ORGANISME_PKEY
    override fun getReferences(): List<ForeignKey<OrganismeRecord, *>> =
        listOf(
            ORGANISME__ORGANISME_NATURE_JURIDIQUE_ID_FKEY,
            ORGANISME__ORGANISME_SECTEUR_ID_FKEY,
            ORGANISME__ORGANISME_TYPE_STRUCTURE_ID_FKEY)

    private lateinit var _natureJuridique: NatureJuridiqueTable
    private lateinit var _secteur: SecteurTable
    private lateinit var _typeStructure: TypeStructureTable

    /** Get the implicit join path to the <code>public.nature_juridique</code> table. */
    fun natureJuridique(): NatureJuridiqueTable {
        if (!this::_natureJuridique.isInitialized)
            _natureJuridique =
                NatureJuridiqueTable(this, ORGANISME__ORGANISME_NATURE_JURIDIQUE_ID_FKEY)

        return _natureJuridique
    }

    val natureJuridique: NatureJuridiqueTable
        get(): NatureJuridiqueTable = natureJuridique()

    /** Get the implicit join path to the <code>public.secteur</code> table. */
    fun secteur(): SecteurTable {
        if (!this::_secteur.isInitialized)
            _secteur = SecteurTable(this, ORGANISME__ORGANISME_SECTEUR_ID_FKEY)

        return _secteur
    }

    val secteur: SecteurTable
        get(): SecteurTable = secteur()

    /** Get the implicit join path to the <code>public.type_structure</code> table. */
    fun typeStructure(): TypeStructureTable {
        if (!this::_typeStructure.isInitialized)
            _typeStructure = TypeStructureTable(this, ORGANISME__ORGANISME_TYPE_STRUCTURE_ID_FKEY)

        return _typeStructure
    }

    val typeStructure: TypeStructureTable
        get(): TypeStructureTable = typeStructure()
    override fun `as`(alias: String): OrganismeTable = OrganismeTable(DSL.name(alias), this)
    override fun `as`(alias: Name): OrganismeTable = OrganismeTable(alias, this)
    override fun `as`(alias: Table<*>): OrganismeTable =
        OrganismeTable(alias.getQualifiedName(), this)

    /** Rename this table */
    override fun rename(name: String): OrganismeTable = OrganismeTable(DSL.name(name), null)

    /** Rename this table */
    override fun rename(name: Name): OrganismeTable = OrganismeTable(name, null)

    /** Rename this table */
    override fun rename(name: Table<*>): OrganismeTable =
        OrganismeTable(name.getQualifiedName(), null)

    // -------------------------------------------------------------------------
    // Row11 type methods
    // -------------------------------------------------------------------------
    override fun fieldsRow():
        Row11<
            UUID?,
            String?,
            UUID?,
            UUID?,
            UUID?,
            UUID?,
            Int?,
            Boolean?,
            String?,
            Instant?,
            Instant?> =
        super.fieldsRow()
            as
            Row11<
                UUID?,
                String?,
                UUID?,
                UUID?,
                UUID?,
                UUID?,
                Int?,
                Boolean?,
                String?,
                Instant?,
                Instant?>

    /** Convenience mapping calling {@link SelectField#convertFrom(Function)}. */
    fun <U> mapping(
        from:
            (
                UUID?,
                String?,
                UUID?,
                UUID?,
                UUID?,
                UUID?,
                Int?,
                Boolean?,
                String?,
                Instant?,
                Instant?) -> U
    ): SelectField<U> = convertFrom(Records.mapping(from))

    /** Convenience mapping calling {@link SelectField#convertFrom(Class, Function)}. */
    fun <U> mapping(
        toType: Class<U>,
        from:
            (
                UUID?,
                String?,
                UUID?,
                UUID?,
                UUID?,
                UUID?,
                Int?,
                Boolean?,
                String?,
                Instant?,
                Instant?) -> U
    ): SelectField<U> = convertFrom(toType, Records.mapping(from))
}