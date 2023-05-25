import React, {useEffect, useRef, useState} from "react";
import TodoTask from "./TodoTask";
import {taskApi} from "../../services/TaskService";
import {TaskModel} from "../../models/TaskModel";


export default function TodoList() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    taskApi.getTasks()
      .then(tasks => tasks.sort((t1: TaskModel, t2: TaskModel) => t1.id - t2.id))
      .then(tasks => setTasks(tasks))
  }, [])

  const createTask = () => {
    const newTaskName = inputRef.current?.value;
    if (newTaskName) {
      taskApi.createNewTask(newTaskName)
        .then(task => setTasks([...tasks, task]));
    }
  }

  const deleteTask = (chosenTask: TaskModel) => {
    taskApi.deleteTaskById(chosenTask.id).then()
    setTasks(tasks.filter(task => task.id !== chosenTask.id));
  }

  const renderTasks = () => {
    return tasks.map((task, index) => {
      const colorClass = index % 2 === 0 ? "background_blue" : "background_white";
      const styleClasses = "" + colorClass;
      return (
        <li className={styleClasses} key={task.id}>
          <TodoTask
            key={task.id}
            taskModel={task}
            onDelete={() => deleteTask(task)}/>
        </li>
      );
    });
  };

  return (
    <div>
      <h1 className="todo_header">To-Do List</h1>
      <div className="todo_create_task">
        <input ref={inputRef}
               type="text"
               placeholder="Enter task name..."
               className="todo_create_task_input"/>
        <button onClick={createTask} className="todo_create_task_btn">
          Create task
        </button>
      </div>
      <ul className="todo_task_ul">
        {renderTasks()}
      </ul>
    </div>
  )
}