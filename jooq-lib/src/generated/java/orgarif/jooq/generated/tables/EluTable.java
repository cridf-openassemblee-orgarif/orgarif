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
import org.jooq.Row10;
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
import orgarif.jooq.generated.tables.records.EluRecord;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class EluTable extends TableImpl<EluRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>public.elu</code>
     */
    public static final EluTable ELU = new EluTable();

    /**
     * The class holding records for this type
     */
    @Override
    @Nonnull
    public Class<EluRecord> getRecordType() {
        return EluRecord.class;
    }

    /**
     * The column <code>public.elu.id</code>.
     */
    public final TableField<EluRecord, UUID> ID = createField(DSL.name("id"), SQLDataType.UUID.nullable(false), this, "");

    /**
     * The column <code>public.elu.civilite</code>.
     */
    public final TableField<EluRecord, String> CIVILITE = createField(DSL.name("civilite"), SQLDataType.VARCHAR(3).nullable(false), this, "");

    /**
     * The column <code>public.elu.prenom</code>.
     */
    public final TableField<EluRecord, String> PRENOM = createField(DSL.name("prenom"), SQLDataType.VARCHAR(255).nullable(false), this, "");

    /**
     * The column <code>public.elu.nom</code>.
     */
    public final TableField<EluRecord, String> NOM = createField(DSL.name("nom"), SQLDataType.VARCHAR(255).nullable(false), this, "");

    /**
     * The column <code>public.elu.groupe_politique</code>.
     */
    public final TableField<EluRecord, String> GROUPE_POLITIQUE = createField(DSL.name("groupe_politique"), SQLDataType.VARCHAR(255).nullable(false), this, "");

    /**
     * The column <code>public.elu.groupe_politique_court</code>.
     */
    public final TableField<EluRecord, String> GROUPE_POLITIQUE_COURT = createField(DSL.name("groupe_politique_court"), SQLDataType.VARCHAR(255).nullable(false), this, "");

    /**
     * The column <code>public.elu.image_url</code>.
     */
    public final TableField<EluRecord, String> IMAGE_URL = createField(DSL.name("image_url"), SQLDataType.VARCHAR(255).nullable(false), this, "");

    /**
     * The column <code>public.elu.actif</code>.
     */
    public final TableField<EluRecord, Boolean> ACTIF = createField(DSL.name("actif"), SQLDataType.BOOLEAN.nullable(false), this, "");

    /**
     * The column <code>public.elu.creation_date</code>.
     */
    public final TableField<EluRecord, Instant> CREATION_DATE = createField(DSL.name("creation_date"), SQLDataType.TIMESTAMPWITHTIMEZONE(6).nullable(false), this, "", new TimestampWithTimeZoneToInstantConverter());

    /**
     * The column <code>public.elu.last_modification_date</code>.
     */
    public final TableField<EluRecord, Instant> LAST_MODIFICATION_DATE = createField(DSL.name("last_modification_date"), SQLDataType.TIMESTAMPWITHTIMEZONE(6).nullable(false), this, "", new TimestampWithTimeZoneToInstantConverter());

    private EluTable(Name alias, Table<EluRecord> aliased) {
        this(alias, aliased, null);
    }

    private EluTable(Name alias, Table<EluRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>public.elu</code> table reference
     */
    public EluTable(String alias) {
        this(DSL.name(alias), ELU);
    }

    /**
     * Create an aliased <code>public.elu</code> table reference
     */
    public EluTable(Name alias) {
        this(alias, ELU);
    }

    /**
     * Create a <code>public.elu</code> table reference
     */
    public EluTable() {
        this(DSL.name("elu"), null);
    }

    public <O extends Record> EluTable(Table<O> child, ForeignKey<O, EluRecord> key) {
        super(child, key, ELU);
    }

    @Override
    @Nonnull
    public Schema getSchema() {
        return PublicTable.PUBLIC;
    }

    @Override
    @Nonnull
    public UniqueKey<EluRecord> getPrimaryKey() {
        return Keys.ELU_PKEY;
    }

    @Override
    @Nonnull
    public List<UniqueKey<EluRecord>> getKeys() {
        return Arrays.<UniqueKey<EluRecord>>asList(Keys.ELU_PKEY);
    }

    @Override
    @Nonnull
    public EluTable as(String alias) {
        return new EluTable(DSL.name(alias), this);
    }

    @Override
    @Nonnull
    public EluTable as(Name alias) {
        return new EluTable(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    @Nonnull
    public EluTable rename(String name) {
        return new EluTable(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    @Nonnull
    public EluTable rename(Name name) {
        return new EluTable(name, null);
    }

    // -------------------------------------------------------------------------
    // Row10 type methods
    // -------------------------------------------------------------------------

    @Override
    @Nonnull
    public Row10<UUID, String, String, String, String, String, String, Boolean, Instant, Instant> fieldsRow() {
        return (Row10) super.fieldsRow();
    }
}