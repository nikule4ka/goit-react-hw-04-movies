import React, { Component, Suspense, lazy } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { movieDetails } from '../../services/apiMovie';

import inkognito from '../../components/Cast/inkognito.jpeg';
import s from './MovieDetailPage.module.css';
import routes from '../../routes';

const Cast = lazy(() =>
  import('../../components/Cast' /* webpackChunkName: "cast" */),
);

const Reviews = lazy(() =>
  import('../../components/Reviews' /* webpackChunkName: "reviews" */),
);

class MovieDetailsPage extends Component {
  state = {
    movie: null,
    poster_path: '',
    title: null,
    overview: null,
    genres: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    const movie = await movieDetails(movieId);
    this.setState({ ...movie });
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
    const { location } = this.props;

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
            <NavLink
              className={s.link}
              to={{
                pathname: `${match.url}/cast`,
                state: { ...location.state },
              }}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              className={s.link}
              to={{
                pathname: `${match.url}/reviews`,
                state: { ...location.state },
              }}
            >
              Reviews
            </NavLink>
          </li>
        </ul>

        <Suspense fallback={<h4>Loading...</h4>}>
          <Route path={`${match.path}/cast`} component={Cast} />
          <Route path={`${match.path}/reviews`} component={Reviews} />
        </Suspense>
      </div>
    );
  }
}

export default MovieDetailsPage;
