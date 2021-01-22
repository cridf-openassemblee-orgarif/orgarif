CREATE TABLE instance
(
    id                     UUID PRIMARY KEY NOT NULL,
    nom                    VARCHAR(255)     NOT NULL,
    organisme_id           UUID             NOT NULL,
    nombre_representants   INTEGER,
    nombre_suppleants      INTEGER,
    creation_date          TIMESTAMP        NOT NULL,
    last_modification_date TIMESTAMP        NOT NULL,
    FOREIGN KEY (organisme_id) REFERENCES organisme (id)
);

CREATE INDEX ON instance (organisme_id);
