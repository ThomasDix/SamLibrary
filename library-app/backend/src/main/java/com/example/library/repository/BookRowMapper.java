package com.example.library.repository;

import com.example.library.model.Book;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BookRowMapper implements RowMapper<Book> {

    @Override
    public Book mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Book(
            rs.getInt("book_id"),
            rs.getString("title"),
            rs.getString("authors"),
            rs.getString("categories"),
            rs.getString("thumb_nail"),
            rs.getString("description"),
            rs.getInt("published_year"),
            rs.getDouble("average_rating"),
            (Integer) rs.getObject("user_id") 
        );
    }
}
