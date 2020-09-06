import React, { Component } from 'react';



export default class AddTask extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      value: ''
    }

  }
  handleChange(event) {
      this.setState({value: event.target.value});
  }

  createNewTask(taskName) {
    if (taskName != "") {
      let uuid = require('uuid/v1');
      let tasks = [{
        "name": taskName,
        "id": uuid().split('-').join("")
      }];

      this.props.actionCreators.createNewTasksAction(tasks, this.props.currentRoot);
      this.setState({value: ''});
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {

     this.createNewTask(e.target.value);
     e.preventDefault();
   }
  }

  handleSubmit(event) {
    this.props.actionCreatorcreateNewTask(this.state.value);
    this.setState({value:''});
    event.preventDefault();
  }

  render() {
    return (
      <div id="addTask">
        <input type="text" value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} className="addTaskName"/>
      </div>
    );
  }
}
