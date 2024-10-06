import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

const NewTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (title) {
      const timeLeft = Number(min) * 60 + Number(sec);
      onTaskAdded(title, timeLeft || null);
      setTitle('');
      setMin('');
      setSec('');
    }
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        autoFocus
        className="new-todo"
        placeholder="Task"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={(e) => setMin(e.target.value)}
        value={min}
        type="number"
        min="0"
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={(e) => setSec(e.target.value)}
        value={sec}
        type="number"
        max="59"
        min="0"
      />
      <input className="new-todo-form__submit" type="submit" />
    </form>
  );
};

NewTaskForm.defaultProps = {
  onTaskAdded: () => {},
};

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func,
};

export default NewTaskForm;
