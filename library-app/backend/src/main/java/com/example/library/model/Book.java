package com.example.library.model;

public class Book {

    /* Unique identifier for book */
    private final int bookId;

    /* Title of the book */
    private final String title;

    /* Author(s) of the book */
    private final String authors;

    /* Categories of the book */
    private final String categories;

    /* Thumbnail image path for the book */
    private final String thumbNail;

    /* Description of the book */
    private final String description;

    /* Year the book was published */
    private final int publishedYear;

    /* Average rating of the book */
    private final double averageRating;

    /* User associated with the book */
    private final Integer userId;

    /**
     * Constructs a BasicBook with specified details.
     *
     * @param bookId
     * @param title
     * @param authors
     * @param categories
     * @param thumbNail
     * @param description
     * @param publishedYear
     * @param averageRating
     * @param userId
     */

    public Book(int bookId, String title, String authors, String categories, String thumbNail, String description,
            int publishedYear, double averageRating, Integer userId) {
        this.bookId = bookId;
        this.title = title;
        this.authors = authors;
        this.categories = categories;
        this.thumbNail = thumbNail;
        this.description = description;
        this.publishedYear = publishedYear;
        this.averageRating = averageRating;
        this.userId = userId;
    }

    /* returns unique identifier for book */
    public int getBookId() {
        return bookId;
    }

    /* returns title of the book */
    public String getTitle() {
        return title;
    }

    /* returns author(s) of the book */
    public String getAuthors() {
        return authors;
    }

    /* returns categories of the book */
    public String getCategories() {
        return categories;
    }

    /* returns thumbnail image path for the book */
    public String getThumbNail() {
        return thumbNail;
    }

    /* returns description of the book */
    public String getDescription() {
        return description;
    }

    /* returns year the book was published */
    public int getPublishedYear() {
        return publishedYear;
    }

    /* returns average rating of the book */
    public double getAverageRating() {
        return averageRating;
    }

    /* returns user associated with the book */
    public Integer getUser() {
        return userId;
    }
}
    