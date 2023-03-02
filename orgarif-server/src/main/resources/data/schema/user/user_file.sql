CREATE TABLE user_file
(
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    file_content BYTEA NOT NULL,
    content_type VARCHAR(255) NOT NULL,
    original_filename TEXT NOT NULL,
    upload_date TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (user_id) REFERENCES app_user (id)
);
