CREATE TABLE lien_deliberation
(
    id                     UUID PRIMARY KEY NOT NULL,
    deliberation_id        UUID             NOT NULL,
    organisme_id           UUID             NOT NULL,
    instance_id            UUID,
    creation_date          TIMESTAMP        NOT NULL,
    last_modification_date TIMESTAMP        NOT NULL,
    FOREIGN KEY (deliberation_id) REFERENCES deliberation (id),
    FOREIGN KEY (organisme_id) REFERENCES organisme (id),
    FOREIGN KEY (instance_id) REFERENCES instance (id)
);

CREATE INDEX ON lien_deliberation (organisme_id);
