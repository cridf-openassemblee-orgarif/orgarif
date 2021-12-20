CREATE TABLE nature_juridique
(
    id                     UUID PRIMARY KEY NOT NULL,
    libelle                VARCHAR(255)     NOT NULL,
    status                 VARCHAR(255)     NOT NULL,
    last_modification_date TIMESTAMPTZ      NOT NULL
);

