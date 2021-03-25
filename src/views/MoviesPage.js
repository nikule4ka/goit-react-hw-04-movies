import React, { Component } from 'react';
import MoviesList from '../components/MoviesList';
import { searchMovies } from '../services/apiMovie';
import SearchForm from '../components/SearchForm';

class MoviesPage extends Component {
  state = {
    movies: [],
    searchQuery: '',
  };

  componentDidMount() {
    const { search, pathname } = this.props.location;

    if (pathname && search) {
      this.setState({ searchQuery: search.slice(7) });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      const movies = await searchMovies(searchQuery);
      this.setState({ movies });
    }
  }

  onChangeQuery = searchQuery => {
    const { location, history } = this.props;

    this.setState({ movies: [], searchQuery });

    history.push({ ...location, search: `query=${searchQuery}` });
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
