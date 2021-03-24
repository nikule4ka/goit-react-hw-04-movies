import React, { Component } from 'react';
import Axios from 'axios';

import MoviesList from '../components/MoviesList';

class MoviesPage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const APIKey = 'ca6527f758dde8ca5b64b1585c945c26';

    const trendMovies = await Axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}`,
    );
    // console.log(trendMovies.data);
    this.setState({ movies: trendMovies.data.results });
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
