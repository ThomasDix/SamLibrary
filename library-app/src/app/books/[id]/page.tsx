import Navigation from '../../components/Navigation'; // Nav
import Book from "../../components/Book";


type Book = {
    bookId: number;
    title: string;
    authors: string;
    categories: string;
    thumbNail: string;
    description: string;
    publishedYear: number;
    averageRating: number;
    userId: number | null;
}

type BookProps = {
    params: { id: string }
};

export default async function BookPage({ params }: BookProps) {
        const { id } = await Promise.resolve(params);


    const res = await fetch(`http://localhost:8080/books/${id}`, {
    cache: "no-store",
  });

  const book: Book = await res.json();

    return (
        <div className="background">
            <div className="wrapper">
                <div className="yer">

                    <Navigation/> {/* Navigation Bar */}
                    <div className="book-detail-card">
                        <div className="image-container">
                            <img src={book.thumbNail} alt={`${book.title} cover`} />
                        </div>
                        <div>
                        <h1>{book.title}</h1>
                        <p><strong>Authors:</strong> {book.authors}</p>
                        <p><strong>Category:</strong> {book.categories}</p>
                        <p><strong>Published Year:</strong> {book.publishedYear}</p>
                        <p>{book.description}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>)
}