
Create database if not exists hipotecas;
use hipotecas;
Create table if not exists  Users ( 
id int(16) auto_increment, 
username varchar(20),
password varchar(20),
PRIMARY KEY (id)
)
drop database if exists hipotecas;