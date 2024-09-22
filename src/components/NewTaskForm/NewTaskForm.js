import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    description: '',
  };

  onLabelChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  onSubmit = (event) => {
    const { onTaskAdded } = this.props;
    const { description } = this.state;

    event.preventDefault();
    onTaskAdded(description);
    this.setState({
      description: '',
    });
  };

  render() {
    const { description } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          autoFocus
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={description}
        />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  onTaskAdded: () => {},
};

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func,
};
