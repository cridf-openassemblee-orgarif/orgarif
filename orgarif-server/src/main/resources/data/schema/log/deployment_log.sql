CREATE TABLE deployment_log
(
    id UUID PRIMARY KEY,
    build_version VARCHAR(255) NOT NULL,
    system_zone_id VARCHAR(255) NOT NULL,
    startup_date TIMESTAMPTZ NOT NULL,
    shutdown_date TIMESTAMPTZ
);
