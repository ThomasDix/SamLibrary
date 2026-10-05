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

    public BookSearchResponse searchBooks(String query, int page, int limit) {
        List<SearchBook> resultBooks = new ArrayList<>();

        try{

            query = query.replace(" ", "+");
            String encodedQuery = UriUtils.encodeQueryParam(query, StandardCharsets.UTF_8);
            String url = "https://openlibrary.org/search.json" 
            + "?q=" + encodedQuery 
            + "&page=" + page
            + "&limit=" + limit;

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

            JsonNode root = objectMapper.readTree(response.getBody());

            int totalResults = root.has("numFound") ? root.get("numFound").asInt() : 0;
            JsonNode docs = root.get("docs");

            for(int i = 0; i < docs.size(); i++) {
                JsonNode doc = docs.get(i);
                
                String openLibraryKey = doc.has("key") ? doc.get("key").asText() : null;
                String title = doc.has("title") ? doc.get("title").asText() : "Unknown Title";
                String author = doc.has("author_name") ? doc.get("author_name").get(0).asText() : "Unknown Author";
                String isbn = doc.has("isbn") ? doc.get("isbn").get(0).asText() : null;
                Integer publishYear = doc.has("first_publish_year") ? doc.get("first_publish_year").asInt() : null;
                String thumbnail = doc.has("cover_i") ? "https://covers.openlibrary.org/b/id/" + doc.get("cover_i").asText() + "-M.jpg" : null;

                boolean isSaved = openLibraryKey != null && bookRepository.existsByOpenLibraryKey( openLibraryKey );
                
                SearchBook book = new SearchBook( null, title, author, isbn, publishYear, thumbnail, openLibraryKey, isSaved );
                resultBooks.add(book);
                
            } //for

            return new BookSearchResponse(resultBooks, page, limit, totalResults);

        } catch (Exception e) {
            e.printStackTrace();

            return new BookSearchResponse(resultBooks, page, limit, 0);
        }

        
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    }

    public void deleteBookById(Long id) {
        Book book = bookRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));

        bookRepository.delete(book);
    }

    public void deleteBookByOpenLibraryKey(String openLibraryKey) {
        Book book = bookRepository.findByOpenLibraryKey(openLibraryKey)
            .orElseThrow(() -> new RuntimeException("Book not found with Open Library Key: " + openLibraryKey));

        bookRepository.delete(book);
    }

}