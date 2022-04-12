CREATE TABLE user_session_log
(
    id UUID PRIMARY KEY,
    spring_session_id VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL,
    deployment_log_id UUID NOT NULL,
    creation_date TIMESTAMPTZ NOT NULL,
    ip VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES app_user (id)
);

CREATE INDEX ON user_session_log (user_id);
