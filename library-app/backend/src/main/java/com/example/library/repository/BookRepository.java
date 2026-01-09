package com.example.library.repository;

import com.example.library.model.Book;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookRepository {

    private final JdbcTemplate jdbcTemplate;

    public BookRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Book book) {
        String sql = "INSERT INTO book (title, author, isbn, publish_year, user_id) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, book.getTitle(), book.getAuthor(), book.getIsbn(), book.getPublishYear(), book.getUserId());
    }

    public List<Book> findAll() {
        String sql = "SELECT * FROM book";
        return jdbcTemplate.query(sql, new BookRowMapper());
    }

    public Book findById(int id) {
        try {
            String sql = "SELECT * FROM book WHERE book_id = ?";
            return jdbcTemplate.queryForObject(sql, new BookRowMapper(), id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }


    public List<Book> searchByTitle(String title) {
        String sql = "Select * FROM book Where LOWER(title) LIKE ?";

        String like = "%" + title.toLowerCase() + "%";

        return jdbcTemplate.query(sql, new BookRowMapper(), like);
    }

    

}
