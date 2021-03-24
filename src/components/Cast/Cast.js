import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import s from './Cast.module.css';
import inkognito from './inkognito.jpeg';

class Cast extends Component {
  state = {
    cast: [],
  };

  async componentDidMount() {
    const APIKey = 'ca6527f758dde8ca5b64b1585c945c26';
    const { movieId } = this.props.match.params;

    const cast = await Axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${APIKey}`,
    );
    // console.log(cast.data.cast);
    this.setState({ cast: cast.data.cast });
  }

  render() {
    const { cast } = this.state;

    return (
      <div className={s.card_actors}>
        <ul className={s.actorsList}>
          {cast.map(({ credit_id, profile_path, name, character }) => (
            <li key={credit_id} className={s.actor}>
              <img
                className={s.cast_img}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                    : inkognito
                }
                alt={name}
              />
              <h4>{name}</h4>
              <p>{character}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Cast.propTypes = {
  credit_id: PropTypes.number.isRequired,
  profile_path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
};

export default Cast;
