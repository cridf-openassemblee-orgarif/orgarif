/*
 * This file is generated by jOOQ.
 */
package orgarif.jooq.generated.tables.records

import java.time.Instant
import java.util.UUID
import org.jooq.Field
import org.jooq.Record1
import org.jooq.Record8
import org.jooq.Row8
import org.jooq.impl.UpdatableRecordImpl
import orgarif.jooq.generated.tables.InstanceTable

/** This class is generated by jOOQ. */
@Suppress("UNCHECKED_CAST")
open class InstanceRecord private constructor() :
    UpdatableRecordImpl<InstanceRecord>(InstanceTable.INSTANCE),
    Record8<UUID?, String?, UUID?, Int?, Boolean?, String?, Instant?, Instant?> {

    open var id: UUID
        set(value): Unit = set(0, value)
        get(): UUID = get(0) as UUID

    open var nom: String
        set(value): Unit = set(1, value)
        get(): String = get(1) as String

    open var organismeId: UUID
        set(value): Unit = set(2, value)
        get(): UUID = get(2) as UUID

    open var nombreRepresentants: Int
        set(value): Unit = set(3, value)
        get(): Int = get(3) as Int

    open var presenceSuppleants: Boolean
        set(value): Unit = set(4, value)
        get(): Boolean = get(4) as Boolean

    open var status: String
        set(value): Unit = set(5, value)
        get(): String = get(5) as String

    open var creationDate: Instant
        set(value): Unit = set(6, value)
        get(): Instant = get(6) as Instant

    open var lastModificationDate: Instant
        set(value): Unit = set(7, value)
        get(): Instant = get(7) as Instant

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    override fun key(): Record1<UUID?> = super.key() as Record1<UUID?>

    // -------------------------------------------------------------------------
    // Record8 type implementation
    // -------------------------------------------------------------------------

    override fun fieldsRow():
        Row8<UUID?, String?, UUID?, Int?, Boolean?, String?, Instant?, Instant?> =
        super.fieldsRow()
            as Row8<UUID?, String?, UUID?, Int?, Boolean?, String?, Instant?, Instant?>
    override fun valuesRow():
        Row8<UUID?, String?, UUID?, Int?, Boolean?, String?, Instant?, Instant?> =
        super.valuesRow()
            as Row8<UUID?, String?, UUID?, Int?, Boolean?, String?, Instant?, Instant?>
    override fun field1(): Field<UUID?> = InstanceTable.INSTANCE.ID
    override fun field2(): Field<String?> = InstanceTable.INSTANCE.NOM
    override fun field3(): Field<UUID?> = InstanceTable.INSTANCE.ORGANISME_ID
    override fun field4(): Field<Int?> = InstanceTable.INSTANCE.NOMBRE_REPRESENTANTS
    override fun field5(): Field<Boolean?> = InstanceTable.INSTANCE.PRESENCE_SUPPLEANTS
    override fun field6(): Field<String?> = InstanceTable.INSTANCE.STATUS
    override fun field7(): Field<Instant?> = InstanceTable.INSTANCE.CREATION_DATE
    override fun field8(): Field<Instant?> = InstanceTable.INSTANCE.LAST_MODIFICATION_DATE
    override fun component1(): UUID = id
    override fun component2(): String = nom
    override fun component3(): UUID = organismeId
    override fun component4(): Int = nombreRepresentants
    override fun component5(): Boolean = presenceSuppleants
    override fun component6(): String = status
    override fun component7(): Instant = creationDate
    override fun component8(): Instant = lastModificationDate
    override fun value1(): UUID = id
    override fun value2(): String = nom
    override fun value3(): UUID = organismeId
    override fun value4(): Int = nombreRepresentants
    override fun value5(): Boolean = presenceSuppleants
    override fun value6(): String = status
    override fun value7(): Instant = creationDate
    override fun value8(): Instant = lastModificationDate

    override fun value1(value: UUID?): InstanceRecord {
        set(0, value)
        return this
    }

    override fun value2(value: String?): InstanceRecord {
        set(1, value)
        return this
    }

    override fun value3(value: UUID?): InstanceRecord {
        set(2, value)
        return this
    }

    override fun value4(value: Int?): InstanceRecord {
        set(3, value)
        return this
    }

    override fun value5(value: Boolean?): InstanceRecord {
        set(4, value)
        return this
    }

    override fun value6(value: String?): InstanceRecord {
        set(5, value)
        return this
    }

    override fun value7(value: Instant?): InstanceRecord {
        set(6, value)
        return this
    }

    override fun value8(value: Instant?): InstanceRecord {
        set(7, value)
        return this
    }

    override fun values(
        value1: UUID?,
        value2: String?,
        value3: UUID?,
        value4: Int?,
        value5: Boolean?,
        value6: String?,
        value7: Instant?,
        value8: Instant?
    ): InstanceRecord {
        this.value1(value1)
        this.value2(value2)
        this.value3(value3)
        this.value4(value4)
        this.value5(value5)
        this.value6(value6)
        this.value7(value7)
        this.value8(value8)
        return this
    }

    /** Create a detached, initialised InstanceRecord */
    constructor(
        id: UUID,
        nom: String,
        organismeId: UUID,
        nombreRepresentants: Int,
        presenceSuppleants: Boolean,
        status: String,
        creationDate: Instant,
        lastModificationDate: Instant
    ) : this() {
        this.id = id
        this.nom = nom
        this.organismeId = organismeId
        this.nombreRepresentants = nombreRepresentants
        this.presenceSuppleants = presenceSuppleants
        this.status = status
        this.creationDate = creationDate
        this.lastModificationDate = lastModificationDate
        resetChangedOnNotNull()
    }
}