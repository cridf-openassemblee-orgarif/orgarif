CREATE TABLE organisme
(
    id                     UUID PRIMARY KEY NOT NULL,
    nom                    VARCHAR(255)     NOT NULL,
    secteur_id             UUID,
    nature_juridique_id    UUID,
    type_structure_id      UUID,
    nombre_representants   INTEGER,
    nombre_suppleants      INTEGER,
    partage_representants  BOOLEAN          NOT NULL,
    creation_date          TIMESTAMP        NOT NULL,
    last_modification_date TIMESTAMP        NOT NULL,
    FOREIGN KEY (secteur_id) REFERENCES secteur (id),
    FOREIGN KEY (nature_juridique_id) REFERENCES nature_juridique (id),
    FOREIGN KEY (type_structure_id) REFERENCES type_structure (id)
);

