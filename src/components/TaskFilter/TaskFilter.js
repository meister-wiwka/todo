import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { filters } from './filterConstants';

import './TaskFilter.css';

export default class TaskFilter extends Component {
  render() {
    const { filter, onFilterChange } = this.props;

    const buttons = filters.map(({ name, label }) => {
      const isSelected = filter === name;
      const buttonClass = isSelected ? 'selected' : '';
      return (
        <li key={name}>
          <button type="button" className={buttonClass} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}

TaskFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
};

TaskFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};
