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

  moveBook = (book, toShelf) => {
    // Each time a book is moved, run update function to get new books
    BooksAPI.update(book, toShelf).then((books) => {
      this.setState(prevState => ({
          currentlyReading: prevState.currentlyReading.filter(prevBook => prevBook.id !== book.id),
          wantToRead: prevState.wantToRead.filter(prevBook => prevBook.id !== book.id),
          read: prevState.read.filter(prevBook => prevBook.id !== book.id)
      }))

      toShelf === 'currentlyReading' && (
        this.setState(prevState => ({ currentlyReading: prevState[toShelf].concat( [book] )}))
      )
      toShelf === 'wantToRead' && (
        this.setState(prevState => ({ wantToRead: prevState[toShelf].concat( [book] )}))
      )
      toShelf === 'read' && (
        this.setState(prevState => ({ read: prevState[toShelf].concat( [book] )}))
      )
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
