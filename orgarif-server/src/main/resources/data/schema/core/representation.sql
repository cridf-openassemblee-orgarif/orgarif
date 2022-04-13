CREATE TABLE representation
(
    id UUID PRIMARY KEY NOT NULL,
    representant_id UUID NOT NULL,
    organisme_id UUID NOT NULL,
    instance_id UUID,
    position INT NOT NULL,
    start_date DATE,
    end_date DATE,
    status VARCHAR(255) NOT NULL,
    creation_date TIMESTAMPTZ NOT NULL,
    last_modification_date TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (representant_id) REFERENCES representant (id),
    FOREIGN KEY (organisme_id) REFERENCES organisme (id),
    FOREIGN KEY (instance_id) REFERENCES instance (id)
);

CREATE INDEX ON representation (organisme_id);
CREATE INDEX ON representation (instance_id);
