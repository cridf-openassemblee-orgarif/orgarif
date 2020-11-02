CREATE TABLE instance
(
    id                   CHAR(32) PRIMARY KEY NOT NULL,
    nom                  VARCHAR(255)         NOT NULL,
    organisme_id         CHAR(32)             NOT NULL,
    nombre_representants INTEGER,
    nombre_suppleants    INTEGER,
    FOREIGN KEY (organisme_id) REFERENCES organisme (id)
);

