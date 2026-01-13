package com.example.library.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String isbn;
    private Integer publishYear;
    private String thumbnail;

    private Integer userId;

    public Book() {}

    public Book(String title, String author, String isbn, Integer publishYear, Integer userId, String thumbnail) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.publishYear = publishYear;
        this.userId = userId;
        this.thumbnail = thumbnail;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getIsbn() {
        return isbn;
    }

    public Integer getPublishYear() {
        return publishYear;
    }

    public Integer getUserId() {
        return userId;
    }
    
    public String getThumbnail() {
        return thumbnail;
    }
}
