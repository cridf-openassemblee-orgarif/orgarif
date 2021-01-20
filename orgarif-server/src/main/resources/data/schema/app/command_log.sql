CREATE TABLE command_log
(
    id                    CHAR(32) PRIMARY KEY NOT NULL,
    user_id               CHAR(32),
    deployment_log_id     CHAR(32)             NOT NULL,
    command_class         VARCHAR(255)         NOT NULL,
    json_command          TEXT                 NOT NULL,
    ip                    VARCHAR(255)         NOT NULL,
    user_session_id       CHAR(32),
    resulting_ids         TEXT,
    json_result           TEXT,
    exception_stack_trace TEXT,
    start_date            TIMESTAMP            NOT NULL,
    end_date              TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES app_user (id),
    FOREIGN KEY (deployment_log_id) REFERENCES deployment_log (id),
    FOREIGN KEY (user_session_id) REFERENCES user_session_log (id)
);