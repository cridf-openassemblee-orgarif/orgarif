CREATE TABLE representant_instance
(
    id                     CHAR(32) PRIMARY KEY NOT NULL,
    elu_id                 CHAR(32)             NOT NULL,
    instance_id            CHAR(32)             NOT NULL,
    position               INT                  NOT NULL,
    is_suppleant           BOOLEAN              NOT NULL,
    creation_date          TIMESTAMP            NOT NULL,
    last_modification_date TIMESTAMP            NOT NULL,
    FOREIGN KEY (elu_id) REFERENCES elu (id),
    FOREIGN KEY (instance_id) REFERENCES instance (id)
);

CREATE INDEX ON representant_instance (instance_id);