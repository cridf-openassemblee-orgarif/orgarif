CREATE TABLE instance
(
    id                     CHAR(32) PRIMARY KEY NOT NULL,
    nom                    VARCHAR(255)         NOT NULL,
    organisme_id           CHAR(32)             NOT NULL,
    nombre_representants   INTEGER,
    nombre_suppleants      INTEGER,
    creation_date          TIMESTAMP            NOT NULL,
    last_modification_date TIMESTAMP            NOT NULL,
    FOREIGN KEY (organisme_id) REFERENCES organisme (id)
);

CREATE INDEX instance_organisme_id_idx ON instance (organisme_id);
