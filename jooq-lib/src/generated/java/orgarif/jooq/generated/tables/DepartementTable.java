/*
 * This file is generated by jOOQ.
 */
package orgarif.jooq.generated.tables;


import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import javax.annotation.Nonnull;

import jooqutils.jooq.TimestampWithTimeZoneToInstantConverter;

import org.jooq.Field;
import org.jooq.ForeignKey;
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

import orgarif.jooq.generated.Keys;
import orgarif.jooq.generated.PublicTable;
import orgarif.jooq.generated.tables.records.DepartementRecord;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class DepartementTable extends TableImpl<DepartementRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>public.departement</code>
     */
    public static final DepartementTable DEPARTEMENT = new DepartementTable();

    /**
     * The class holding records for this type
     */
    @Override
    @Nonnull
    public Class<DepartementRecord> getRecordType() {
        return DepartementRecord.class;
    }

    /**
     * The column <code>public.departement.id</code>.
     */
    public final TableField<DepartementRecord, UUID> ID = createField(DSL.name("id"), SQLDataType.UUID.nullable(false), this, "");

    /**
     * The column <code>public.departement.libelle</code>.
     */
    public final TableField<DepartementRecord, String> LIBELLE = createField(DSL.name("libelle"), SQLDataType.VARCHAR(255).nullable(false), this, "");

    /**
     * The column <code>public.departement.code</code>.
     */
    public final TableField<DepartementRecord, String> CODE = createField(DSL.name("code"), SQLDataType.VARCHAR(255).nullable(false), this, "");

    /**
     * The column <code>public.departement.status</code>.
     */
    public final TableField<DepartementRecord, String> STATUS = createField(DSL.name("status"), SQLDataType.VARCHAR(255).nullable(false), this, "");

    /**
     * The column <code>public.departement.creation_date</code>.
     */
    public final TableField<DepartementRecord, Instant> CREATION_DATE = createField(DSL.name("creation_date"), SQLDataType.TIMESTAMPWITHTIMEZONE(6).nullable(false), this, "", new TimestampWithTimeZoneToInstantConverter());

    /**
     * The column <code>public.departement.last_modification_date</code>.
     */
    public final TableField<DepartementRecord, Instant> LAST_MODIFICATION_DATE = createField(DSL.name("last_modification_date"), SQLDataType.TIMESTAMPWITHTIMEZONE(6).nullable(false), this, "", new TimestampWithTimeZoneToInstantConverter());

    private DepartementTable(Name alias, Table<DepartementRecord> aliased) {
        this(alias, aliased, null);
    }

    private DepartementTable(Name alias, Table<DepartementRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>public.departement</code> table reference
     */
    public DepartementTable(String alias) {
        this(DSL.name(alias), DEPARTEMENT);
    }

    /**
     * Create an aliased <code>public.departement</code> table reference
     */
    public DepartementTable(Name alias) {
        this(alias, DEPARTEMENT);
    }

    /**
     * Create a <code>public.departement</code> table reference
     */
    public DepartementTable() {
        this(DSL.name("departement"), null);
    }

    public <O extends Record> DepartementTable(Table<O> child, ForeignKey<O, DepartementRecord> key) {
        super(child, key, DEPARTEMENT);
    }

    @Override
    @Nonnull
    public Schema getSchema() {
        return PublicTable.PUBLIC;
    }

    @Override
    @Nonnull
    public UniqueKey<DepartementRecord> getPrimaryKey() {
        return Keys.DEPARTEMENT_PKEY;
    }

    @Override
    @Nonnull
    public List<UniqueKey<DepartementRecord>> getKeys() {
        return Arrays.<UniqueKey<DepartementRecord>>asList(Keys.DEPARTEMENT_PKEY);
    }

    @Override
    @Nonnull
    public DepartementTable as(String alias) {
        return new DepartementTable(DSL.name(alias), this);
    }

    @Override
    @Nonnull
    public DepartementTable as(Name alias) {
        return new DepartementTable(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    @Nonnull
    public DepartementTable rename(String name) {
        return new DepartementTable(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    @Nonnull
    public DepartementTable rename(Name name) {
        return new DepartementTable(name, null);
    }

    // -------------------------------------------------------------------------
    // Row6 type methods
    // -------------------------------------------------------------------------

    @Override
    @Nonnull
    public Row6<UUID, String, String, String, Instant, Instant> fieldsRow() {
        return (Row6) super.fieldsRow();
    }
}