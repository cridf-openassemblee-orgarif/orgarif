CREATE TABLE mail_log
(
    id                CHAR(32) PRIMARY KEY NOT NULL,
    application       VARCHAR(255)         NOT NULL,
    deployment_log_id CHAR(32)             NOT NULL,
    recipient_type    VARCHAR(255)         NOT NULL,
    user_id           CHAR(32)             NOT NULL,
    reference         VARCHAR(255)         NOT NULL,
-- [doc] kept here, mainly because the user can change his mail
    recipient_mail    VARCHAR(255)         NOT NULL,
    data              TEXT                 NOT NULL,
    subject           TEXT                 NOT NULL,
    content           TEXT                 NOT NULL,
    date              TIMESTAMP            NOT NULL,
    FOREIGN KEY (deployment_log_id) REFERENCES deployment_log (id)
);

CREATE INDEX ON mail_log (user_id);