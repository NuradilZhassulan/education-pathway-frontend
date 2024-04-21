import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchTests,
  createTest,
  updateTest,
  deleteTest,
  fetchTestById,
} from "../../../../../api/testsService";
import { fetchTasks } from "../../../../../api/tasksService";
import TestForm from "./TestForm";
import TaskSelector from "./TaskSelector";

const AddOrEditTest = () => {
  const { testId } = useParams();
  const [testName, setTestName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [firstTaskId, setFirstTaskId] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setAllTasks(fetchedTasks.data);
    };
    getTasks();
  }, []);

  useEffect(() => {
    const fetchTestData = async () => {
      if (testId) {
        const fetchedTest = await fetchTestById(testId);
        setTestName(fetchedTest.data[0].name);
        setTasks(fetchedTest.data[0].tasks);
        setFirstTaskId(fetchedTest.data[0].tasks[0].task.id);
      }
    };

    if (allTasks.length > 0) {
      fetchTestData();
    }
  }, [testId, allTasks]);

  const handleSaveTest = async () => {
    try {
      const test = {
        name: testName,
        tasks: tasks.map((task) => ({
          task_id: task.task.id, // Изменено с taskId на task
          next_task_correct_id: task.next_task_correct.id || null, // Убедитесь, что отправляете null, если значение пустое
          next_task_incorrect_id: task.next_task_incorrect.id || null,
        })),
      };
      console.log(test);
      testId ? await updateTest(testId, test) : await createTest(test);
    } catch (error) {
      console.error("Ошибка при создании теста: ", error);
    }
  };

  const addTaskToTest = (taskId) => {
    const taskInfo = allTasks.find((t) => t.id === Number(taskId));
    setTasks([
      ...tasks,
      { task: taskInfo, next_task_correct: null, next_task_incorrect: null },
    ]);
  };

  const handleNextTaskChange = (selectedTaskId, index, type) => {
    // Преобразуем ID в число, если это строка
    const taskId = Number(selectedTaskId);

    // Находим полную информацию о выбранном задании
    const fullTaskInfo = allTasks.find((task) => task.id === taskId);
    console.log(fullTaskInfo);

    // Обновляем массив tasks, устанавливая полную информацию о следующих заданиях
    const updatedTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, [type]: fullTaskInfo || null }; // Задаем полный объект задания или null, если не найден
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  console.log(tasks);

  return (
    <div className="p-8">
      {/* <TestForm onSave={handleSaveTest} initialName={testName}/> */}

      <div>
        <label
          htmlFor="testName"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Название теста
        </label>
        <input
          type="text"
          name="testName"
          id="testName"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
          placeholder="Введите название теста"
          required
        />
      </div>
      <TaskSelector onChange={addTaskToTest} initialValue={firstTaskId} />
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="mt-2 bg-gray-200 p-5 border border-gray-300 rounded-lg ">
            <label
              htmlFor="testName"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              {task.task.name}
            </label>

            <div className="flex items-center">
              <label
                htmlFor="testName"
                className="block mb-2 text-sm font-medium text-gray-900 min-w-44"
              >
                Правильный переход:
              </label>
              <div className="flex">
                <div className="ml-5">
                  <select
                    onChange={(e) =>
                      handleNextTaskChange(
                        e.target.value,
                        index,
                        "next_task_correct"
                      )
                    }
                    value={task.next_task_correct?.id}
                    className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  >
                    <option value="">Выберите следующее задание...</option>
                    {allTasks.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-14 ml-5">
                  <button
                    onClick={() => addTaskToTest(task.next_task_correct.id)}
                    className="flex-1 w-14 text-indigo-700 hover:text-white border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 dark:focus:ring-indigo-800"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <label
                htmlFor="testName"
                className="block mb-2 text-sm font-medium text-gray-900  min-w-44"
              >
                Неправильный переход:
              </label>
              <div className="flex">
                <div className="ml-5">
                  <select
                    onChange={(e) =>
                      handleNextTaskChange(
                        e.target.value,
                        index,
                        "next_task_incorrect"
                      )
                    }
                    value={task.next_task_incorrect?.id}
                    className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  >
                    <option value="">Выберите следующее задание...</option>
                    {allTasks.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-14 ml-5">
                  <button
                    onClick={() => addTaskToTest(task.next_task_incorrect.id)}
                    className="flex-1 w-14 mt-5text-indigo-700 hover:text-white border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 dark:focus:ring-indigo-800"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="submit"
        onClick={handleSaveTest}
        className="mt-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Сохранить
      </button>
    </div>
  );
};

export default AddOrEditTest;
