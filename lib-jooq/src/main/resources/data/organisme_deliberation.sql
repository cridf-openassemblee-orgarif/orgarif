CREATE TABLE organisme_deliberation
(
    id              CHAR(32) PRIMARY KEY NOT NULL,
    organisme_id    CHAR(32)             NOT NULL,
    deliberation_id CHAR(32)             NOT NULL,
    FOREIGN KEY (organisme_id) REFERENCES organisme (id),
    FOREIGN KEY (deliberation_id) REFERENCES deliberation (id)
);

