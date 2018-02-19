CREATE DATABASE arthurDB;

USE arthurDB;

create table user(
	id INT (11) AUTO_INCREMENT NOT NULL,
    user_fname varchar(240) NOT NULL,
    user_lname varchar(240) NOT NULL,
    user_email varchar(240) NOT NULL,
    user_company varchar(240) NOT NULL,
    user_linkedIn varchar(240) NOT NULL,
    user_twitter varchar(240),
    PRIMARY KEY (ID)
    );
    
    create table contact(
	id INT (11) AUTO_INCREMENT NOT NULL,
    contact_fname varchar(240) NOT NULL,
    contact_lname varchar(240) NOT NULL,
    contact_email varchar(240) NOT NULL,
    contact_company varchar(240),
	contact_linkedIn varchar(240),
    contact_twitter varchar(240),
    contact_workAddress varchar(240),
    contact_workCity varchar(240),
    contact_workState varchar(240),
    contact_workZip varchar(240),
    contact_workPhone varchar(240),
    contact_companyWeb varchar(240),
    contact_dob date,
    contact_cell varchar(240),
    PRIMARY KEY (ID)
    );
    