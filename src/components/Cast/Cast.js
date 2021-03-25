import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Cast.module.css';
import inkognito from './inkognito.jpeg';
import { castDetails } from '../../services/apiMovie';

class Cast extends Component {
  state = {
    cast: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    const cast = await castDetails(movieId);
    // console.log(cast.data.cast);
    this.setState({ cast });
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
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      credit_id: PropTypes.number.isRequired,
      profile_path: PropTypes.string,
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
    }),
  ),
};

export default Cast;
