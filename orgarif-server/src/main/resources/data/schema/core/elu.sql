CREATE TABLE elu
(
    id UUID PRIMARY KEY NOT NULL,
    civilite VARCHAR(3) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    nom VARCHAR(255) NOT NULL,
    groupe_politique VARCHAR(255) NOT NULL,
    groupe_politique_court VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    actif BOOLEAN NOT NULL,
    creation_date TIMESTAMPTZ NOT NULL,
    last_modification_date TIMESTAMPTZ NOT NULL
);

