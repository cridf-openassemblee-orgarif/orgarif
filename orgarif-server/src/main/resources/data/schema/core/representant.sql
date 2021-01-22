CREATE TABLE representant
(
    id                        UUID PRIMARY KEY NOT NULL,
    elu_id                    UUID             NOT NULL,
    organisme_id              UUID             NOT NULL,
    instance_id               UUID,
    position                  INT              NOT NULL,
    representant_or_suppleant VARCHAR(255)     NOT NULL,
    creation_date             TIMESTAMP        NOT NULL,
    last_modification_date    TIMESTAMP        NOT NULL,
    FOREIGN KEY (elu_id) REFERENCES elu (id),
    FOREIGN KEY (organisme_id) REFERENCES organisme (id),
    FOREIGN KEY (instance_id) REFERENCES instance (id)
);

CREATE INDEX ON representant (organisme_id);
CREATE INDEX ON representant (instance_id);