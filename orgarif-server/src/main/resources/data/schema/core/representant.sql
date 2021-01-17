CREATE TABLE representant
(
    id                        CHAR(32) PRIMARY KEY NOT NULL,
    elu_id                    CHAR(32)             NOT NULL,
    organisme_id              CHAR(32)             NOT NULL,
    instance_id               CHAR(32),
    position                  INT                  NOT NULL,
    representant_or_suppleant VARCHAR(255)         NOT NULL,
    creation_date             TIMESTAMP            NOT NULL,
    last_modification_date    TIMESTAMP            NOT NULL,
    FOREIGN KEY (elu_id) REFERENCES elu (id),
    FOREIGN KEY (organisme_id) REFERENCES organisme (id),
    FOREIGN KEY (instance_id) REFERENCES instance (id)
);

CREATE INDEX representant_organisme_id_idx ON representant (organisme_id);
CREATE INDEX representant_instance_id_idx ON representant (instance_id);