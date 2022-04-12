-- [doc] Spring Jdbc Session specific table
-- https://docs.spring.io/spring-session/docs/current/reference/html5/#api-jdbcoperationssessionrepository-storage
CREATE TABLE spring_session
(
    primary_id CHAR(36) PRIMARY KEY,
    session_id CHAR(36) NOT NULL UNIQUE,
    creation_time BIGINT NOT NULL,
    last_access_time BIGINT NOT NULL,
    max_inactive_interval INTEGER NOT NULL,
    expiry_time BIGINT NOT NULL,
    principal_name VARCHAR(255)
);

CREATE INDEX ON spring_session (expiry_time);
CREATE INDEX ON spring_session (principal_name);

CREATE TABLE spring_session_attributes
(
    session_primary_id CHAR(36) NOT NULL,
    attribute_name VARCHAR(200) NOT NULL,
    attribute_bytes BYTEA NOT NULL,
    PRIMARY KEY (session_primary_id, attribute_name),
    FOREIGN KEY (session_primary_id) REFERENCES spring_session (primary_id) ON DELETE CASCADE
);
