import React, { useState } from 'react';
import './TaskCRUD.css';

const TaskCRUD = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  // Função para adicionar uma nova tarefa
  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        taskName: taskInput
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  // Função para remover uma tarefa
  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Renderização das tarefas
  const renderTasks = () => {
    if (tasks.length === 0) {
      return <p>Nenhuma tarefa encontrada.</p>;
    }

    return (
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-list-item">
            {task.taskName}
            <button onClick={() => removeTask(task.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="task-crud-container">
      <h2>CRUD de Tarefas</h2>
      <div className="task-input-container">
        <input
          type="text"
          placeholder="Digite uma nova tarefa"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={addTask}>Adicionar Tarefa</button>
      </div>
      <div>
        <h3>Tarefas:</h3>
        {renderTasks()}
      </div>
    </div>
  );
};

export default TaskCRUD;
