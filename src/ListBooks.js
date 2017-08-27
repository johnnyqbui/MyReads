import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

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
		        {currentlyReading.map((book, index) => {
		        	console.log(book)
		        	return <li key={index}>
								<div className="book">
								  <div className="book-top">
								    <div className="book-cover" style={{
								    	width: 128,
								    	height: 193,
								    	backgroundImage: `url("${book.imageLinks.thumbnail}")` }}>
								    </div>
								    <div className="book-shelf-changer">
								      <select onChange={ (e) => moveBook(book, e.target.value)} value="currentlyReading">
								        <option value="none" disabled>Move to...</option>
								        <option value="currentlyReading">Currently Reading</option>
								        <option value="wantToRead">Want to Read</option>
								        <option value="read">Read</option>
								        <option value="none">None</option>
								      </select>
								    </div>
								  </div>
								  <div className="book-title">{book.title}</div>
								  <div className="book-authors">{book.authors}</div>
								  <div className="book-category">Category: {book.categories}</div>
								</div>
							</li>
		        })}
		        </ol>
		      </div>
		    </div>
		    <div className="bookshelf">
		      <h2 className="bookshelf-title">Want to Read</h2>
		      <div className="bookshelf-books">
		        <ol className="books-grid">
		          {wantToRead.map((book, index) => {
		        	return <li key={index}>
								<div className="book">
								  <div className="book-top">
								    <div className="book-cover" style={{
								    	width: 128,
								    	height: 193,
								    	backgroundImage: `url("${book.imageLinks.thumbnail}")` }}>
								    </div>
								    <div className="book-shelf-changer">
								      <select onChange={ (e) => moveBook(book, e.target.value)} value="wantToRead">
								        <option value="none" disabled>Move to...</option>
								        <option value="currentlyReading">Currently Reading</option>
								        <option value="wantToRead">Want to Read</option>
								        <option value="read">Read</option>
								        <option value="none">None</option>
								      </select>
								    </div>
								  </div>
								  <div className="book-title">{book.title}</div>
								  <div className="book-authors">{book.authors}</div>
								  <div className="book-category">Category: {book.categories}</div>
								</div>
							</li>
		        })}
		        </ol>
		      </div>
		    </div>
		    <div className="bookshelf">
		      <h2 className="bookshelf-title">Read</h2>
		      <div className="bookshelf-books">
		        <ol className="books-grid">
		          {read.map((book, index) => {
		        	return <li key={index}>
								<div className="book">
								  <div className="book-top">
								    <div className="book-cover" style={{
								    	width: 128,
								    	height: 193,
								    	backgroundImage: `url("${book.imageLinks.thumbnail}")` }}>
								    </div>
								    <div className="book-shelf-changer">
								      <select onChange={ (e) => moveBook(book, e.target.value) } value="read" >
								        <option value="none" disabled>Move to...</option>
								        <option value="currentlyReading">Currently Reading</option>
								        <option value="wantToRead">Want to Read</option>
								        <option value="read">Read</option>
								        <option value="none">None</option>
								      </select>
								    </div>
								  </div>
								  <div className="book-title">{book.title}</div>
								  <div className="book-authors">{book.authors}</div>
								  <div className="book-category">Category: {book.categories}</div>
								</div>
							</li>
		        })}
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