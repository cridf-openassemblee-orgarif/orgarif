CREATE TABLE instance
(
    id                     UUID PRIMARY KEY NOT NULL,
    nom                    VARCHAR(255)     NOT NULL,
    organisme_id           UUID             NOT NULL,
    nombre_representants   INTEGER,
    presence_suppleants    BOOLEAN          NOT NULL,
    status                 VARCHAR(255)     NOT NULL,
    creation_date          TIMESTAMPTZ      NOT NULL,
    last_modification_date TIMESTAMPTZ      NOT NULL,
    FOREIGN KEY (organisme_id) REFERENCES organisme (id)
);

CREATE INDEX ON instance (organisme_id);
