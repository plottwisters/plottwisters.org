import {ActionType} from './action_type'
import {db} from '../../../firebase/config';
const uuidv1 = require('uuid/v1');

export function deleteTaskAction(taskId, currentRoot) {

  return {
    type: ActionType.DELETE_TASK,
    taskId,
    currentRoot
  }
}

export function completeTaskAction(taskId, currentRoot, timestamp = new Date().getTime()) {
  return {
    type: ActionType.COMPLETE_TASK,
    taskId,
    currentRoot,
    timestamp
  }
}

export function categorizeTaskAction(parent, child, currentRoot, timestamp = new Date().getTime()) {

  return {
    type: ActionType.CATEGORIZE_TASK,
    parent,
    child,
    currentRoot
  }
}


export function createNewTaskAction(taskAKey, taskBKey, name, currentRoot) {
  let uuid=uuidv1();
  uuid=(uuid.split('-').join(""))

  return {
    type: ActionType.CREATE_TASK_COLLISION,
    taskA: taskAKey,
    taskB: taskBKey,
    taskId: uuid,
    taskName: name,
    currentRoot
  }
}


export function dragTaskAction(taskId, x, y) {
  return {
    type: ActionType.DRAG_TASK,
    taskId,
    x,
    y
  }
}

export function createNewTasksAction(tasks, currentRoot) {

  for (let index = 0; index < tasks.length; ++index) {
    if(tasks[index].x == undefined || tasks[index].y == undefined) { //randomly generate a position if none exists
      tasks[index].x = 0.8 - (Math.random() * 0.6);
      tasks[index].y = 0.5 - (Math.random() * 0.4);
    }
  }
  return {
    type: ActionType.CREATE_TASKS,
    tasks,
    currentRoot
  }
}

export const getTasks = (tasks) => ({
  type: ActionType.GET_TASKS,
  tasks
})
