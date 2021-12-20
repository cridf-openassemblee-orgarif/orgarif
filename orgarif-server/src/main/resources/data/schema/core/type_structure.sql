CREATE TABLE type_structure
(
    id                     UUID PRIMARY KEY NOT NULL,
    libelle                VARCHAR(255)     NOT NULL,
    status                 VARCHAR(255)     NOT NULL,
    last_modification_date TIMESTAMPTZ      NOT NULL
);

