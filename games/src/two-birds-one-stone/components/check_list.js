import CheckListTask from './check_list_task';
import CheckListCategory from './check_list_category';
import React, {Component} from 'react';
import {TaskState} from './../../global_constants';
class CheckList extends Component {




  //react parent component
  constructor(props) {
    super(props);

    this.state = {
      "checked": {}
    };
    this.completeTasks = this.completeTasks.bind(this);
    this.deleteTasks = this.deleteTasks.bind(this);

  }


  toggleCheck = item => {
      let checked = Object.assign({}, this.state["checked"]);
      if(checked[item] != undefined) {
        delete checked[item];
      } else {
        checked[item] = item;
      }
      this.setState({checked});

  };
  processTasksState(){
    let tasks = this.props.tasks;
    let isCat = false;
    tasks = tasks.map((task)=> {
      isCat = (Object.keys(this.props["hiearchy"][task]).filter(x=>(this.props["active"][x] == TaskState.active))).length > 0
      if(isCat) {
        let tasksUnderCategory = this.props.taskAggregates[task]["total"] - this.props.taskAggregates[task]["completed"] - this.props.taskAggregates[task]["deleted"];

        return (<CheckListCategory  isChecked={this.state.checked[task] != undefined} toggleCheck={this.toggleCheck} count={tasksUnderCategory} actionCreators={this.props.actionCreators} name={this.props.name[task]} id={task} key={task} name={this.props.name[task]}  amount={tasksUnderCategory}/>);
      } else {
        return (<CheckListTask isChecked={this.state.checked[task] != undefined} toggleCheck={this.toggleCheck} id={task} key={task} name={this.props.name[task]} />)
      }
    });
    return tasks;
  }
  checkIfArraySame(prevTasks, currTasks) {
    if(prevTasks.length != currTasks.length)
      return false;
    for(let i = 0; i < currTasks.length; ++i) {
      if(prevTasks[i] != currTasks[i])
        return false;
    }
    return true;
  }
  componentDidUpdate(prevProps) {
    let newChecked = {}
    for(let task of this.props.tasks) {
      if(this.state.checked[task] != undefined)
        newChecked[task] = task;
    }
    if(!this.checkIfArraySame(Object.keys(newChecked), Object.keys(this.state.checked))) {
      this.setState({"checked":newChecked});
    }
  }
  completeTasks(){
    let currentTimestamp = new Date().getTime();
    for(let checkItem in this.state["checked"]) {
      this.props.actionCreators.completeTaskAction(checkItem, this.props.tbosRootPath[this.props.tbosRootPath.length - 1], currentTimestamp);
    }
    this.setState({"checked":{}})
  }

  deleteTasks(){
    let currentTimestamp = new Date().getTime();
    for(let checkItem in this.state["checked"]) {
      this.props.actionCreators.deleteTaskAction(checkItem, this.props.tbosRootPath[this.props.tbosRootPath.length - 1]);
    }
    this.setState({"checked":{}})
  }
  render() {

    let tasks = this.processTasksState();

    let shouldNotDisplayButtons = (Object.keys(this.state["checked"]) == 0);
    return (
      <div>
        <div id="allTasks">
          {tasks}
        </div>
        <div id="listActions" style={{display: (shouldNotDisplayButtons)?"none":"block"}} >
          <button onClick={this.deleteTasks} id="deleteTask">Delete tasks</button>
          <button onClick={this.completeTasks} id="completeTask">Complete tasks</button>
        </div>
      </div>
    );
  }




}


export default CheckList;
