import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';

const Navigation = () => {
  return (
    <nav className="Nav__header">
      <ul className="Nav__list">
        <li className="Nav__page">
          <NavLink
            exact
            to={routes.home}
            className="NavLink"
            activeClassName="NavLink__active"
          >
            Home
          </NavLink>
        </li>
        <li className="Nav__page">
          <NavLink
            to={routes.movies}
            className="NavLink"
            activeClassName="NavLink__active"
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
