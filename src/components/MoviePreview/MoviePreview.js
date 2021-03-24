import React from 'react';
import s from './MoviePreview.module.css';
import PropTypes from 'prop-types';

const MoviePreview = ({ poster_path, title, release_date, vote_average }) => {
  return (
    <div className={s.card}>
      <div className={s.MoviePreviewThumb}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
        />
      </div>
      <div className={s.cardBody}>
        <h4 className={s.cardTitle}>{title}</h4>
        <p className={s.cardText}>{release_date}</p>
        <p className={s.cardText}>{vote_average}</p>
      </div>
    </div>
  );
};

MoviePreview.propTypes = {
  poster_path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  vote_average: PropTypes.string.isRequired,
};

export default MoviePreview;
