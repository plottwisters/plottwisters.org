import ActionType from './action_type'
const uuidv1 = require('uuid/v1');

export function deleteTaskAction(taskId, currentRoot) {
  return {
    type: ActionType.DELETE_TASK,
    taskId,
    currentRoot
  }
}

export function createNewTaskAction(taskAKey, taskBKey, name, currentRoot) {
  return {
    type: ActionType.CREATE_TASK_COLLISION,
    taskA: taskAKey,
    taskB: taskBKey,
    taskId: uuidv1(),
    taskName: name,
    currentRoot
  }
}

export function createNewTasksAction(tasks, currentRoot) {
  return {
    type: ActionType.CREATE_TASKS,
    tasks,
    currentRoot
  }
}
