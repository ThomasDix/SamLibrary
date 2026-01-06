CREATE TABLE book (
    book_id INT PRIMARY KEY,
    title VARCHAR(255),
    authors VARCHAR(255),
    categories VARCHAR(255),
    thumb_nail VARCHAR(255),
    description TEXT,
    published_year INT,
    average_rating DOUBLE,
    user_id INT
);
