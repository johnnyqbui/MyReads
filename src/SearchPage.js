import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import PropTypes from 'prop-types'
import Book from './Book'

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
		if (query.length > 1) {
			BooksAPI.search(query).then((searched) => {
				this.setState({
					searchedBooks: searched,
					errorMessage: ''
				})
				// catch thrown errors from failed query searches
			}).catch(() => {
				this.setState({
					searchedBooks: [],
					errorMessage: 'No Books Found'
				})
			})
		}
	}

	checkValue = (book) => {
		const { currentlyReading, wantToRead, read } = this.props;
		const allBooks = currentlyReading.concat(wantToRead, read);
		const allBooksId = allBooks.map((book) => {
			return book.id
		})
		return allBooksId.indexOf(book.id) > -1 ? allBooks[allBooksId.indexOf(book.id)].shelf : 'none'
	}

	render() {
		const { moveBook } = this.props;
		const { query, searchedBooks, errorMessage } = this.state;

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
						searchedBooks.map((book, index) =>
			        		<Book
				        		book={book}
				        		key={index}
				        		moveBook={moveBook}
				        		shelf={this.checkValue(book)}
				        	/>)}
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchPage