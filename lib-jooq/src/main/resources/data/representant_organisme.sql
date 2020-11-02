CREATE TABLE representant_organisme
(
    id                     CHAR(32) PRIMARY KEY NOT NULL,
    elu_id                 CHAR(32)             NOT NULL,
    organisme_id           CHAR(32)             NOT NULL,
    position               INT                  NOT NULL,
    is_suppleant           BOOLEAN              NOT NULL,
    creation_date          TIMESTAMP            NOT NULL,
    last_modification_date TIMESTAMP            NOT NULL,
    FOREIGN KEY (elu_id) REFERENCES elu (id),
    FOREIGN KEY (organisme_id) REFERENCES organisme (id)
);

CREATE INDEX ON representant_organisme (organisme_id);