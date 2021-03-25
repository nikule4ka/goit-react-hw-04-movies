import React, { Component } from 'react';

import MoviesList from '../components/MoviesList';
import { trendsMovies } from '../services/apiMovie';

class MoviesPage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const movies = await trendsMovies();
    // console.log(trendMovies.data);
    this.setState({ movies });
  }

  render() {
    const { movies } = this.state;
    return (
      <>
        <MoviesList movies={movies} />
      </>
    );
  }
}

export default MoviesPage;
