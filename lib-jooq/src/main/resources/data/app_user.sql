CREATE TABLE app_user
(
    id           CHAR(32) PRIMARY KEY NOT NULL,
    mail         VARCHAR(255) UNIQUE  NOT NULL,
    password     VARCHAR(60)          NOT NULL,
-- [doc] username is at least useful for development
    username     VARCHAR(255) UNIQUE,
    display_name VARCHAR(255)         NOT NULL,
    language     VARCHAR(2)           NOT NULL,
    admin        BOOLEAN              NOT NULL,
    signup_date  TIMESTAMP            NOT NULL,
    dirty_mail   VARCHAR(255)
);

CREATE INDEX ON app_user (username);
CREATE INDEX ON app_user (mail);
