package com.example.library.service;

import com.example.library.model.Book;
import java.util.List;

import org.apache.catalina.connector.Response;

public class BookSearchResponse {
    
    private List<Book> books;
    private int page;
    private int limit;
    private int totalResults;

    public BookSearchResponse(List<Book> books, int page, int limit, int totalResults) {
        this.books = books;
        this.page = page;
        this.limit = limit;
        this.totalResults = totalResults;
    }

    public List<Book> getBooks() {
        return books;
    }

    public int getPage() {
        return page;
    }

    public int getLimit() {
        return limit;
    }

    public int getTotalResults() {
        return totalResults;
    }

    

}
