import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './TodoApp.css';

export default class TodoApp extends Component {
  static createTodoItem(description) {
    const task = {
      id: uuidv4(),
      description,
      created: new Date(),
      completed: false,
    };

    return task;
  }

  state = {
    data: [
      {
        id: uuidv4(),
        description: 'learn react',
        created: new Date(),
        completed: false,
      },
      {
        id: uuidv4(),
        description: 'practice react',
        created: new Date(),
        completed: false,
      },
      {
        id: uuidv4(),
        description: 'relax',
        created: new Date(),
        completed: false,
      },
    ],
    filter: 'all',
  };

  deleteItem = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const newData = [...data.slice(0, index), ...data.slice(index + 1)];

      return {
        data: newData,
      };
    });
  };

  addItem = (description) => {
    const newItem = TodoApp.createTodoItem(description);

    this.setState(({ data }) => {
      const newData = [newItem, ...data];

      return {
        data: newData,
      };
    });
  };

  editItem = (id, description) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const oldItem = data[index];
      const newItem = { ...oldItem, description };
      const newData = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

      return {
        data: newData,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const oldItem = data[index];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      const newData = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

      return {
        data: newData,
      };
    });
  };

  onClearCompleted = () => {
    const { data } = this.state;
    const completedCount = data.filter((elem) => elem.completed);
    completedCount.forEach((elem) => this.deleteItem(elem.id));
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  myFilter(filter) {
    const { data } = this.state;

    switch (filter) {
      case 'active':
        return data.filter((elem) => !elem.completed);
      case 'completed':
        return data.filter((elem) => elem.completed);
      case 'all':
      default:
        return data;
    }
  }

  render() {
    const { data, filter } = this.state;
    const nonCompletedCount = data.filter((elem) => !elem.completed).length;
    const filteredData = this.myFilter(filter);

    return (
      <section className="todoapp">
        <Header onTaskAdded={this.addItem} />
        <section className="main">
          <TaskList
            tasks={filteredData}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onEdited={this.editItem}
          />
          <Footer
            left={nonCompletedCount}
            onClearCompleted={this.onClearCompleted}
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </section>
      </section>
    );
  }
}
