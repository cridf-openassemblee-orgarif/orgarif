/*
 * This file is generated by jOOQ.
 */
package orgarif.jooq.generated.tables;


import java.time.Instant;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import javax.annotation.Nonnull;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Row5;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.TableOptions;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.SQLDataType;
import org.jooq.impl.TableImpl;

import orgarif.jooq.generated.Keys;
import orgarif.jooq.generated.OrgarifTable;
import orgarif.jooq.generated.tables.records.DeliberationRecord;
import orgarif.jooq.tools.jooq.CharToUUIDConverter;
import orgarif.jooq.tools.jooq.TimestampToInstantConverter;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class DeliberationTable extends TableImpl<DeliberationRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>orgarif.deliberation</code>
     */
    public static final DeliberationTable DELIBERATION = new DeliberationTable();

    /**
     * The class holding records for this type
     */
    @Override
    @Nonnull
    public Class<DeliberationRecord> getRecordType() {
        return DeliberationRecord.class;
    }

    /**
     * The column <code>orgarif.deliberation.id</code>.
     */
    public final TableField<DeliberationRecord, UUID> ID = createField(DSL.name("id"), SQLDataType.CHAR(32).nullable(false), this, "", new CharToUUIDConverter());

    /**
     * The column <code>orgarif.deliberation.libelle</code>.
     */
    public final TableField<DeliberationRecord, String> LIBELLE = createField(DSL.name("libelle"), SQLDataType.VARCHAR(255).nullable(false), this, "");

    /**
     * The column <code>orgarif.deliberation.deliberation_date</code>.
     */
    public final TableField<DeliberationRecord, LocalDate> DELIBERATION_DATE = createField(DSL.name("deliberation_date"), SQLDataType.LOCALDATE.nullable(false), this, "");

    /**
     * The column <code>orgarif.deliberation.creation_date</code>.
     */
    public final TableField<DeliberationRecord, Instant> CREATION_DATE = createField(DSL.name("creation_date"), SQLDataType.LOCALDATETIME(0).nullable(false), this, "", new TimestampToInstantConverter());

    /**
     * The column <code>orgarif.deliberation.last_modification_date</code>.
     */
    public final TableField<DeliberationRecord, Instant> LAST_MODIFICATION_DATE = createField(DSL.name("last_modification_date"), SQLDataType.LOCALDATETIME(0).nullable(false), this, "", new TimestampToInstantConverter());

    private DeliberationTable(Name alias, Table<DeliberationRecord> aliased) {
        this(alias, aliased, null);
    }

    private DeliberationTable(Name alias, Table<DeliberationRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>orgarif.deliberation</code> table reference
     */
    public DeliberationTable(String alias) {
        this(DSL.name(alias), DELIBERATION);
    }

    /**
     * Create an aliased <code>orgarif.deliberation</code> table reference
     */
    public DeliberationTable(Name alias) {
        this(alias, DELIBERATION);
    }

    /**
     * Create a <code>orgarif.deliberation</code> table reference
     */
    public DeliberationTable() {
        this(DSL.name("deliberation"), null);
    }

    public <O extends Record> DeliberationTable(Table<O> child, ForeignKey<O, DeliberationRecord> key) {
        super(child, key, DELIBERATION);
    }

    @Override
    @Nonnull
    public Schema getSchema() {
        return OrgarifTable.ORGARIF;
    }

    @Override
    @Nonnull
    public UniqueKey<DeliberationRecord> getPrimaryKey() {
        return Keys.KEY_DELIBERATION_PRIMARY;
    }

    @Override
    @Nonnull
    public List<UniqueKey<DeliberationRecord>> getKeys() {
        return Arrays.<UniqueKey<DeliberationRecord>>asList(Keys.KEY_DELIBERATION_PRIMARY);
    }

    @Override
    @Nonnull
    public DeliberationTable as(String alias) {
        return new DeliberationTable(DSL.name(alias), this);
    }

    @Override
    @Nonnull
    public DeliberationTable as(Name alias) {
        return new DeliberationTable(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    @Nonnull
    public DeliberationTable rename(String name) {
        return new DeliberationTable(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    @Nonnull
    public DeliberationTable rename(Name name) {
        return new DeliberationTable(name, null);
    }

    // -------------------------------------------------------------------------
    // Row5 type methods
    // -------------------------------------------------------------------------

    @Override
    @Nonnull
    public Row5<UUID, String, LocalDate, Instant, Instant> fieldsRow() {
        return (Row5) super.fieldsRow();
    }
}