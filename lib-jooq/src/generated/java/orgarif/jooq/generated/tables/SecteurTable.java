/*
 * This file is generated by jOOQ.
 */
package orgarif.jooq.generated.tables;


import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Row2;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.TableOptions;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.TableImpl;

import orgarif.jooq.generated.Keys;
import orgarif.jooq.generated.OrgarifTable;
import orgarif.jooq.generated.tables.records.SecteurRecord;
import orgarif.jooq.tools.jooq.CharToUUIDConverter;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class SecteurTable extends TableImpl<SecteurRecord> {

    private static final long serialVersionUID = 1020154827;

    /**
     * The reference instance of <code>orgarif.secteur</code>
     */
    public static final SecteurTable SECTEUR = new SecteurTable();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<SecteurRecord> getRecordType() {
        return SecteurRecord.class;
    }

    /**
     * The column <code>orgarif.secteur.id</code>.
     */
    public final TableField<SecteurRecord, UUID> ID = createField(DSL.name("id"), org.jooq.impl.SQLDataType.CHAR(32).nullable(false), this, "", new CharToUUIDConverter());

    /**
     * The column <code>orgarif.secteur.libelle</code>.
     */
    public final TableField<SecteurRecord, String> LIBELLE = createField(DSL.name("libelle"), org.jooq.impl.SQLDataType.VARCHAR(255).nullable(false), this, "");

    /**
     * Create a <code>orgarif.secteur</code> table reference
     */
    public SecteurTable() {
        this(DSL.name("secteur"), null);
    }

    /**
     * Create an aliased <code>orgarif.secteur</code> table reference
     */
    public SecteurTable(String alias) {
        this(DSL.name(alias), SECTEUR);
    }

    /**
     * Create an aliased <code>orgarif.secteur</code> table reference
     */
    public SecteurTable(Name alias) {
        this(alias, SECTEUR);
    }

    private SecteurTable(Name alias, Table<SecteurRecord> aliased) {
        this(alias, aliased, null);
    }

    private SecteurTable(Name alias, Table<SecteurRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    public <O extends Record> SecteurTable(Table<O> child, ForeignKey<O, SecteurRecord> key) {
        super(child, key, SECTEUR);
    }

    @Override
    public Schema getSchema() {
        return OrgarifTable.ORGARIF;
    }

    @Override
    public UniqueKey<SecteurRecord> getPrimaryKey() {
        return Keys.KEY_SECTEUR_PRIMARY;
    }

    @Override
    public List<UniqueKey<SecteurRecord>> getKeys() {
        return Arrays.<UniqueKey<SecteurRecord>>asList(Keys.KEY_SECTEUR_PRIMARY);
    }

    @Override
    public SecteurTable as(String alias) {
        return new SecteurTable(DSL.name(alias), this);
    }

    @Override
    public SecteurTable as(Name alias) {
        return new SecteurTable(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public SecteurTable rename(String name) {
        return new SecteurTable(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public SecteurTable rename(Name name) {
        return new SecteurTable(name, null);
    }

    // -------------------------------------------------------------------------
    // Row2 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row2<UUID, String> fieldsRow() {
        return (Row2) super.fieldsRow();
    }
}