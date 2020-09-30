### Schema
--Use this to create your database
CREATE DATABASE burger_db;

USE burger_db;

CREATE TABLE BURGERS
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	hungry BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
