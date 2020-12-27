CREATE TABLE user_session_log
(
    id                CHAR(32) PRIMARY KEY NOT NULL,
    spring_session_id VARCHAR(255)         NOT NULL,
    user_id           CHAR(32)             NOT NULL,
    deployment_log_id CHAR(32)             NOT NULL,
    date              TIMESTAMP            NOT NULL,
    ip                VARCHAR(255)         NOT NULL,
    FOREIGN KEY (user_id) REFERENCES app_user (id)
);