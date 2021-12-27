CREATE TABLE user_file
(
    id                UUID PRIMARY KEY,
    user_id           UUID         NOT NULL,
    file              BYTEA        NOT NULL,
    content_type      VARCHAR(255) NOT NULL,
    original_filename TEXT         NOT NULL,
    date              TIMESTAMPTZ  NOT NULL,
    FOREIGN KEY (user_id) REFERENCES app_user (id)
);