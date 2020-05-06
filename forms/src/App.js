import React, { Component } from 'react';
import MoviesList from './MoviesList';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
const moviesData = [
  { 'hasOscars': false, 'title': 'The Shawshank Redemption', 'director': 'Frank Darabont', 'rate': '9.3', 'id': 0 },
  { 'hasOscars': true, 'title': 'The Godfather', 'director': 'Francis Ford Coppola', 'rate': '9.2', 'id': 1 },
  { 'hasOscars': true, 'title': 'The Godfather: Part II', 'director': 'Francis Ford Coppola', 'rate': '9.0', 'id': 2 },
  { 'hasOscars': true, 'title': 'The Dark Knight', 'director': 'Christopher Nolan', 'rate': '9.0', 'id': 3 },
  { 'hasOscars': false, 'title': '12 Angry Men', 'director': 'Sidney Lumet', 'rate': '8.9', 'id': 4 }
];

class App extends Component {

  state = {
    movies: moviesData,
    title: '',
    director: '',
    hasOscars: false
  };

  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    })
  }

  handleDirectorChange = event => {
    this.setState({
      director: event.target.value
    })
  }

  handleCheckboxChange = event => {
    this.setState({
      hasOscars: event.target.checked
    })
  }

  // all three handlers could be refactored to this:
  // then every onChange would reference handleChange
  /*
  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value
    this.setState({
      [name]: value
    })
  }
  */

  handleSubmit = event => {
    event.preventDefault();
    const { title, director, hasOscars } = this.state;
    const newMovie = {
      title,
      director,
      hasOscars,
      id: uuidv4()
    };
    this.setState({
      movies: [newMovie, ...this.state.movies],
      title: '',
      director: '',
      hasOscars: false
    })
    // console.log(newMovie);
  }

  render() {

    return (
      <div className='App'>
        <h1>Movies</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <label htmlFor="director">Director: </label>
          <input
            type="text"
            name="director"
            id="director"
            value={this.state.director}
            onChange={this.handleDirectorChange}
          />
          <input
            type="checkbox"
            name="hasOscars"
            id="hasOscars"
            checked={this.state.hasOscars}
            onChange={this.handleCheckboxChange}
          />
          <button type="submit">Add a movie</button>
        </form>
        {this.state.movies.length === 0 && <h2> No movies here</h2>}

        <MoviesList movies={this.state.movies} />
      </div >
    );
  }
}

export default App;