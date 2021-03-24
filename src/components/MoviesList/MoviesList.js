import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './MoviesList.module.css';
import MoviePreview from '../MoviePreview';

const MoviesList = ({ movies, location }) => {
  return (
    <ul className={s.movieList}>
      {movies.map(({ id, poster_path, title, release_date, vote_average }) => (
        <li key={id}>
          <NavLink
            className={s.navigation}
            to={{
              pathname: `/movies/${id}`,
              state: { from: location },
            }}
          >
            <MoviePreview
              poster_path={poster_path}
              title={title}
              release_date={release_date}
              vote_average={vote_average}
            />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(MoviesList);
