CREATE TABLE magic_link_token
(
    token VARCHAR(255) PRIMARY KEY,
    user_id UUID NOT NULL,
    -- TODO[tmpl][magic-link] create an index here
    validity BOOLEAN NOT NULL,
    creation_date TIMESTAMPTZ NOT NULL,
    last_update TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (user_id) REFERENCES app_user (id)
);
