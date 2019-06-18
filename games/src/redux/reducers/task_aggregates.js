import {ActionType} from './../actions/tbos/action_type';
import {TaskState} from './../../global_constants';

function calculateActiveTasks(agg) {
  return agg["total"] - agg["completed"] -  agg["deleted"];
}

function createAggregate() {
  return {"completed": 0, "deleted": 0, "total": 1, "moved": 0};
}
export default function taskAggregates(state= {}, action) {
  let newState = state["taskAggregates"];
  let reverseHiearchy = state["reverseHiearchy"];
  let currentTask = action.currentRoot;
  switch(action.type) {
    case ActionType.CREATE_TASK_COLLISION:

      newState = {...newState};
      newState[action.taskId] = createAggregate();

      let taskAValue;
      let taskBValue;
      for(let key in newState[action.taskB]) {
        if(key != "moved") {
          taskAValue = newState[action.taskA][key];
          taskBValue = newState[action.taskB][key];

          let count =  taskAValue + taskBValue;
          newState[action.taskId][key] = count;
        }
      }
      newState[action.taskA]["moved"] += 1;
      newState[action.taskB]["moved"] += 1;

      break;
    case ActionType.COMPLETE_TASK:
        newState = {...newState};


        let toCompleteTaskCount = newState[action.taskId]["total"] - newState[action.taskId]["completed"] -  newState[action.taskId]["deleted"];
        let currentCompleted;

        //for total tasks added


        while(currentTask != undefined) {
          currentCompleted = newState[currentTask]["completed"];
          currentTotal = newState[currentTask]["total"];
          newState[currentTask] = {...newState[currentTask], "completed":(currentCompleted + toCompleteTaskCount)};
          currentTask = reverseHiearchy[currentTask];
        }
        let tasksToComplete = [action.taskId];

        while(tasksToComplete.length > 0) {
          currentTask = tasksToComplete.pop();

          if(Object.keys(state["hiearchy"][currentTask]).length == 0)
            continue;
          currentCompleted = newState[currentTask]["completed"];
          newState[currentTask] = {...newState[currentTask], "completed": currentCompleted + calculateActiveTasks(newState[currentTask])};
          for(let child in state["hiearchy"][currentTask]) {
            tasksToComplete.push(child);
          }
        }

        break;
    case ActionType.DELETE_TASK:
      newState = {...newState};


      let toDeleteTaskCount = calculateActiveTasks(newState[action.taskId])
      let currentDeleted;

      //for total tasks added


      while(currentTask != undefined) {
        currentDeleted = newState[currentTask]["deleted"];
        currentTotal = newState[currentTask]["total"];
        newState[currentTask] = {...newState[currentTask], "deleted":(currentDeleted + toDeleteTaskCount)};
        currentTask = reverseHiearchy[currentTask];
      }
      let tasksToDelete = [action.taskId];

      //delete the task and all tasks that are a child of the task
      while(tasksToDelete.length > 0) {
        currentTask = tasksToDelete.pop();
        if(Object.keys(state["hiearchy"][currentTask]).length == 0)
          continue;
        currentDeleted = newState[currentTask]["deleted"];
        newState[currentTask] = {...newState[currentTask], "deleted": currentDeleted + calculateActiveTasks(newState[currentTask])};
        for(let child in state["hiearchy"][currentTask]) {
          tasksToDelete.push(child);
        }
      }
      break;
    case ActionType.CREATE_TASKS:
      newState = {...newState};
      for(let task of action.tasks) {
        newState[task.id] =  createAggregate();
      }
      let totalTasksAdded = action.tasks.length;
      let currentTotal;
      while(currentTask != undefined) {
        currentTotal = newState[currentTask]["total"];
        newState[currentTask] = {...newState[currentTask], "total":(currentTotal + totalTasksAdded)};
        currentTask = reverseHiearchy[currentTask];
      }

      break;
    default:
      break;
  }
  return newState;
}
