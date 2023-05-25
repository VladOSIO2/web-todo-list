import axios from "axios";
import {TaskModel} from "../models/TaskModel";

const apiUrl = 'http://localhost:8080/api/tasks'

export const taskApi = {
  getTasks: () => getTasks(),
  updateTask: (task: TaskModel) => updateTask(task),
  deleteTaskById: (task: number) => deleteTaskById(task),
  createNewTask: (taskName: string) => createNewTask(taskName)
}

async function getTasks() {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch tasks: ${error}`);
  }
}

async function updateTask(task: TaskModel) {
  try {
    await axios.put(`${apiUrl}/${task.id}`, {
      isCompleted: task.isCompleted
    });
  } catch (error) {
    throw new Error(`Failed to save task ${task.id}: ${error}`);
  }
}

async function deleteTaskById(taskId: number) {
  try {
    await axios.delete(`${apiUrl}/${taskId}`);
  } catch (error) {
    throw new Error(`Failed to delete task ${taskId}: ${error}`);
  }
}

async function createNewTask(taskName: string) {
  try {
    const response = await axios.post(apiUrl, {
      name: taskName
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save task named ${taskName}: ${error}`);
  }
}



