CREATE TABLE former_mail
(
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    mail VARCHAR(255) NOT NULL,
    dirty_mail VARCHAR(255),
    creation_date TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (user_id) REFERENCES app_user (id)
);

CREATE INDEX ON former_mail (user_id);
