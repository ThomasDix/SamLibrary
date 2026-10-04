package com.example.library.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String author;

    private String isbn;

    private Integer publishYear;

    private String thumbnail;

    @Column(unique = true)
    private String openLibraryKey;

    public Book() {}

    public Book(String title, String author, String isbn, Integer publishYear, Integer userId, String thumbnail) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.publishYear = publishYear;
        this.thumbnail = thumbnail;
        
    }

    public Book(
        String title,
        String author,
        String isbn,
        Integer publishYear,
        Integer something,
        String thumbnail,
        String openLibraryKey
) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.publishYear = publishYear;
    this.thumbnail = thumbnail;
    this.openLibraryKey = openLibraryKey;
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
    
    public String getThumbnail() {
        return thumbnail;
    }

    public String getOpenLibraryKey() {
        return openLibraryKey;
    }
    

}
