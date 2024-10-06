import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './Task.css';
import TaskTimer from '../TaskTimer';

const Task = ({ task, onTaskDeleted, onToggleCompleted, onTaskEdited }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.description);
  const [className, setClassName] = useState('');

  useEffect(() => {
    task.completed ? setClassName('completed') : setClassName('');
  }, [task.completed]);

  const onEditClick = () => {
    setIsEditing(true);
    setClassName('editing');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title !== task.description) {
      onTaskEdited(task.id, { description: title });
    }
    setIsEditing(false);
    task.completed ? setClassName('completed') : setClassName('');
  };

  const editForm = (
    <form onSubmit={(e) => onSubmit(e)}>
      <input autoFocus className="edit" onChange={(e) => setTitle(e.target.value)} value={title} />
    </form>
  );

  return (
    <li className={className}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          id={task.id}
          onClick={() => onToggleCompleted(task.id)}
          defaultChecked={task.completed}
        />
        <label htmlFor={task.id}>
          <span className="title">{task.description}</span>
          <TaskTimer time={task.timeLeft} id={task.id} isChecked={task.completed} onTaskEdited={onTaskEdited} />
          <span className="description">{formatDistanceToNow(task.created)}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onEditClick} />
        <button type="button" className="icon icon-destroy" onClick={() => onTaskDeleted(task.id)} />
      </div>
      {isEditing ? editForm : null}
    </li>
  );
};

Task.defaultProps = {
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onEdited: () => {},
};

Task.propTypes = {
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onEdited: PropTypes.func,
};

export default Task;
