import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter';
import './Footer.css';

function Footer({ tasksLeft, onClearCompleted, filterValue, onFilterChange }) {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TaskFilter filter={filterValue} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  left: 0,
  onClearCompleted: () => {},
};

Footer.propTypes = {
  left: PropTypes.number,
  onClearCompleted: PropTypes.func,
};

export default Footer;
