import axios from "axios";
import {TaskModel} from "../models/TaskModel";

const apiUrl = 'http://localhost:8080/api/tasks'


axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})

axios.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2))
  return response
})

export async function getTasks() {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tasks.');
  }
}

export async function updateTask(task: TaskModel) {
  console.log(task)
  try {
    await axios.put(`${apiUrl}/${task.id}`, {
      isCompleted: task.isCompleted
    });
  } catch (error) {
    throw new Error(`Failed to save task ${task.id}: ${error}`);
  }
}

