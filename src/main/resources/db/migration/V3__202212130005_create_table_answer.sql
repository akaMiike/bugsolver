CREATE TABLE Answer(
    id SERIAL PRIMARY KEY NOT NULL,
    description VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    best_answer BOOLEAN,
    user_id INT NOT NULL,
    bug_id INT NOT NULL,
    CONSTRAINT user_fk FOREIGN KEY (user_id)
        REFERENCES Users (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bugs_fk FOREIGN KEY (bug_id)
        REFERENCES Bugs (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);