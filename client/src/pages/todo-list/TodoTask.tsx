import React, {useState} from "react";
import {TaskModel} from "../../models/TaskModel";
import {taskApi} from "../../services/TaskService";
import "./style.css";

interface TodoTaskProps {
  taskModel: TaskModel;
  onDelete: () => void;
}

export default function TodoTask({taskModel, onDelete}: TodoTaskProps) {
  const [task, setTask] = useState(taskModel);

  console.log(taskModel);

  const handleCheckboxChange = () => {
    let newTask = {
      ...task,
      isCompleted: !task.isCompleted
    }
    setTask(newTask);
    taskApi.updateTask(newTask).then();
  };

  return (
    <div className="todo_task">
      <input className="todo_task_check" type="checkbox" checked={task.isCompleted} onChange={handleCheckboxChange}/>
      <p
        className="todo_task_font"
        style={{textDecoration: task.isCompleted ? 'line-through' : 'none'}}>{task.name}</p>
      <button className="todo_task_button" onClick={onDelete}>Delete</button>
    </div>
  );
}