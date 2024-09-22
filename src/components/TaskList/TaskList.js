import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';
import './TaskList.css';

function TaskList({ tasks, onDeleted, onToggleCompleted, onEdited }) {
  const tasksList = tasks.map((elem) => (
    <Task
      key={elem.id}
      task={elem}
      onDeleted={() => onDeleted(elem.id)}
      onToggleCompleted={() => onToggleCompleted(elem.id)}
      onEdited={onEdited}
    />
  ));

  return <ul className="todo-list">{tasksList}</ul>;
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default TaskList;
