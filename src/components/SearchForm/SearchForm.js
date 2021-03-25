import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './SearchForm.module.css';

class SearchForm extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { query } = this.state;

    if (query.trim() === '') {
      return toast.error('Please, enter the correct name');
    }
    this.props.onSubmit(query);
    // this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className={s.SearchFormInput}
          autoComplete="off"
          autoFocus
          type="text"
          value={query}
          onChange={this.handleChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default withRouter(SearchForm);
