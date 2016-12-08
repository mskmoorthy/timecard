SET NAMES utf8 COLLATE 'utf8_unicode_ci';
SET time_zone = '+00:00';
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
SET CHARACTER SET utf8;

DROP DATABASE IF EXISTS timecard;

CREATE DATABASE timecard DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
USE timecard;


CREATE TABLE users (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,

    username VARCHAR(12) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,  

    UNIQUE KEY (email),
    PRIMARY KEY (id)
);

CREATE TABLE cards (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,

    user INT(10) UNSIGNED NOT NULL,
    starttime datetime NOT NULL,
    stoptime datetime NOT NULL,
    submitted datetime NOT NULL,

    PRIMARY KEY (id)
);
