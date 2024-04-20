import React, { useEffect, useState } from "react";
import {
  fetchTests,
  createTest,
  updateTest,
  deleteTest,
} from "../../../../../api/testsService";
import { fetchTasks } from "../../../../../api/tasksService";
import TestForm from "../modals/TestForm";
import TaskSelector from "../modals/TaskSelector";

const Tests = () => {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setAllTasks(fetchedTasks.data);
    };
    getTasks();
  }, []);

  const handleSaveTest = async (testName) => {
    try {
      const test = {
        name: testName,
        tasks: tasks.map((task) => ({
          task_id: task.task.id, // Изменено с taskId на task
          next_task_correct_id: task.nextTaskCorrect.id || null, // Убедитесь, что отправляете null, если значение пустое
          next_task_incorrect_id: task.nextTaskIncorrect.id || null,
        })),
      };
      console.log(test);
      await createTest(test);
    } catch (error) {
      console.error("Ошибка при создании теста: ", error);
    }
  };

  const addTaskToTest = (taskId) => {
    console.log(taskId)
    const taskInfo = allTasks.find((t) => t.id === Number(taskId));
    setTasks([
      ...tasks,
      { task: taskInfo, nextTaskCorrect: null, nextTaskIncorrect: null },
    ]);
  };

  const handleNextTaskChange = (selectedTaskId, index, type) => {
    // Преобразуем ID в число, если это строка
    const taskId = Number(selectedTaskId);

    // Находим полную информацию о выбранном задании
    const fullTaskInfo = allTasks.find((task) => task.id === taskId);

    // Обновляем массив tasks, устанавливая полную информацию о следующих заданиях
    const updatedTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, [type]: fullTaskInfo || null }; // Задаем полный объект задания или null, если не найден
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        Управление тестами
      </h1>
      <TestForm onSave={handleSaveTest} />
      <TaskSelector onChange={addTaskToTest} />
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="mt-2">
            {task.task.name}
            <div>
              Правильный переход:
              <select
                onChange={(e) =>
                  handleNextTaskChange(e.target.value, index, "nextTaskCorrect")
                }
                value={task.task.nextTaskCorrect}
              >
                <option value="">Выберите следующее задание...</option>
                {allTasks.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <button onClick={() => addTaskToTest(task.nextTaskCorrect.id)}>
                +
              </button>
            </div>
            <div>
              Неправильный переход:
              <select
                onChange={(e) =>
                  handleNextTaskChange(
                    e.target.value,
                    index,
                    "nextTaskIncorrect"
                  )
                }
                value={task.task.nextTaskIncorrect}
              >
                <option value="">Выберите следующее задание...</option>
                {allTasks.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => addTaskToTest(task.nextTaskIncorrect.id)}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tests;
