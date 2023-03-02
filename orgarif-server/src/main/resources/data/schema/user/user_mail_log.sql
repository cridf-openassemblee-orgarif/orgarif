CREATE TABLE user_mail_log
(
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    mail VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    creation_date TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (user_id) REFERENCES app_user (id)
);

CREATE INDEX ON user_mail_log (user_id);
