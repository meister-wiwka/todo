import React from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';
import { filters } from './filterConstants';

const TaskFilter = ({ filter, onFilterChange }) => {
  const listItems = filters.map(({ name, label }) => {
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

  return <ul className="filters">{listItems}</ul>;
};

TaskFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
};

TaskFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default TaskFilter;
