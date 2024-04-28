import React, { useState, useEffect } from 'react';
import { fetchTasks } from '../../../../../api/tasksService';

const TaskSelector = ({ onChange, initialValue = '' }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(initialValue || '');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks.data);
        setIsLoaded(true);
      } catch (error) {
        console.error('Ошибка при получении задач:', error);
      }
    };

    getTasks();
  }, []);

  useEffect(() => {
      // Устанавливаем выбранное задание только после загрузки списка заданий
      if (isLoaded) {
          setSelectedTask(initialValue);
      }
  }, [initialValue, isLoaded]);

  const handleSelectChange = (e) => {
    setSelectedTask(e.target.value);
    onChange(e.target.value);
  };

  if (!isLoaded) {
      return <div>Загрузка...</div>; // Отображение индикатора загрузки до загрузки данных
  }

  return (
    <div className="mb-4 mt-4">
      <label htmlFor="task-selector" className="block mb-2 text-sm font-medium text-gray-900 ">
        Выберите задание
      </label>
      <select
        id="task-selector"
        value={selectedTask || ""}
        onChange={handleSelectChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
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
