import React, { useEffect, useState } from 'react';

const TaskTimer = ({ time, isChecked, id, onTaskEdited }) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!timeLeft || !isRunning || isChecked) {
      setIsRunning(false);
      onTaskEdited(id, { timeLeft });
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
    return () => {
      onTaskEdited(id, { timeLeft });
      clearInterval(intervalId);
    };
  }, [timeLeft, isRunning, isChecked]);

  const transformTimeLeft = (time) => {
    const hour = Math.floor(time / 3600)
      .toString()
      .padStart(2, '0');
    const min = Math.floor((time - hour * 3600) / 60)
      .toString()
      .padStart(2, '0');
    const sec = (time - hour * 3600 - min * 60).toString().padStart(2, '0');

    return ` ${hour}:${min}:${sec} `;
  };

  const button = isRunning ? (
    <button className="icon icon-pause" onClick={() => setIsRunning(false)}></button>
  ) : (
    <button className="icon icon-play" onClick={() => setIsRunning(true)}></button>
  );

  return timeLeft !== null ? (
    <span className="description timer">
      {timeLeft && !isChecked ? button : null}
      <span>{timeLeft ? transformTimeLeft(timeLeft) : 'game over'}</span>
    </span>
  ) : null;
};

export default TaskTimer;
