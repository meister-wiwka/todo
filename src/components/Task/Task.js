import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './Task.css';
import TaskTimer from '../TaskTimer/TaskTimer';

export default class Task extends Component {
  state = {
    edit: false,
    description: '',
  };

  onEditClick = () => {
    const { task } = this.props;

    this.setState({
      edit: true,
      description: task.description,
    });
  };

  onLabelChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  onSubmit = (event) => {
    const { description } = this.state;
    const { task, onEdited } = this.props;

    event.preventDefault();
    if (description !== task.description) {
      onEdited(task.id, { description: description });
    }
    this.setState({
      edit: false,
    });
  };

  render() {
    const { task, onDeleted, onToggleCompleted, onEdited } = this.props;
    const { edit, description } = this.state;
    let classNames = '';

    const editForm = (
      <form onSubmit={this.onSubmit}>
        <input autoFocus className="edit" onChange={this.onLabelChange} value={description} />
      </form>
    );

    if (task.completed) {
      classNames = 'completed';
    }
    if (edit) {
      classNames = 'editing';
    }
    return (
      <li className={classNames}>
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
            <TaskTimer timeLeft={task.timeLeft} id={task.id} isChecked={task.completed} onEdit={onEdited} />
            <span className="description">{formatDistanceToNow(task.created)}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={this.onEditClick} />
          <button type="button" className="icon icon-destroy" onClick={() => onDeleted(task.id)} />
        </div>
        {edit ? editForm : null}
      </li>
    );
  }
}

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
