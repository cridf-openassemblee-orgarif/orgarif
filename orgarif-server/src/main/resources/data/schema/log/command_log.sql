CREATE TABLE command_log
(
    id UUID PRIMARY KEY,
-- [doc] no foreign key because can be absent from app_user if a register command failed
    user_id UUID,
    affected_user_id UUID,
    deployment_log_id UUID NOT NULL,
    command_class VARCHAR(255) NOT NULL,
    json_command TEXT NOT NULL,
    ip VARCHAR(255) NOT NULL,
-- [doc] no foreign key because can be absent from session log if a register/login command failed
    user_session_id UUID,
    ids_log TEXT NOT NULL,
    json_result TEXT,
    exception_stack_trace TEXT,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (deployment_log_id) REFERENCES deployment_log (id)
);
