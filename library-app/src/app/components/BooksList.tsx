import "./BooksList.Module.css";
import Book from "./Book";

const BooksList = () => {
    return (
        <div className="books-list">
            <div className="search-bar">
                <select aria-label="search by">
                    <option value="all">All</option>
                    <option value="title">Title</option>
                    <option value="genre">Genre</option>
                    <option value="author">Author(s)</option>
                </select>

                <form action="/search" method="get">
                    <input
                        name="title"
                        type="text"
                        placeholder="Search Titles"
                    />
                </form>
            </div>

            <div className="container">
                <Book />
            </div>
        </div>
    );
};

export default BooksList;
