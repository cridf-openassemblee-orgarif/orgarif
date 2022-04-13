CREATE TABLE representant
(
    id UUID PRIMARY KEY NOT NULL,
    elu_id UUID,
    prenom VARCHAR(255) NOT NULL,
    nom VARCHAR(255) NOT NULL,
    search_prenom VARCHAR(255) NOT NULL,
    search_nom VARCHAR(255) NOT NULL,
    creation_date TIMESTAMPTZ NOT NULL,
    last_modification_date TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (elu_id) REFERENCES elu (id)
);
