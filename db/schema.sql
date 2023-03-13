CREATE DATABASE goodfoodhunting;

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    image_url Text,
    user_id INTEGER
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
);

INSERT INTO dishes (title , image_url) VALUEs ('salad bowl ' ,'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80');
INSERT INTO dishes (title , image_url) VALUEs ('pokie bowl ' ,'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80');



-- INSERT INTO users (email) VALUES ('simon@yahoo.com')
-- INSERT INTO users (email) VALUES ('dt@yahoo.com')

ALTER TABLE dishes ADD COLUMN user_id INTEGER;

PGPASSWORD=hYfi3usMBiD3c6URWLm8ppifoBQIamBI psql -h dpg-cg7cjv5269v5l6114av0-a.oregon-postgres.render.com -U goodfoodhunting_gibl_user goodfoodhunting_gibl