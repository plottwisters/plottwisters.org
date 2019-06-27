import CheckListTask from './check_list_task';
import CheckListCategory from './check_list_category';
import React, {Component} from 'react';
import {TaskState} from './../../global_constants';
class CheckList extends Component {




  //react parent component
  constructor(props) {
    super(props);

    this.state = {
      "completed": {}
    };
    this.completeTasks = this.completeTasks.bind(this);
    this.deleteTasks = this.deleteTasks.bind(this);
  }


  toggleCheck = item => {
      let completed = Object.assign({}, this.state["completed"]);
      if(completed[item] != undefined) {
        delete completed[item];
      } else {
        completed[item] = item;
      }
      this.setState({completed});

  };
  processTasksState(){
    let tasks = this.props.tasks;
    let isCat = false;
    tasks = tasks.map((task)=> {
      isCat = (Object.keys(this.props["hiearchy"][task]).filter(x=>(this.props["active"][x] == TaskState.active))).length > 0
      if(isCat) {
        let tasksUnderCategory = this.props.taskAggregates[task]["total"] - this.props.taskAggregates[task]["completed"] - this.props.taskAggregates[task]["deleted"];

        return (<CheckListCategory  actionCreators={this.props.actionCreators} name={this.props.name[task]} id={task} key={task} name={this.props.name[task]}  amount={tasksUnderCategory}/>);
      } else {
        return (<CheckListTask toggleCheck={this.toggleCheck} id={task} key={task} name={this.props.name[task]} />)
      }
    });
    return tasks;
  }
  completeTasks(){
    let currentTimestamp = new Date().getTime();
    for(let checkItem in this.state["completed"]) {
      this.props.actionCreators.completeTaskAction(checkItem, this.props.tbosRootPath[this.props.tbosRootPath.length - 1], currentTimestamp);
    }
  }

  deleteTasks(){

  }
  render() {

    let tasks = this.processTasksState();

    let shouldNotDisplayButtons = (Object.keys(this.state["completed"]) == 0);
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
