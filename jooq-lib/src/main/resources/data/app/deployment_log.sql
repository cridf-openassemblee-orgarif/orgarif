CREATE TABLE deployment_log
(
    id             CHAR(32) PRIMARY KEY NOT NULL,
    build_version  VARCHAR(255)         NOT NULL,
    system_zone_id VARCHAR(255)         NOT NULL,
    startup_date   TIMESTAMP            NOT NULL,
    shutdown_date  TIMESTAMP
);