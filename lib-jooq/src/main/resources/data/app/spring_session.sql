-- [doc] Spring Jdbc Session specific table
-- https://docs.spring.io/spring-session/docs/current/reference/html5/#api-jdbcoperationssessionrepository-storage
-- [doc] Mysql is case sensitive...
CREATE TABLE SPRING_SESSION
(
    primary_id            CHAR(36) NOT NULL,
    session_id            CHAR(36) NOT NULL,
    creation_time         BIGINT   NOT NULL,
    last_access_time      BIGINT   NOT NULL,
    max_inactive_interval INT      NOT NULL,
    expiry_time           BIGINT   NOT NULL,
    principal_name        VARCHAR(100),
    CONSTRAINT spring_session_pk PRIMARY KEY (primary_id)
);

CREATE UNIQUE INDEX ON SPRING_SESSION (session_id);
CREATE INDEX ON SPRING_SESSION (expiry_time);
CREATE INDEX ON SPRING_SESSION (principal_name);

CREATE TABLE SPRING_SESSION_ATTRIBUTES
(
    session_primary_id CHAR(36)     NOT NULL,
    attribute_name     VARCHAR(200) NOT NULL,
    attribute_bytes    BLOB         NOT NULL,
    CONSTRAINT spring_session_attributes_pk PRIMARY KEY (session_primary_id, attribute_name),
    CONSTRAINT spring_session_attributes_fk FOREIGN KEY (session_primary_id) REFERENCES SPRING_SESSION (primary_id) ON DELETE CASCADE
);