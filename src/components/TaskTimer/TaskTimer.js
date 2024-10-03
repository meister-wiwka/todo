import React, { Component } from 'react';

export default class TaskTimer extends Component {
  state = {
    timeLeft: null,
    isStarted: false,
  };

  componentDidMount() {
    this.setState({
      timeLeft: this.props.timeLeft,
    });
  }

  componentDidUpdate(prevProps) {
    const { isChecked } = this.props;

    if (prevProps.isChecked !== isChecked) {
      this.onPauseClick();
    }
  }

  componentWillUnmount() {
    const { id, onEdit } = this.props;

    clearInterval(this.timerID);
    onEdit(id, { timeLeft: this.state.timeLeft });
  }

  tick = () => {
    const { timeLeft } = this.state;

    if (timeLeft > 0) {
      this.setState({
        timeLeft: timeLeft - 1,
      });
    } else {
      clearInterval(this.timerID);
      this.setState({
        timeLeft,
        isStarted: false,
      });
    }
  };

  onPlayClick = () => {
    if (!this.state.isStarted && !this.props.isChecked) {
      this.timerID = setInterval(() => this.tick(), 1000);
      this.setState({ isStarted: true });
    }
  };

  onPauseClick = () => {
    clearInterval(this.timerID);
    this.setState({ isStarted: false });
  };

  transformTimeLeft = (timeLeft) => {
    const hour = Math.floor(timeLeft / 3600)
      .toString()
      .padStart(2, '0');
    const min = Math.floor((timeLeft - hour * 3600) / 60)
      .toString()
      .padStart(2, '0');
    const sec = (timeLeft - hour * 3600 - min * 60).toString().padStart(2, '0');

    return ` ${hour}:${min}:${sec} `;
  };

  render() {
    const { isChecked } = this.props;
    const { timeLeft, isStarted } = this.state;
    const timer = timeLeft ? this.transformTimeLeft(timeLeft) : 'time is over';
    const button = isStarted ? (
      <button className="icon icon-pause" onClick={this.onPauseClick}></button>
    ) : (
      <button className="icon icon-play" onClick={this.onPlayClick}></button>
    );

    return timeLeft !== null ? (
      <span className="description">
        {timeLeft && !isChecked ? button : null}
        <span>{timer}</span>
      </span>
    ) : null;
  }
}
