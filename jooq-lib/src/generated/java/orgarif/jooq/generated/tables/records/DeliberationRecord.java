/*
 * This file is generated by jOOQ.
 */
package orgarif.jooq.generated.tables.records;


import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

import javax.annotation.Nonnull;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record5;
import org.jooq.Row5;
import org.jooq.impl.UpdatableRecordImpl;

import orgarif.jooq.generated.tables.DeliberationTable;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class DeliberationRecord extends UpdatableRecordImpl<DeliberationRecord> implements Record5<UUID, String, LocalDate, Instant, Instant> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>orgarif.deliberation.id</code>.
     */
    public void setId(@Nonnull UUID value) {
        set(0, value);
    }

    /**
     * Getter for <code>orgarif.deliberation.id</code>.
     */
    @Nonnull
    public UUID getId() {
        return (UUID) get(0);
    }

    /**
     * Setter for <code>orgarif.deliberation.libelle</code>.
     */
    public void setLibelle(@Nonnull String value) {
        set(1, value);
    }

    /**
     * Getter for <code>orgarif.deliberation.libelle</code>.
     */
    @Nonnull
    public String getLibelle() {
        return (String) get(1);
    }

    /**
     * Setter for <code>orgarif.deliberation.deliberation_date</code>.
     */
    public void setDeliberationDate(@Nonnull LocalDate value) {
        set(2, value);
    }

    /**
     * Getter for <code>orgarif.deliberation.deliberation_date</code>.
     */
    @Nonnull
    public LocalDate getDeliberationDate() {
        return (LocalDate) get(2);
    }

    /**
     * Setter for <code>orgarif.deliberation.creation_date</code>.
     */
    public void setCreationDate(@Nonnull Instant value) {
        set(3, value);
    }

    /**
     * Getter for <code>orgarif.deliberation.creation_date</code>.
     */
    @Nonnull
    public Instant getCreationDate() {
        return (Instant) get(3);
    }

    /**
     * Setter for <code>orgarif.deliberation.last_modification_date</code>.
     */
    public void setLastModificationDate(@Nonnull Instant value) {
        set(4, value);
    }

    /**
     * Getter for <code>orgarif.deliberation.last_modification_date</code>.
     */
    @Nonnull
    public Instant getLastModificationDate() {
        return (Instant) get(4);
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
    // Record5 type implementation
    // -------------------------------------------------------------------------

    @Override
    @Nonnull
    public Row5<UUID, String, LocalDate, Instant, Instant> fieldsRow() {
        return (Row5) super.fieldsRow();
    }

    @Override
    @Nonnull
    public Row5<UUID, String, LocalDate, Instant, Instant> valuesRow() {
        return (Row5) super.valuesRow();
    }

    @Override
    @Nonnull
    public Field<UUID> field1() {
        return DeliberationTable.DELIBERATION.ID;
    }

    @Override
    @Nonnull
    public Field<String> field2() {
        return DeliberationTable.DELIBERATION.LIBELLE;
    }

    @Override
    @Nonnull
    public Field<LocalDate> field3() {
        return DeliberationTable.DELIBERATION.DELIBERATION_DATE;
    }

    @Override
    @Nonnull
    public Field<Instant> field4() {
        return DeliberationTable.DELIBERATION.CREATION_DATE;
    }

    @Override
    @Nonnull
    public Field<Instant> field5() {
        return DeliberationTable.DELIBERATION.LAST_MODIFICATION_DATE;
    }

    @Override
    @Nonnull
    public UUID component1() {
        return getId();
    }

    @Override
    @Nonnull
    public String component2() {
        return getLibelle();
    }

    @Override
    @Nonnull
    public LocalDate component3() {
        return getDeliberationDate();
    }

    @Override
    @Nonnull
    public Instant component4() {
        return getCreationDate();
    }

    @Override
    @Nonnull
    public Instant component5() {
        return getLastModificationDate();
    }

    @Override
    @Nonnull
    public UUID value1() {
        return getId();
    }

    @Override
    @Nonnull
    public String value2() {
        return getLibelle();
    }

    @Override
    @Nonnull
    public LocalDate value3() {
        return getDeliberationDate();
    }

    @Override
    @Nonnull
    public Instant value4() {
        return getCreationDate();
    }

    @Override
    @Nonnull
    public Instant value5() {
        return getLastModificationDate();
    }

    @Override
    @Nonnull
    public DeliberationRecord value1(@Nonnull UUID value) {
        setId(value);
        return this;
    }

    @Override
    @Nonnull
    public DeliberationRecord value2(@Nonnull String value) {
        setLibelle(value);
        return this;
    }

    @Override
    @Nonnull
    public DeliberationRecord value3(@Nonnull LocalDate value) {
        setDeliberationDate(value);
        return this;
    }

    @Override
    @Nonnull
    public DeliberationRecord value4(@Nonnull Instant value) {
        setCreationDate(value);
        return this;
    }

    @Override
    @Nonnull
    public DeliberationRecord value5(@Nonnull Instant value) {
        setLastModificationDate(value);
        return this;
    }

    @Override
    @Nonnull
    public DeliberationRecord values(@Nonnull UUID value1, @Nonnull String value2, @Nonnull LocalDate value3, @Nonnull Instant value4, @Nonnull Instant value5) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached DeliberationRecord
     */
    public DeliberationRecord() {
        super(DeliberationTable.DELIBERATION);
    }

    /**
     * Create a detached, initialised DeliberationRecord
     */
    public DeliberationRecord(@Nonnull UUID id, @Nonnull String libelle, @Nonnull LocalDate deliberationDate, @Nonnull Instant creationDate, @Nonnull Instant lastModificationDate) {
        super(DeliberationTable.DELIBERATION);

        setId(id);
        setLibelle(libelle);
        setDeliberationDate(deliberationDate);
        setCreationDate(creationDate);
        setLastModificationDate(lastModificationDate);
    }
}