/*
 * This file is generated by jOOQ.
 */
package orgarif.jooq.generated.tables.records

import java.time.Instant
import java.time.LocalDate
import java.util.UUID
import org.jooq.Field
import org.jooq.Record1
import org.jooq.Record11
import org.jooq.Row11
import org.jooq.impl.UpdatableRecordImpl
import orgarif.jooq.generated.tables.DesignationTable

/** This class is generated by jOOQ. */
@Suppress("UNCHECKED_CAST")
open class DesignationRecord private constructor() :
    UpdatableRecordImpl<DesignationRecord>(DesignationTable.DESIGNATION),
    Record11<
        UUID?,
        UUID?,
        UUID?,
        UUID?,
        String?,
        Int?,
        LocalDate?,
        LocalDate?,
        String?,
        Instant?,
        Instant?> {

    open var id: UUID
        set(value): Unit = set(0, value)
        get(): UUID = get(0) as UUID

    open var representantId: UUID
        set(value): Unit = set(1, value)
        get(): UUID = get(1) as UUID

    open var organismeId: UUID
        set(value): Unit = set(2, value)
        get(): UUID = get(2) as UUID

    open var instanceId: UUID?
        set(value): Unit = set(3, value)
        get(): UUID? = get(3) as UUID?

    open var type: String
        set(value): Unit = set(4, value)
        get(): String = get(4) as String

    open var position: Int
        set(value): Unit = set(5, value)
        get(): Int = get(5) as Int

    open var startDate: LocalDate?
        set(value): Unit = set(6, value)
        get(): LocalDate? = get(6) as LocalDate?

    open var endDate: LocalDate?
        set(value): Unit = set(7, value)
        get(): LocalDate? = get(7) as LocalDate?

    open var status: String
        set(value): Unit = set(8, value)
        get(): String = get(8) as String

    open var creationDate: Instant
        set(value): Unit = set(9, value)
        get(): Instant = get(9) as Instant

    open var lastModificationDate: Instant
        set(value): Unit = set(10, value)
        get(): Instant = get(10) as Instant

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    override fun key(): Record1<UUID?> = super.key() as Record1<UUID?>

    // -------------------------------------------------------------------------
    // Record11 type implementation
    // -------------------------------------------------------------------------

    override fun fieldsRow():
        Row11<
            UUID?,
            UUID?,
            UUID?,
            UUID?,
            String?,
            Int?,
            LocalDate?,
            LocalDate?,
            String?,
            Instant?,
            Instant?> =
        super.fieldsRow()
            as
            Row11<
                UUID?,
                UUID?,
                UUID?,
                UUID?,
                String?,
                Int?,
                LocalDate?,
                LocalDate?,
                String?,
                Instant?,
                Instant?>
    override fun valuesRow():
        Row11<
            UUID?,
            UUID?,
            UUID?,
            UUID?,
            String?,
            Int?,
            LocalDate?,
            LocalDate?,
            String?,
            Instant?,
            Instant?> =
        super.valuesRow()
            as
            Row11<
                UUID?,
                UUID?,
                UUID?,
                UUID?,
                String?,
                Int?,
                LocalDate?,
                LocalDate?,
                String?,
                Instant?,
                Instant?>
    override fun field1(): Field<UUID?> = DesignationTable.DESIGNATION.ID
    override fun field2(): Field<UUID?> = DesignationTable.DESIGNATION.REPRESENTANT_ID
    override fun field3(): Field<UUID?> = DesignationTable.DESIGNATION.ORGANISME_ID
    override fun field4(): Field<UUID?> = DesignationTable.DESIGNATION.INSTANCE_ID
    override fun field5(): Field<String?> = DesignationTable.DESIGNATION.TYPE
    override fun field6(): Field<Int?> = DesignationTable.DESIGNATION.POSITION
    override fun field7(): Field<LocalDate?> = DesignationTable.DESIGNATION.START_DATE
    override fun field8(): Field<LocalDate?> = DesignationTable.DESIGNATION.END_DATE
    override fun field9(): Field<String?> = DesignationTable.DESIGNATION.STATUS
    override fun field10(): Field<Instant?> = DesignationTable.DESIGNATION.CREATION_DATE
    override fun field11(): Field<Instant?> = DesignationTable.DESIGNATION.LAST_MODIFICATION_DATE
    override fun component1(): UUID = id
    override fun component2(): UUID = representantId
    override fun component3(): UUID = organismeId
    override fun component4(): UUID? = instanceId
    override fun component5(): String = type
    override fun component6(): Int = position
    override fun component7(): LocalDate? = startDate
    override fun component8(): LocalDate? = endDate
    override fun component9(): String = status
    override fun component10(): Instant = creationDate
    override fun component11(): Instant = lastModificationDate
    override fun value1(): UUID = id
    override fun value2(): UUID = representantId
    override fun value3(): UUID = organismeId
    override fun value4(): UUID? = instanceId
    override fun value5(): String = type
    override fun value6(): Int = position
    override fun value7(): LocalDate? = startDate
    override fun value8(): LocalDate? = endDate
    override fun value9(): String = status
    override fun value10(): Instant = creationDate
    override fun value11(): Instant = lastModificationDate

    override fun value1(value: UUID?): DesignationRecord {
        set(0, value)
        return this
    }

    override fun value2(value: UUID?): DesignationRecord {
        set(1, value)
        return this
    }

    override fun value3(value: UUID?): DesignationRecord {
        set(2, value)
        return this
    }

    override fun value4(value: UUID?): DesignationRecord {
        set(3, value)
        return this
    }

    override fun value5(value: String?): DesignationRecord {
        set(4, value)
        return this
    }

    override fun value6(value: Int?): DesignationRecord {
        set(5, value)
        return this
    }

    override fun value7(value: LocalDate?): DesignationRecord {
        set(6, value)
        return this
    }

    override fun value8(value: LocalDate?): DesignationRecord {
        set(7, value)
        return this
    }

    override fun value9(value: String?): DesignationRecord {
        set(8, value)
        return this
    }

    override fun value10(value: Instant?): DesignationRecord {
        set(9, value)
        return this
    }

    override fun value11(value: Instant?): DesignationRecord {
        set(10, value)
        return this
    }

    override fun values(
        value1: UUID?,
        value2: UUID?,
        value3: UUID?,
        value4: UUID?,
        value5: String?,
        value6: Int?,
        value7: LocalDate?,
        value8: LocalDate?,
        value9: String?,
        value10: Instant?,
        value11: Instant?
    ): DesignationRecord {
        this.value1(value1)
        this.value2(value2)
        this.value3(value3)
        this.value4(value4)
        this.value5(value5)
        this.value6(value6)
        this.value7(value7)
        this.value8(value8)
        this.value9(value9)
        this.value10(value10)
        this.value11(value11)
        return this
    }

    /** Create a detached, initialised DesignationRecord */
    constructor(
        id: UUID,
        representantId: UUID,
        organismeId: UUID,
        instanceId: UUID? = null,
        type: String,
        position: Int,
        startDate: LocalDate? = null,
        endDate: LocalDate? = null,
        status: String,
        creationDate: Instant,
        lastModificationDate: Instant
    ) : this() {
        this.id = id
        this.representantId = representantId
        this.organismeId = organismeId
        this.instanceId = instanceId
        this.type = type
        this.position = position
        this.startDate = startDate
        this.endDate = endDate
        this.status = status
        this.creationDate = creationDate
        this.lastModificationDate = lastModificationDate
        resetChangedOnNotNull()
    }
}