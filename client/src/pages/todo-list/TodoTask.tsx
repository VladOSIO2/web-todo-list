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

  const handleCheckboxChange = () => {
    let newTask = {
      ...task,
      isCompleted: !task.isCompleted
    }
    setTask(newTask);
    taskApi.updateTask(newTask).then();
  };

  const textStyle = "todo_task_font" + (task.isCompleted ? " todo_task_font_completed" : "");
  return (
    <div className="todo_task">
      <input className="todo_task_check"
             type="checkbox"
             checked={task.isCompleted}
             onChange={handleCheckboxChange}/>
      <p className={textStyle}>{task.name}</p>
      <button className="todo_task_btn" onClick={onDelete}>Delete</button>
    </div>
  );
}