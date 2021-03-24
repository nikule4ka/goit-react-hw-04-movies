import React, { Component } from 'react';
import MoviesList from '../components/MoviesList';
import axios from 'axios';

import SearchForm from '../components/SearchForm';

class MoviesPage extends Component {
  state = {
    movies: [],
  };

  onChangeQuery = query => {
    const api = 'https://api.themoviedb.org/3/';
    const APIKey = 'ca6527f758dde8ca5b64b1585c945c26';
    axios
      .get(`${api}search/movie?query=${query}&api_key=${APIKey}`)
      .then(response => {
        this.setState({ movies: response.data.results });
      });
  };

  render() {
    const { movies } = this.state;

    return (
      <div>
        <SearchForm onSubmit={this.onChangeQuery} />
        <MoviesList movies={movies} />
      </div>
    );
  }
}

export default MoviesPage;
