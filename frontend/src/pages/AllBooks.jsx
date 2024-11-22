import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Add styles for the updated book cards

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data.books))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);
  const viewDetails = (bookId) => {
    if (!bookId) {
      console.error("Book ID is undefined");
      return;
    }
    navigate(`/book-details/${bookId}`);
  };

  return (
    <div className="all-books-container">
      <h1 className="all-books-title">Explore Our Collection</h1>
      <div className="book-list">
        {books.map((book) => (
          <div className="book-card" key={book._id}>
            <div className="book-cover-wrapper">
              <img src={book.cover_image} alt={book.title} className="book-cover" />
            </div>
            <div className="book-details">
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">{book.author}</p>
              <button className="details-button" onClick={() => viewDetails(book._id)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
