CREATE TABLE magic_link_token
(
    token         VARCHAR(255) PRIMARY KEY,
    user_id       UUID        NOT NULL,
    -- TODO[magic-link] de la nécessité de créer un index ici
    creation_date TIMESTAMPTZ NOT NULL,
    validity      BOOLEAN     NOT NULL,
    FOREIGN KEY (user_id) REFERENCES app_user (id)
);