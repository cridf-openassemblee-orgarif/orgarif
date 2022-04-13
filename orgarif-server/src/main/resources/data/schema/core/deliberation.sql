CREATE TABLE deliberation
(
    id UUID PRIMARY KEY NOT NULL,
    libelle VARCHAR(255) NOT NULL,
    search_libelle VARCHAR(255) NOT NULL,
    deliberation_date DATE NOT NULL,
    status VARCHAR(255) NOT NULL,
    creation_date TIMESTAMPTZ NOT NULL,
    last_modification_date TIMESTAMPTZ NOT NULL
);

