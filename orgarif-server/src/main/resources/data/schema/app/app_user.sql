CREATE TABLE app_user
(
    id           UUID PRIMARY KEY,
    mail         VARCHAR(255) UNIQUE NOT NULL,
    password     VARCHAR(60)         NOT NULL,
-- [doc] username is at least useful for development
    username     VARCHAR(255) UNIQUE,
    display_name VARCHAR(255)        NOT NULL,
    language     VARCHAR(2)          NOT NULL,
    admin        BOOLEAN             NOT NULL,
    signup_date  TIMESTAMPTZ         NOT NULL,
    dirty_mail   VARCHAR(255),
    former_mails VARCHAR(255)[]      NOT NULL
);

CREATE INDEX ON app_user (username);
CREATE INDEX ON app_user (mail);
