drop database if exists hipotecas;

Create database if not exists hipotecas;

use hipotecas;

Create table if not exists  Users ( 
userId int NOT NULL AUTO_INCREMENT,
username varchar(20),
password varchar(20),
tempToken varchar(40),
PRIMARY KEY (userId)
);

Create table if not exists Simulation (
Id int NOT NULL AUTO_INCREMENT,
userId int,
creationDate varchar(100),
initial float,
duration varchar(70),
fee float,
PRIMARY KEY (Id),
foreign key(userId ) REFERENCES Users(userId ) ON DELETE SET NULL # FOREIGN KEY

)

INSERT INTO Users VALUES (0,'Juan', 'admin',null);
