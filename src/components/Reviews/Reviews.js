import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reviewsDetails } from '../../services/apiMovie';

class Reviews extends Component {
  state = {
    reviews: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    const reviews = await reviewsDetails(movieId);
    // console.log(reviews.data.results);
    this.setState({ reviews });
  }

  render() {
    const { reviews } = this.state;
    return (
      <>
        <ul>
          {reviews ? (
            reviews.map(({ id, author, content }) => {
              return (
                <li key={id}>
                  <h5>{author}</h5>
                  <p>{content}</p>
                </li>
              );
            })
          ) : (
            <p>No reviews</p>
          )}
        </ul>
      </>
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ),
};

export default Reviews;
