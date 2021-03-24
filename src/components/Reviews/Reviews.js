import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const APIKey = 'ca6527f758dde8ca5b64b1585c945c26';
    const { movieId } = this.props.match.params;

    const reviews = await Axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${APIKey}`,
    );
    // console.log(reviews.data.results);
    this.setState({ reviews: reviews.data.results });
  }

  render() {
    const { reviews } = this.state;
    return reviews.length > 0 ? (
      <ul>
        {reviews.map(({ id, author, content }) => (
          <li key={id}>
            <h5>{author}</h5>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p>No reviews</p>
    );
  }
}

Reviews.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Reviews;
