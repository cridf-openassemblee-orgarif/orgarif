CREATE TABLE command_log
(
    id                    UUID PRIMARY KEY,
    user_id               UUID,
    deployment_log_id     UUID         NOT NULL,
    command_class         VARCHAR(255) NOT NULL,
    json_command          TEXT         NOT NULL,
    ip                    VARCHAR(255) NOT NULL,
    user_session_id       UUID,
    resulting_ids         TEXT,
    json_result           TEXT,
    exception_stack_trace TEXT,
    start_date            TIMESTAMP    NOT NULL,
    end_date              TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES app_user (id),
    FOREIGN KEY (deployment_log_id) REFERENCES deployment_log (id),
    FOREIGN KEY (user_session_id) REFERENCES user_session_log (id)
);