CREATE TABLE representation
(
    id                        UUID PRIMARY KEY NOT NULL,
    elu_id                    UUID,
--      FIXME[migration] not null apres migration
    representant_id           UUID,
    organisme_id              UUID             NOT NULL,
    instance_id               UUID,
    position                  INT              NOT NULL,
    representant_or_suppleant VARCHAR(255)     NOT NULL,
    start_date                DATE,
    end_date                  DATE,
    creation_date             TIMESTAMPTZ      NOT NULL,
    last_modification_date    TIMESTAMPTZ      NOT NULL,
    FOREIGN KEY (representant_id) REFERENCES representant (id),
    FOREIGN KEY (organisme_id) REFERENCES organisme (id),
    FOREIGN KEY (instance_id) REFERENCES instance (id)
);

CREATE INDEX ON representation (organisme_id);
CREATE INDEX ON representation (instance_id);