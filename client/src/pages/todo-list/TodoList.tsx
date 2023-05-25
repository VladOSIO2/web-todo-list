import React, {useEffect, useState} from "react";
import TodoTask from "./TodoTask";
import {taskApi} from "../../services/TaskService";
import {TaskModel} from "../../models/TaskModel";
import styles from "./style.css";


export default function TodoList() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    taskApi.getTasks()
      .then(tasks => tasks.sort((t1: TaskModel, t2: TaskModel) => t1.id - t2.id))
      .then(tasks => setTasks(tasks))
  }, [])

  const deleteTask = (chosenTask: TaskModel) => {

    setTasks(tasks.filter(task => task.id !== chosenTask.id));
  }

  const renderTasks = () => {
    return tasks.map((task) => (
      <TodoTask
        key={task.id}
        taskModel={task}
        onDelete={() => deleteTask(task)}/>
    ));
  };

  return (
    <div>
      <h1 className={styles.todo_task}>Hello</h1>
      {renderTasks()}
    </div>
  )
}