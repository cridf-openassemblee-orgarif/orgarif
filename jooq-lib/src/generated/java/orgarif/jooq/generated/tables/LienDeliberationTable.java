/*
 * This file is generated by jOOQ.
 */
package orgarif.jooq.generated.tables;


import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import javax.annotation.Nonnull;

import jooqutils.jooq.TimestampToInstantConverter;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Index;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Row6;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.TableOptions;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.SQLDataType;
import org.jooq.impl.TableImpl;

import orgarif.jooq.generated.Indexes;
import orgarif.jooq.generated.Keys;
import orgarif.jooq.generated.PublicTable;
import orgarif.jooq.generated.tables.records.LienDeliberationRecord;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class LienDeliberationTable extends TableImpl<LienDeliberationRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>public.lien_deliberation</code>
     */
    public static final LienDeliberationTable LIEN_DELIBERATION = new LienDeliberationTable();

    /**
     * The class holding records for this type
     */
    @Override
    @Nonnull
    public Class<LienDeliberationRecord> getRecordType() {
        return LienDeliberationRecord.class;
    }

    /**
     * The column <code>public.lien_deliberation.id</code>.
     */
    public final TableField<LienDeliberationRecord, UUID> ID = createField(DSL.name("id"), SQLDataType.UUID.nullable(false), this, "");

    /**
     * The column <code>public.lien_deliberation.deliberation_id</code>.
     */
    public final TableField<LienDeliberationRecord, UUID> DELIBERATION_ID = createField(DSL.name("deliberation_id"), SQLDataType.UUID.nullable(false), this, "");

    /**
     * The column <code>public.lien_deliberation.organisme_id</code>.
     */
    public final TableField<LienDeliberationRecord, UUID> ORGANISME_ID = createField(DSL.name("organisme_id"), SQLDataType.UUID.nullable(false), this, "");

    /**
     * The column <code>public.lien_deliberation.instance_id</code>.
     */
    public final TableField<LienDeliberationRecord, UUID> INSTANCE_ID = createField(DSL.name("instance_id"), SQLDataType.UUID, this, "");

    /**
     * The column <code>public.lien_deliberation.creation_date</code>.
     */
    public final TableField<LienDeliberationRecord, Instant> CREATION_DATE = createField(DSL.name("creation_date"), SQLDataType.LOCALDATETIME(6).nullable(false), this, "", new TimestampToInstantConverter());

    /**
     * The column <code>public.lien_deliberation.last_modification_date</code>.
     */
    public final TableField<LienDeliberationRecord, Instant> LAST_MODIFICATION_DATE = createField(DSL.name("last_modification_date"), SQLDataType.LOCALDATETIME(6).nullable(false), this, "", new TimestampToInstantConverter());

    private LienDeliberationTable(Name alias, Table<LienDeliberationRecord> aliased) {
        this(alias, aliased, null);
    }

    private LienDeliberationTable(Name alias, Table<LienDeliberationRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>public.lien_deliberation</code> table reference
     */
    public LienDeliberationTable(String alias) {
        this(DSL.name(alias), LIEN_DELIBERATION);
    }

    /**
     * Create an aliased <code>public.lien_deliberation</code> table reference
     */
    public LienDeliberationTable(Name alias) {
        this(alias, LIEN_DELIBERATION);
    }

    /**
     * Create a <code>public.lien_deliberation</code> table reference
     */
    public LienDeliberationTable() {
        this(DSL.name("lien_deliberation"), null);
    }

    public <O extends Record> LienDeliberationTable(Table<O> child, ForeignKey<O, LienDeliberationRecord> key) {
        super(child, key, LIEN_DELIBERATION);
    }

    @Override
    @Nonnull
    public Schema getSchema() {
        return PublicTable.PUBLIC;
    }

    @Override
    @Nonnull
    public List<Index> getIndexes() {
        return Arrays.<Index>asList(Indexes.LIEN_DELIBERATION_ORGANISME_ID_IDX);
    }

    @Override
    @Nonnull
    public UniqueKey<LienDeliberationRecord> getPrimaryKey() {
        return Keys.LIEN_DELIBERATION_PKEY;
    }

    @Override
    @Nonnull
    public List<UniqueKey<LienDeliberationRecord>> getKeys() {
        return Arrays.<UniqueKey<LienDeliberationRecord>>asList(Keys.LIEN_DELIBERATION_PKEY);
    }

    @Override
    @Nonnull
    public List<ForeignKey<LienDeliberationRecord, ?>> getReferences() {
        return Arrays.<ForeignKey<LienDeliberationRecord, ?>>asList(Keys.LIEN_DELIBERATION__LIEN_DELIBERATION_DELIBERATION_ID_FKEY, Keys.LIEN_DELIBERATION__LIEN_DELIBERATION_ORGANISME_ID_FKEY, Keys.LIEN_DELIBERATION__LIEN_DELIBERATION_INSTANCE_ID_FKEY);
    }

    public DeliberationTable deliberation() {
        return new DeliberationTable(this, Keys.LIEN_DELIBERATION__LIEN_DELIBERATION_DELIBERATION_ID_FKEY);
    }

    public OrganismeTable organisme() {
        return new OrganismeTable(this, Keys.LIEN_DELIBERATION__LIEN_DELIBERATION_ORGANISME_ID_FKEY);
    }

    public InstanceTable instance() {
        return new InstanceTable(this, Keys.LIEN_DELIBERATION__LIEN_DELIBERATION_INSTANCE_ID_FKEY);
    }

    @Override
    @Nonnull
    public LienDeliberationTable as(String alias) {
        return new LienDeliberationTable(DSL.name(alias), this);
    }

    @Override
    @Nonnull
    public LienDeliberationTable as(Name alias) {
        return new LienDeliberationTable(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    @Nonnull
    public LienDeliberationTable rename(String name) {
        return new LienDeliberationTable(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    @Nonnull
    public LienDeliberationTable rename(Name name) {
        return new LienDeliberationTable(name, null);
    }

    // -------------------------------------------------------------------------
    // Row6 type methods
    // -------------------------------------------------------------------------

    @Override
    @Nonnull
    public Row6<UUID, UUID, UUID, UUID, Instant, Instant> fieldsRow() {
        return (Row6) super.fieldsRow();
    }
}
