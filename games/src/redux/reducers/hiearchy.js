import {ActionType} from './../actions/tbos/action_type'

export default function hiearchy(state = {}, action) {
  let newState = state;
  switch(action.type) {
    //create new task action
    case ActionType.CREATE_TASK_COLLISION:
      newState = {...state}

      newState[action.taskId] = {}
      newState[action.taskId][action.taskA] = action.taskA;
      newState[action.taskId][action.taskB] = action.taskB;
      newState[action.currentRoot] = {...newState[action.currentRoot]}
      newState[action.currentRoot][action.taskId] = action.taskId
      delete newState[action.currentRoot][action.taskA];
      delete newState[action.currentRoot][action.taskB];

      break;

    case ActionType.CATEGORIZE_TASK:
        newState = {...state};
        newState[action.parent] = {...newState[action.parent]};
        newState[action.parent][action.child] = action.child;
        delete newState[action.currentRoot][action.child]
        break;
    case ActionType.CREATE_TASKS:
      newState = {...state};
      //update tasks tree

      for(let task of action.tasks) {
        newState[task.id]  = {};
        newState[action.currentRoot][task.id] =  task.id;
      }
    default:
      break;
  }
  return  newState;

}
