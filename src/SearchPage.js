import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import PropTypes from 'prop-types'

class SearchPage extends Component {
	static propTypes = {
	    currentlyReading: PropTypes.array.isRequired,
	    wantToRead: PropTypes.array.isRequired,
	    read: PropTypes.array.isRequired,
	    moveBook: PropTypes.func.isRequired
	}

	state = {
		query: '',
		searchedBooks: [],
		errorMessage: ''
	}

	updateQuery = (query) => {
		this.setState({ query: query })
		this.searchBook(query)
	}

	// Run search method on BooksAPI to find books matching query string, then add to searchedBooks state
	searchBook = (query) => {
		BooksAPI.search(query).then((searched) => {
			this.setState({
				searchedBooks: searched,
				errorMessage: ''
			})
		}).catch(() => {
			this.setState({
				searchedBooks: [],
				errorMessage: 'No Books Found'
			})
			console.log('Could not find book based on search')
		})
	}

	render() {
		const { currentlyReading, wantToRead, read, moveBook } = this.props;
		const { query, searchedBooks, errorMessage } = this.state;

		const allBooks = currentlyReading.concat(wantToRead, read);
		const allBooksId = allBooks.map((book) => {
			return book.id
		})

		// check if book exists on shelves
		const checkValue = (book) => {
			return allBooksId.indexOf(book.id) > -1 ? allBooks[allBooksId.indexOf(book.id)].shelf : 'none'
		}

		return (
		<div className="search-books">
			<div className="search-books-bar">
			  <Link className="close-search" to='/'>Close</Link>
			  <div className="search-books-input-wrapper">
			    <input
				    type="text"
				    placeholder="Search by title or author"
				    value={query}
				    onChange={(e) => this.updateQuery(e.target.value)}
			    />

			  </div>
			</div>
			<div className="search-books-results">
				<ol className="books-grid">
				{errorMessage ? <div>{errorMessage}</div> :
					searchedBooks.map((book, index) => {
						return <li key={index}>
									<div className="book">
									  <div className="book-top">
									    <div className="book-cover" style={{ width: 128, height: 193,
									    	backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
									    <div className="book-shelf-changer">
									      <select onChange={ (e) => moveBook(book, e.target.value) } value={checkValue(book)}>
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
									</div>
								</li>
						})}
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchPage