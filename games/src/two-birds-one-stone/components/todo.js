import React, { Component } from 'react';
import ToDoItem from './todo_item';


class ToDo extends Component {
  constructor(props) {

    super(props);
    this.state = {
      list: [],
      newTaskInput: ''
    };
    this.handleKey = this.handleKey.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.createItem = this.createItem.bind(this);
    this.addToRedux = this.addToRedux.bind(this);
  };

  createItem() {

    this.setState(({ list, newTaskInput }) => {
      // console.log(newTaskInput);
      let uuid = require('uuid/v1');
      return {
        list: [
          ...list,
          {
            "name": newTaskInput,
            "key": uuid().split('-').join("")
          }
        ],
        newTaskInput: ''
      }
    });

  };

  handleInput(e) {
    this.setState({
      newTaskInput: e.target.value
    });
  };

  handleKey(e) {

    if (e.target.value !== '') {
      if (e.key === 'Enter') {
        this.createItem();
      }
    }
  };

  deleteItem(item) {
    this.setState(({ list }) => ({
      list: list.filter((currItem) => currItem.key !== item)
    }));

  };

  addToRedux() {
    // console.log("redux log");
    // console.log(this.props.outerProps);
    // console.log(this.props.createNewTaskAction({ 'id': uuid(), 'name': 'hello' }, { 'id': 'hrderfchbdr4gxd', 'name': 'hello' }, 'nnn', 'root'))
    let tasks = this.state.list.map(
      (task) => {
        return {
          "id": task['key'],
          "name": task['name']
        }
      }
    );
    // console.log(this.props.outerProps.tbosRootPath);
    this.props.createNewTasksAction(tasks, this.props.outerProps.tbosRootPath[this.props.outerProps.tbosRootPath.length - 1]);
    this.props.toggleCreateView();
  };


  render() {
    
    return (
      <div style={{ display: this.props.display }} className="tbos-overlay">

        <div className="todo">
          <div className="todo-content-container">

            <div className="full-screen-popup-header">
              <h1 >Add Things to Do</h1>
              <button className='ToDo-OK' onClick={this.addToRedux}> Done </button>
            </div>
            <div className="todo-tasks-container">
              {this.state.list.map((item) => {
                return <ToDoItem
                  key={item.key}
                  name={item.name}
                  deleteItem={this.deleteItem.bind(this, item.key)}
                />
              }
              )}

              {/*create task input*/}
              <div className="todo-input-form">
                <input value={this.state.newTaskInput} className="todo-input" onChange={this.handleInput} type="text" onKeyPress={this.handleKey} />
                <button className="todo-add" onClick={this.createItem}>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDo;
