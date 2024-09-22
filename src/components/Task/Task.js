import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './Task.css';

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
      onEdited(task.id, description);
    }
    this.setState({
      edit: false,
    });
  };

  render() {
    const { task, onDeleted, onToggleCompleted } = this.props;
    const { edit, description } = this.state;
    let classNames = '';
    let isChecked = false;

    const editForm = (
      <form onSubmit={this.onSubmit}>
        <input autoFocus className="edit" onChange={this.onLabelChange} value={description} />
      </form>
    );

    if (task.completed) {
      classNames = 'completed';
      isChecked = true;
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
            onClick={onToggleCompleted}
            defaultChecked={isChecked}
          />
          <label htmlFor={task.id}>
            <span className="description">{task.description}</span>
            <span className="created">{formatDistanceToNow(task.created)}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={this.onEditClick} />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
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
