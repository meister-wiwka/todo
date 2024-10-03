import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    title: '',
    timerMin: '',
    timerSec: '',
  };

  onTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  onMinChange = (event) => {
    this.setState({
      timerMin: event.target.value,
    });
  };

  onSecChange = (event) => {
    this.setState({
      timerSec: event.target.value,
    });
  };

  onSubmit = (event) => {
    const { onTaskAdded } = this.props;
    const { title, timerMin, timerSec } = this.state;

    event.preventDefault();
    if (title) {
      const timeLeft = Number(timerMin) * 60 + Number(timerSec);
      onTaskAdded(title, timeLeft || null);
      this.setState({
        title: '',
        timerMin: '',
        timerSec: '',
      });
    }
  };

  render() {
    const { title, timerMin, timerSec } = this.state;

    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input autoFocus className="new-todo" placeholder="Task" onChange={this.onTitleChange} value={title} />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onMinChange}
          value={timerMin}
          type="number"
          min="0"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onSecChange}
          value={timerSec}
          type="number"
          max="59"
          min="0"
        />
        <input className="new-todo-form__submit" type="submit" />
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
