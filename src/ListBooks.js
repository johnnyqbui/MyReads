import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

const ListBooks = (props) => {
	const { currentlyReading, wantToRead, read, moveBook } = props;
	return (
	<div className="list-books">
		<div className="list-books-title">
		  <h1>MyReads</h1>
		</div>
		<div className="list-books-content">
		  <div>
		    <div className="bookshelf">
		      <h2 className="bookshelf-title">Currently Reading</h2>
		      <div className="bookshelf-books">
		        <ol className="books-grid">
		        	{currentlyReading.map((book, index) =>
		        		<Book
			        		book={book}
			        		key={index}
			        		moveBook={moveBook}
			        		shelf={book.shelf}
			        	/>)}
		        </ol>
		      </div>
		    </div>
		    <div className="bookshelf">
		      <h2 className="bookshelf-title">Want to Read</h2>
		      <div className="bookshelf-books">
		        <ol className="books-grid">
		        	{wantToRead.map((book, index) =>
			        	<Book
			        		book={book}
			        		key={index}
			        		moveBook={moveBook}
			        		shelf={book.shelf}
			        	/>)}
		        </ol>
		      </div>
		    </div>
		    <div className="bookshelf">
		      <h2 className="bookshelf-title">Read</h2>
		      <div className="bookshelf-books">
		        <ol className="books-grid">
		        	{read.map((book, index) =>
		        		<Book
			        		book={book}
			        		key={index}
			        		moveBook={moveBook}
			        		shelf={book.shelf}
		        		/>)}
		        </ol>
		      </div>
		    </div>
		  </div>
		</div>
		<div className="open-search">
		  <Link to='/search'>Add a book</Link>
		</div>
	</div>
	)
}

ListBooks.propTypes = {
	currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
}

export default ListBooks