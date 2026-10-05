package com.example.library.service;

public class SearchBook {

private Long id;
private String title;
private String author;
private String isbn;
private Integer publishYear;
private String thumbnail;
private String openLibraryKey;
private boolean isSaved;

public SearchBook(
        Long id,
        String title,
        String author,
        String isbn,
        Integer publishYear,
        String thumbnail,
        String openLibraryKey,
        boolean isSaved
) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.publishYear = publishYear;
    this.thumbnail = thumbnail;
    this.openLibraryKey = openLibraryKey;
    this.isSaved = isSaved;
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

public boolean isSaved() {
    return isSaved;
}

}
