import React, { Suspense, lazy } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AppBar from './components/AppBar';
import routes from './routes';

const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);
const NotFoundPage = lazy(() =>
  import('./views/NotFoundPage' /* webpackChunkName: "not-found-page" */),
);

function App() {
  return (
    <div className="App">
      <AppBar />

      <Suspense fallback={<h4>Loading...</h4>}>
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route exact path={routes.movies} component={MoviesPage} />
          <Route path={routes.movieDetails} component={MovieDetailsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
