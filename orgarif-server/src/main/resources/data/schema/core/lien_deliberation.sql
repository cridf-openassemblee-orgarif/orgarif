CREATE TABLE lien_deliberation
(
    id                     CHAR(32) PRIMARY KEY NOT NULL,
    deliberation_id        CHAR(32)             NOT NULL,
    organisme_id           CHAR(32)             NOT NULL,
    instance_id            CHAR(32),
    creation_date          TIMESTAMP            NOT NULL,
    last_modification_date TIMESTAMP            NOT NULL,
    FOREIGN KEY (deliberation_id) REFERENCES deliberation (id),
    FOREIGN KEY (organisme_id) REFERENCES organisme (id),
    FOREIGN KEY (instance_id) REFERENCES instance (id)
);

CREATE INDEX lien_deliberation_organisme_id_idx ON lien_deliberation (organisme_id);
