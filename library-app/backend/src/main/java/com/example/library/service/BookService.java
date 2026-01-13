package com.example.library.service;

import com.example.library.model.Book;
import com.example.library.repository.BookRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> searchBooks(String query) {
        List<Book> resultBooks = new ArrayList<>();

        try{
            
            String encodedQuery = UriUtils.encodeQuery(query, StandardCharsets.UTF_8);
            String url = "https://openlibrary.org/search.json?q=" + encodedQuery;

            if (query.length() < 3) {
                throw new IllegalArgumentException("Search query must be at least 3 characters");
            }

            //Ugh
            HttpHeaders headers = new HttpHeaders();
            headers.set("User-Agent", "SamLibrary/1.0 (learning project)");

            HttpEntity<Void> entity = new HttpEntity<>(headers);

            // Make HTTP request
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            String body = response.getBody();

            JsonNode root = objectMapper.readTree(body);
            JsonNode docs = root.get("docs");

            for(int i = 0; i < docs.size() && i < 10; i++) {
                JsonNode doc = docs.get(i);
                String title = doc.has("title") ? doc.get("title").asText() : "Unknown Title";
                String author = doc.has("author_name") ? doc.get("author_name").get(0).asText() : "Unknown Author";
                String isbn = doc.has("isbn") ? doc.get("isbn").get(0).asText() : null;
                Integer publishYear = doc.has("first_publish_year") ? doc.get("first_publish_year").asInt() : null;
                String thumbnail = doc.has("cover_i") ? "https://covers.openlibrary.org/b/id/" + doc.get("cover_i").asText() + "-M.jpg" : null;

                Book book = new Book(title, author, isbn, publishYear, null, thumbnail);
                bookRepository.save(book);
                resultBooks.add(book);
            } //for

        } catch (Exception e) {
            e.printStackTrace();
        }

        return resultBooks;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    }

}