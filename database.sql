
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- database name: "mn_beer_flow"

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- create the brewery table for storing all brewery data
CREATE TABLE "brewery" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL UNIQUE,
	"city" VARCHAR(255) NOT NULL,
	"image_url" VARCHAR(500) DEFAULT '/login.jpg',
	"address" VARCHAR(100),
	"latitude" FLOAT(7),
	"longitude" FLOAT(7)
);

-- create the user_brewery junction table to hold ratings and favorites information
CREATE TABLE "user_brewery" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL,
	"brewery_id" INT NOT NULL,
	"rating" INT NOT NULL DEFAULT 0,
	"is_favorite" BOOL NOT NULL DEFAULT 'FALSE'
);

-- make user_brewery pairs unique to allow UPSERT statements for ratings and favorites data to work properly
ALTER TABLE "user_brewery"
	ADD CONSTRAINT user_brewery_uq
	UNIQUE ("user_id", "brewery_id");

-- make the comments table to hold comments made by users
CREATE TABLE "comments" (
	"id" SERIAL PRIMARY KEY,
	"comment" VARCHAR(255) NOT NULL,
	"user_id" INT NOT NULL REFERENCES "user",
	"brewery_id" INT NOT NULL REFERENCES "brewery"
);
