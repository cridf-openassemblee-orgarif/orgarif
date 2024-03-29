/*
 * This file is generated by jOOQ.
 */
package orgarif.jooq.generated.tables.records

import java.time.Instant
import java.util.UUID
import org.jooq.Field
import org.jooq.Record1
import org.jooq.Record5
import org.jooq.Row5
import org.jooq.impl.UpdatableRecordImpl
import orgarif.jooq.generated.tables.NatureJuridiqueTable

/** This class is generated by jOOQ. */
@Suppress("UNCHECKED_CAST")
open class NatureJuridiqueRecord private constructor() :
    UpdatableRecordImpl<NatureJuridiqueRecord>(NatureJuridiqueTable.NATURE_JURIDIQUE),
    Record5<UUID?, String?, String?, Instant?, Instant?> {

    open var id: UUID
        set(value): Unit = set(0, value)
        get(): UUID = get(0) as UUID

    open var libelle: String
        set(value): Unit = set(1, value)
        get(): String = get(1) as String

    open var status: String
        set(value): Unit = set(2, value)
        get(): String = get(2) as String

    open var creationDate: Instant
        set(value): Unit = set(3, value)
        get(): Instant = get(3) as Instant

    open var lastModificationDate: Instant
        set(value): Unit = set(4, value)
        get(): Instant = get(4) as Instant

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    override fun key(): Record1<UUID?> = super.key() as Record1<UUID?>

    // -------------------------------------------------------------------------
    // Record5 type implementation
    // -------------------------------------------------------------------------

    override fun fieldsRow(): Row5<UUID?, String?, String?, Instant?, Instant?> =
        super.fieldsRow() as Row5<UUID?, String?, String?, Instant?, Instant?>
    override fun valuesRow(): Row5<UUID?, String?, String?, Instant?, Instant?> =
        super.valuesRow() as Row5<UUID?, String?, String?, Instant?, Instant?>
    override fun field1(): Field<UUID?> = NatureJuridiqueTable.NATURE_JURIDIQUE.ID
    override fun field2(): Field<String?> = NatureJuridiqueTable.NATURE_JURIDIQUE.LIBELLE
    override fun field3(): Field<String?> = NatureJuridiqueTable.NATURE_JURIDIQUE.STATUS
    override fun field4(): Field<Instant?> = NatureJuridiqueTable.NATURE_JURIDIQUE.CREATION_DATE
    override fun field5(): Field<Instant?> =
        NatureJuridiqueTable.NATURE_JURIDIQUE.LAST_MODIFICATION_DATE
    override fun component1(): UUID = id
    override fun component2(): String = libelle
    override fun component3(): String = status
    override fun component4(): Instant = creationDate
    override fun component5(): Instant = lastModificationDate
    override fun value1(): UUID = id
    override fun value2(): String = libelle
    override fun value3(): String = status
    override fun value4(): Instant = creationDate
    override fun value5(): Instant = lastModificationDate

    override fun value1(value: UUID?): NatureJuridiqueRecord {
        set(0, value)
        return this
    }

    override fun value2(value: String?): NatureJuridiqueRecord {
        set(1, value)
        return this
    }

    override fun value3(value: String?): NatureJuridiqueRecord {
        set(2, value)
        return this
    }

    override fun value4(value: Instant?): NatureJuridiqueRecord {
        set(3, value)
        return this
    }

    override fun value5(value: Instant?): NatureJuridiqueRecord {
        set(4, value)
        return this
    }

    override fun values(
        value1: UUID?,
        value2: String?,
        value3: String?,
        value4: Instant?,
        value5: Instant?
    ): NatureJuridiqueRecord {
        this.value1(value1)
        this.value2(value2)
        this.value3(value3)
        this.value4(value4)
        this.value5(value5)
        return this
    }

    /** Create a detached, initialised NatureJuridiqueRecord */
    constructor(
        id: UUID,
        libelle: String,
        status: String,
        creationDate: Instant,
        lastModificationDate: Instant
    ) : this() {
        this.id = id
        this.libelle = libelle
        this.status = status
        this.creationDate = creationDate
        this.lastModificationDate = lastModificationDate
        resetChangedOnNotNull()
    }
}
