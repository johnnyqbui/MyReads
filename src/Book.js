import React from 'react'
import PropTypes from 'prop-types'

const Book = (props) => {
	const { book, moveBook, shelf } = props;
	return (
		<li>
			<div className="book">
			  <div className="book-top">
			    <div className="book-cover" style={{
			    	width: 128,
			    	height: 193,
			    	backgroundImage: `url("${book.imageLinks.thumbnail}")` }}>
			    </div>
			    <div className="book-shelf-changer">
			      <select onChange={ (e) => moveBook(book, e.target.value)} value={shelf}>
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
	)
}

Book.propTypes = {
	book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired
}

export default Book