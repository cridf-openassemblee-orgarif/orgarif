CREATE TABLE organisme
(
    id UUID PRIMARY KEY NOT NULL,
    nom VARCHAR(255) NOT NULL,
    departement_id UUID,
    nature_juridique_id UUID,
    secteur_id UUID,
    type_structure_id UUID,
    nombre_representants INTEGER,
    presence_suppleants BOOLEAN NOT NULL,
    status VARCHAR(255) NOT NULL,
    creation_date TIMESTAMPTZ NOT NULL,
    last_modification_date TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (secteur_id) REFERENCES secteur (id),
    FOREIGN KEY (nature_juridique_id) REFERENCES nature_juridique (id),
    FOREIGN KEY (type_structure_id) REFERENCES type_structure (id)
);

