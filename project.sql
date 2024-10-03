create database curd;
USE curd;

CREATE TABLE media_data (
    mobile_number VARCHAR(15) PRIMARY KEY,
    phone_number_id VARCHAR(20) NOT NULL,
    media_id VARCHAR(20) NOT NULL,
    filename TEXT NOT NULL,
    upload_date_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

select * from media_data;

