import React, { useState, useEffect } from 'react';
import { fetchTasks } from '../../../../../api/tasksService';

const TaskSelector = ({ onChange }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');

  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks.data);
      } catch (error) {
        console.error('Ошибка при получении задач:', error);
      }
    };

    getTasks();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedTask(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="task-selector" className="block text-sm font-medium text-gray-700">
        Выберите задание
      </label>
      <select
        id="task-selector"
        value={selectedTask}
        onChange={handleSelectChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Выберите задание...</option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskSelector;
