CREATE TABLE suppleance
(
    id                     UUID PRIMARY KEY NOT NULL,
    representant_id        UUID             NOT NULL,
    representation_id      UUID             NOT NULL,
    organisme_id           UUID             NOT NULL,
    start_date             DATE,
    end_date               DATE,
    creation_date          TIMESTAMPTZ      NOT NULL,
    last_modification_date TIMESTAMPTZ      NOT NULL,
    FOREIGN KEY (representant_id) REFERENCES representant (id),
    FOREIGN KEY (representation_id) REFERENCES representation (id),
    FOREIGN KEY (organisme_id) REFERENCES organisme (id)
);

CREATE INDEX ON suppleance (organisme_id);