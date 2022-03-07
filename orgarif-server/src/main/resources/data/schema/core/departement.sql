CREATE TABLE departement
(
    id                     UUID PRIMARY KEY NOT NULL,
    libelle                VARCHAR(255)     NOT NULL,
    code                   VARCHAR(255)     NOT NULL,
    status                 VARCHAR(255)     NOT NULL,
    creation_date          TIMESTAMPTZ      NOT NULL,
    last_modification_date TIMESTAMPTZ      NOT NULL
);

