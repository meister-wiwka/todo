import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './App.css';

const initialData = [
  {
    id: uuidv4(),
    description: 'learn react',
    timeLeft: 3,
    created: new Date(),
    completed: false,
  },
  {
    id: uuidv4(),
    description: 'practice react',
    timeLeft: 3,
    created: new Date(),
    completed: false,
  },
  {
    id: uuidv4(),
    description: 'relax',
    timeLeft: 3,
    created: new Date(),
    completed: false,
  },
];

const App = () => {
  const [todos, setTodos] = useState(initialData);
  const [filter, setFilter] = useState('all');

  const createTask = (description, timeLeft) => {
    return {
      id: uuidv4(),
      description,
      timeLeft,
      created: new Date(),
      completed: false,
    };
  };

  const addTask = (description, timeLeft) => {
    setTodos((currentTodos) => {
      const newTask = createTask(description, timeLeft);
      return [...currentTodos, newTask];
    });
  };

  const deleteTask = (id) => {
    setTodos((currentTodos) => currentTodos.filter((task) => task.id !== id));
  };

  const editTask = (id, editValue) => {
    setTodos((currentTodos) => currentTodos.map((task) => (task.id === id ? { ...task, ...editValue } : task)));
  };

  const onToggleCompleted = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const onClearCompleted = () => {
    setTodos((currentTodos) => currentTodos.filter((task) => !task.completed));
  };

  const onFilterChange = (value) => {
    setFilter(value);
  };

  const myFilter = (value) => {
    switch (value) {
      case 'active':
        return todos.filter((elem) => !elem.completed);
      case 'completed':
        return todos.filter((elem) => elem.completed);
      case 'all':
      default:
        return todos;
    }
  };

  return (
    <section className="todoapp">
      <Header onTaskAdded={addTask} />
      <section className="main">
        <TaskList
          tasks={myFilter(filter)}
          onTaskDeleted={deleteTask}
          onToggleCompleted={onToggleCompleted}
          onTaskEdited={editTask}
        />
        <Footer
          tasksLeft={todos.filter((task) => !task.completed).length}
          onClearCompleted={onClearCompleted}
          filterValue={filter}
          onFilterChange={onFilterChange}
        />
      </section>
    </section>
  );
};

export default App;
