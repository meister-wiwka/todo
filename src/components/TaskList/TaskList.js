import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';
import './TaskList.css';

function TaskList({ tasks, onTaskDeleted, onToggleCompleted, onTaskEdited }) {
  const tasksList = tasks.map((elem) => {
    return (
      <Task
        key={elem.id}
        task={elem}
        onTaskDeleted={onTaskDeleted}
        onToggleCompleted={onToggleCompleted}
        onTaskEdited={onTaskEdited}
      />
    );
  });

  return <ul className="todo-list">{tasksList}</ul>;
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default TaskList;
