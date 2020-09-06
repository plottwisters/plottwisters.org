import {ActionType} from './../actions/tbos/action_type'
import {TaskState} from './../../global_constants'
export default function active(state = {}, action) {
  let newState = state["active"];
  let currentTask;
  switch(action.type) {
    case ActionType.CREATE_TASK_COLLISION:
      newState = {...state["active"]}
      newState[action.taskId] = TaskState.active;
      break;
    case ActionType.COMPLETE_TASK:
      newState = {...state["active"]}
      let tasksToComplete = [action.taskId];

      //delete the task and all tasks that are a child of the task
      while(tasksToComplete.length > 0) {
        currentTask = tasksToComplete.pop();
        newState[currentTask] = TaskState.completed;
        for(let child in state["hiearchy"][currentTask]) {
          if(newState["active"] == TaskState.active)
            tasksToComplete.push(child);
        }
      }
      break;
    case ActionType.DELETE_TASK:
      newState = {...state["active"]};
      let tasksToDelete = [action.taskId];

      //delete the task and all tasks that are a child of the task
      while(tasksToDelete.length > 0) {
        currentTask = tasksToDelete.pop();
        newState[currentTask] = TaskState.deleted;
        for(let child in state["hiearchy"][currentTask]) {
          if(newState["active"] == TaskState.active)
            tasksToDelete.push(child);
        }
      }

      break;
    case ActionType.CREATE_TASKS:
      newState = {...state["active"]}
      for(let task of action.tasks) {
        newState[task.id] =  TaskState.active;
      }
    default:
      break;
  }

  return newState;
}
