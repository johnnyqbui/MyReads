import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import ListBooks from './ListBooks'

class BooksApp extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    // Get all books from BooksApi
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        read: books.filter(book => book.shelf === 'read')
      })
    })
  }

  moveBook = (bookToBeMoved, toShelf) => {
    const { currentlyReading, wantToRead, read } = this.state;

    // Each time a book is moved, run update function to get new books
    BooksAPI.update(bookToBeMoved, toShelf).then((books) => {

      // Compare each previous state shelf with the new shelf by it's id:
      // Remove books that is not on the new shelf.
      // Add books by using get method from BooksAPI to get new books and add them to the shelf.

      // Currently Reading Shelf
      if (currentlyReading.length > books.currentlyReading.length) {
        this.setState((prevState) => ({
            currentlyReading: prevState.currentlyReading.filter((book) => {
              return books.currentlyReading.indexOf(book.id) !== -1
            })
        }))
      } else if (currentlyReading.length < books.currentlyReading.length) {
        let id = books.currentlyReading[books.currentlyReading.length-1];
        BooksAPI.get(id).then((book) => {
          this.setState({
            currentlyReading: [...currentlyReading, book]
          })
        })
      }

      // Want to read Shelf
      if (wantToRead.length > books.wantToRead.length) {
        this.setState((prevState) => ({
          wantToRead: prevState.wantToRead.filter((book) => {
            return books.wantToRead.indexOf(book.id) !== -1
          })
        }))
      } else if (wantToRead.length < books.wantToRead.length) {
        let id = books.wantToRead[books.wantToRead.length-1];
        BooksAPI.get(id).then((book) => {
          this.setState({
            wantToRead: [...wantToRead, book]
          })
        })
      }

      // Read Shelf
      if (read.length > books.read.length) {
        this.setState((prevState) => ({
          read: prevState.read.filter((book) => {
            return books.read.indexOf(book.id) !== -1
          })
        }))
      } else if (read.length < books.read.length) {
        let id = books.read[books.read.length-1];
        BooksAPI.get(id).then((book) => {
          this.setState({
            read: [...read, book]
          })
        })
      }
    })
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state;

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            currentlyReading={ currentlyReading }
            wantToRead={ wantToRead }
            read={ read }
            moveBook= { this.moveBook }
          />
        )} />
        <Route path='/search' render={( history ) => (
          <SearchPage
            currentlyReading={ currentlyReading }
            wantToRead={ wantToRead }
            read={ read }
            moveBook={ this.moveBook }
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
