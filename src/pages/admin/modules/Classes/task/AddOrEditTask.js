import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../../components/Breadcrumb";
import { fetchClassesByClassId } from "../../../../../api/classService";
import { fetchSectionsById } from "../../../../../api/sectionsService";
import { fetchTopicsById } from "../../../../../api/topicsService";
import { fetchSubtopicsById } from "../../../../../api/subtopicsService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { fetchKeyboardElements } from "../../../../../api/keyboardElementsService";
import { createTask, fetchTaskById, updateTask } from "../../../../../api/tasksService";

const AddOrEditTask = () => {
  const { classId, sectionId, topicId, subtopicId, taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [nameTask, setNameTask] = useState("");
  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [topicName, setTopicName] = useState("");
  const [subtopicName, setSubtopicName] = useState("");
  const [elements, setElements] = useState([]);
  const [selectedElements, setSelectedElements] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskSolution, setTaskSolution] = useState("");
  const [taskHint, setTaskHint] = useState("");
  const [answers, setAnswers] = useState([""]);

  console.log(taskId)

  useEffect(() => {
    if (taskId) {
      fetchTaskById(taskId).then((data) => {
        const { name, description, correct_answers, solutions, hints, keyboard_elements } = data.data[0];
        console.log(data.data[0])
        setTask(data.data[0]);
        setNameTask(name);
        setTaskDescription(description);
        setAnswers(correct_answers);
        setTaskSolution(solutions);
        setTaskHint(hints);
        setSelectedElements(keyboard_elements);
      });
    }
  }, [taskId]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const responseClassesByClassId = await fetchClassesByClassId(classId);
        setClassName(responseClassesByClassId.data[0].name);
        const responseSectionsById = await fetchSectionsById(sectionId);
        setSectionName(responseSectionsById.data[0].name);
        const responseTopicsById = await fetchTopicsById(topicId);
        setTopicName(responseTopicsById.data[0].name);
        const responseSubtopicsById = await fetchSubtopicsById(subtopicId);
        setSubtopicName(responseSubtopicsById.data[0].name);
        const responseKeyboardElements = await fetchKeyboardElements();
        setElements(responseKeyboardElements.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetch();
  }, [classId]);

  const breadcrumbPaths = [
    { name: "Главная", link: "/admin" },
    { name: `${className}`, link: "/admin/classes" },
    { name: "Разделы", link: `/admin/classes/sections/${classId}` },
    {
      name: `${sectionName}`,
      link: `/admin/classes/sections/${classId}/topic/${sectionId}`,
    },
    {
      name: `${topicName}`,
      link: `/admin/classes/sections/${classId}/topic/${sectionId}/subtopic/${topicId}`,
    },
    {
      name: `${subtopicName}`,
      link: `/admin/classes/sections/${classId}/topic/${sectionId}/subtopic/${topicId}/tasks/${subtopicId}`,
    },
    {
      name: taskId ? task?.name : "Добавление новой задачи",
      link: `/admin/classes/sections/${classId}/topic/${sectionId}/subtopic/${topicId}/tasks/${subtopicId}/addOrEditTask`,
    },
  ];


  const addAnswer = () => {
    setAnswers([...answers, ""]);
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const removeAnswer = (index) => {
    if (answers.length > 1) {
      const newAnswers = answers.filter((_, i) => i !== index);
      setAnswers(newAnswers);
    }
  };

  // Обработчики изменений для CKEditor
  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setTaskDescription(data);
  };

  const handleSolutionChange = (event, editor) => {
    const data = editor.getData();
    setTaskSolution(data);
  };

  const handleHintChange = (event, editor) => {
    const data = editor.getData();
    setTaskHint(data);
  };

  // Функция для отправки данных
  const handleSubmit = async () => {
    const taskData = {
      name: nameTask,
      subtopic: parseInt(subtopicId, 10),
      description: taskDescription,
      correct_answers: answers,
      solutions: taskSolution,
      hints: taskHint,
      keyboard_elements: selectedElements.map((id) => parseInt(id, 10)),
    };

    if (taskId) {
      await updateTask(taskId, taskData); // Обновление существующей задачи
    } else {
      try {
        const newTask = await createTask(taskData); // Создание новой задачи
        navigate(`/admin/classes/sections/${classId}/topic/${sectionId}/subtopic/${topicId}/tasks/${subtopicId}/addOrEditTask/${newTask.id}`); // Перенаправление к редактированию созданной задачи
      } catch (error) {
        console.error("Failed to create task:", error.message); // Обработка ошибок при создании задачи
      }
    }
  };

  const handleCheckboxChange = (elementId) => {
    setSelectedElements((prev) => {
      if (prev.includes(elementId)) {
        return prev.filter((id) => id !== elementId);
      } else {
        return [...prev, elementId];
      }
    });
  };

  return (
    <>
      <div>
        <Breadcrumb paths={breadcrumbPaths} />
      </div>
      <div className="p-8">
        <div className="flex-1 ml-2">
          <label>Название задачи:</label>
          <input
            type="text"
            className="ml-5"
            value={nameTask}
            onChange={(e) => setNameTask(e.target.value)}
          />
        </div>
        <div className="flex items-start mb-4">
          <div className="w-8">1)</div>
          <div className="flex-1">
            <CKEditor
              editor={ClassicEditor}
              data={taskDescription}
              onChange={handleDescriptionChange}
            />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-8">2)</div>
          <div className="flex-1">
            <label>Верные ответы:</label>
            {answers.map((answer, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="p-2 border border-gray-300 rounded flex-1"
                />
                <button
                  onClick={() => addAnswer()}
                  className="ml-2 text-blue-500"
                >
                  +
                </button>
                <button
                  onClick={() => removeAnswer(index)}
                  className="ml-2 text-red-500"
                >
                  -
                </button>
              </div>
            ))}
            <button onClick={addAnswer} className="ml-2 text-blue-500">
              +
            </button>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-8">3)</div>
          <div className="flex-1">
            <label>Клавиатура:</label>
            <div className="flex flex-col space-y-2">
              {elements.map((element) => (
                <label key={element.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedElements.includes(element.id)}
                    onChange={() => handleCheckboxChange(element.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span>{element.symbol}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-start mb-4">
          <div className="w-8">4)</div>
          <div className="flex-1">
            <label>Решение:</label>
            <CKEditor
              editor={ClassicEditor}
              data={taskSolution}
              onChange={handleSolutionChange}
            />
          </div>
        </div>
        <div className="flex items-start mb-4">
          <div className="w-8">5)</div>
          <div className="flex-1">
            <label>Подсказка:</label>
            <CKEditor
              editor={ClassicEditor}
              data={taskHint}
              onChange={handleHintChange}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white"
        >
          Сохранить
        </button>
      </div>
    </>
  );
};

export default AddOrEditTask;
