CREATE TABLE instance_deliberation
(
    id              CHAR(32) PRIMARY KEY NOT NULL,
    instance_id     CHAR(32)             NOT NULL,
    deliberation_id CHAR(32)             NOT NULL,
    FOREIGN KEY (instance_id) REFERENCES instance (id),
    FOREIGN KEY (deliberation_id) REFERENCES deliberation (id)
);

CREATE INDEX ON instance_deliberation (instance_id);
