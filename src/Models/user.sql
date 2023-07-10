use  library;
CREATE TABLE user (
id INT AUTO_INCREMENT PRIMARY KEY,
username  VARCHAR(26) NOT NULL UNIQUE,
password VARCHAR(200) NOT NULL,
email VARCHAR(26) NOT NULL,
admin BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO user (username, password, email, admin)
VALUES
    ('user2', 'pass123', 'user2@example.com', false),
    ('user3', 'pass456', 'user3@example.com', false),
    ('admin2', 'adminpass', 'admin2@example.com', true);

SELECT * FROM user;
Drop table user;