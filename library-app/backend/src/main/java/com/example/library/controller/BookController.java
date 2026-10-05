package com.example.library.controller;

import com.example.library.model.Book;
import com.example.library.repository.BookRepository;
import com.example.library.service.BookSearchResponse;
import com.example.library.service.BookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin(
    origins = "http://localhost:3000",
    methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.DELETE,
        RequestMethod.OPTIONS
    }
)public class BookController {

    private final BookService bookService;
    
    @Autowired
    private BookRepository repo;

     @GetMapping
    public List<Book> getBooks() {
        return repo.findAll();
    }

    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return repo.save(book);
    }

    @DeleteMapping("/by-key")
    public void removeBook(@RequestParam String openLibraryKey) {
        bookService.deleteBookByOpenLibraryKey(openLibraryKey);
    }

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    /* 
    @GetMapping()
    public List<Book> getBooks() {
        return bookService.getAllBooks();
    }
        */

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    @GetMapping("/search")
    public BookSearchResponse searchBooks(
    @RequestParam String query,
    @RequestParam(defaultValue = "1") int page, 
    @RequestParam(defaultValue = "12") int limit) {
        return bookService.searchBooks(query, page, limit);
    }

    @GetMapping("/test")
    public String test() {
        return "Books controller works";
    }
}
