CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE
);