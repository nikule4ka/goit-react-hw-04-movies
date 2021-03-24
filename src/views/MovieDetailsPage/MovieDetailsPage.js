import React, { Component } from 'react';
import Axios from 'axios';
import { NavLink, Route } from 'react-router-dom';
import Cast from '../../components/Cast';
import Reviews from '../../components/Reviews';
import inkognito from '../../components/Cast/inkognito.jpeg';
import s from './MovieDetailPage.module.css';
import routes from '../../routes';

class MovieDetailsPage extends Component {
  state = {
    movie: null,
    poster_path: '',
    title: null,
    overview: null,
    genres: null,
  };

  async componentDidMount() {
    const APIKey = 'ca6527f758dde8ca5b64b1585c945c26';
    const { movieId } = this.props.match.params;

    const movie = await Axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKey}`,
    );
    // console.log(movie.data);
    this.setState({ ...movie.data });
  }

  handleGoBack = () => {
    const { location, history } = this.props;
    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }
    history.push(routes.home);
  };

  render() {
    const { match } = this.props;
    const { poster_path, title, overview, genres } = this.state;
    const imgCheck = poster_path
      ? `https://image.tmdb.org/t/p/w500/${poster_path}`
      : inkognito;

    return (
      <div className={s.mainContainer}>
        <button type="button" onClick={this.handleGoBack} className={s.btn}>
          Go back
        </button>

        <div className={s.container}>
          <div>
            <img className={s.img} src={imgCheck} alt={title} />
          </div>
          <div className={s.containerText}>
            <h3 className={s.title}>{title}</h3>
            <h4 className={s.titleDescr}> Overview</h4>
            <p>{overview}</p>

            {genres && (
              <>
                <h4 className={s.titleDescr}>Genres</h4>
                <ul>
                  {genres.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <ul className={s.navigation}>
          <li>
            <NavLink className={s.link} to={`${match.url}/cast`}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink className={s.link} to={`${match.url}/reviews`}>
              Reviews
            </NavLink>
          </li>
        </ul>

        <Route path={`${match.path}/cast`} component={Cast} />
        <Route path={`${match.path}/reviews`} component={Reviews} />
      </div>
    );
  }
}

export default MovieDetailsPage;
