CREATE TABLE representant
(
    id                     UUID PRIMARY KEY NOT NULL,
    elu_id                 UUID,
    prenom                 VARCHAR(255),
    nom                    VARCHAR(255),
    creation_date          TIMESTAMPTZ      NOT NULL,
    last_modification_date TIMESTAMPTZ      NOT NULL,
    FOREIGN KEY (elu_id) REFERENCES elu (id)
);
