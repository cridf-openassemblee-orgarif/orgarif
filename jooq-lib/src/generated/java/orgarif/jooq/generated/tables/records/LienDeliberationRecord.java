/*
 * This file is generated by jOOQ.
 */
package orgarif.jooq.generated.tables.records;


import java.time.Instant;
import java.util.UUID;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record6;
import org.jooq.Row6;
import org.jooq.impl.UpdatableRecordImpl;

import orgarif.jooq.generated.tables.LienDeliberationTable;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class LienDeliberationRecord extends UpdatableRecordImpl<LienDeliberationRecord> implements Record6<UUID, UUID, UUID, UUID, Instant, Instant> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>orgarif.lien_deliberation.id</code>.
     */
    public void setId(@Nonnull UUID value) {
        set(0, value);
    }

    /**
     * Getter for <code>orgarif.lien_deliberation.id</code>.
     */
    @Nonnull
    public UUID getId() {
        return (UUID) get(0);
    }

    /**
     * Setter for <code>orgarif.lien_deliberation.deliberation_id</code>.
     */
    public void setDeliberationId(@Nonnull UUID value) {
        set(1, value);
    }

    /**
     * Getter for <code>orgarif.lien_deliberation.deliberation_id</code>.
     */
    @Nonnull
    public UUID getDeliberationId() {
        return (UUID) get(1);
    }

    /**
     * Setter for <code>orgarif.lien_deliberation.organisme_id</code>.
     */
    public void setOrganismeId(@Nonnull UUID value) {
        set(2, value);
    }

    /**
     * Getter for <code>orgarif.lien_deliberation.organisme_id</code>.
     */
    @Nonnull
    public UUID getOrganismeId() {
        return (UUID) get(2);
    }

    /**
     * Setter for <code>orgarif.lien_deliberation.instance_id</code>.
     */
    public void setInstanceId(@Nullable UUID value) {
        set(3, value);
    }

    /**
     * Getter for <code>orgarif.lien_deliberation.instance_id</code>.
     */
    @Nullable
    public UUID getInstanceId() {
        return (UUID) get(3);
    }

    /**
     * Setter for <code>orgarif.lien_deliberation.creation_date</code>.
     */
    public void setCreationDate(@Nonnull Instant value) {
        set(4, value);
    }

    /**
     * Getter for <code>orgarif.lien_deliberation.creation_date</code>.
     */
    @Nonnull
    public Instant getCreationDate() {
        return (Instant) get(4);
    }

    /**
     * Setter for <code>orgarif.lien_deliberation.last_modification_date</code>.
     */
    public void setLastModificationDate(@Nonnull Instant value) {
        set(5, value);
    }

    /**
     * Getter for <code>orgarif.lien_deliberation.last_modification_date</code>.
     */
    @Nonnull
    public Instant getLastModificationDate() {
        return (Instant) get(5);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    @Nonnull
    public Record1<UUID> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record6 type implementation
    // -------------------------------------------------------------------------

    @Override
    @Nonnull
    public Row6<UUID, UUID, UUID, UUID, Instant, Instant> fieldsRow() {
        return (Row6) super.fieldsRow();
    }

    @Override
    @Nonnull
    public Row6<UUID, UUID, UUID, UUID, Instant, Instant> valuesRow() {
        return (Row6) super.valuesRow();
    }

    @Override
    @Nonnull
    public Field<UUID> field1() {
        return LienDeliberationTable.LIEN_DELIBERATION.ID;
    }

    @Override
    @Nonnull
    public Field<UUID> field2() {
        return LienDeliberationTable.LIEN_DELIBERATION.DELIBERATION_ID;
    }

    @Override
    @Nonnull
    public Field<UUID> field3() {
        return LienDeliberationTable.LIEN_DELIBERATION.ORGANISME_ID;
    }

    @Override
    @Nonnull
    public Field<UUID> field4() {
        return LienDeliberationTable.LIEN_DELIBERATION.INSTANCE_ID;
    }

    @Override
    @Nonnull
    public Field<Instant> field5() {
        return LienDeliberationTable.LIEN_DELIBERATION.CREATION_DATE;
    }

    @Override
    @Nonnull
    public Field<Instant> field6() {
        return LienDeliberationTable.LIEN_DELIBERATION.LAST_MODIFICATION_DATE;
    }

    @Override
    @Nonnull
    public UUID component1() {
        return getId();
    }

    @Override
    @Nonnull
    public UUID component2() {
        return getDeliberationId();
    }

    @Override
    @Nonnull
    public UUID component3() {
        return getOrganismeId();
    }

    @Override
    @Nullable
    public UUID component4() {
        return getInstanceId();
    }

    @Override
    @Nonnull
    public Instant component5() {
        return getCreationDate();
    }

    @Override
    @Nonnull
    public Instant component6() {
        return getLastModificationDate();
    }

    @Override
    @Nonnull
    public UUID value1() {
        return getId();
    }

    @Override
    @Nonnull
    public UUID value2() {
        return getDeliberationId();
    }

    @Override
    @Nonnull
    public UUID value3() {
        return getOrganismeId();
    }

    @Override
    @Nullable
    public UUID value4() {
        return getInstanceId();
    }

    @Override
    @Nonnull
    public Instant value5() {
        return getCreationDate();
    }

    @Override
    @Nonnull
    public Instant value6() {
        return getLastModificationDate();
    }

    @Override
    @Nonnull
    public LienDeliberationRecord value1(@Nonnull UUID value) {
        setId(value);
        return this;
    }

    @Override
    @Nonnull
    public LienDeliberationRecord value2(@Nonnull UUID value) {
        setDeliberationId(value);
        return this;
    }

    @Override
    @Nonnull
    public LienDeliberationRecord value3(@Nonnull UUID value) {
        setOrganismeId(value);
        return this;
    }

    @Override
    @Nonnull
    public LienDeliberationRecord value4(@Nullable UUID value) {
        setInstanceId(value);
        return this;
    }

    @Override
    @Nonnull
    public LienDeliberationRecord value5(@Nonnull Instant value) {
        setCreationDate(value);
        return this;
    }

    @Override
    @Nonnull
    public LienDeliberationRecord value6(@Nonnull Instant value) {
        setLastModificationDate(value);
        return this;
    }

    @Override
    @Nonnull
    public LienDeliberationRecord values(@Nonnull UUID value1, @Nonnull UUID value2, @Nonnull UUID value3, @Nullable UUID value4, @Nonnull Instant value5, @Nonnull Instant value6) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        value6(value6);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached LienDeliberationRecord
     */
    public LienDeliberationRecord() {
        super(LienDeliberationTable.LIEN_DELIBERATION);
    }

    /**
     * Create a detached, initialised LienDeliberationRecord
     */
    public LienDeliberationRecord(@Nonnull UUID id, @Nonnull UUID deliberationId, @Nonnull UUID organismeId, @Nullable UUID instanceId, @Nonnull Instant creationDate, @Nonnull Instant lastModificationDate) {
        super(LienDeliberationTable.LIEN_DELIBERATION);

        setId(id);
        setDeliberationId(deliberationId);
        setOrganismeId(organismeId);
        setInstanceId(instanceId);
        setCreationDate(creationDate);
        setLastModificationDate(lastModificationDate);
    }
}