import React, { useState } from "react";

const testData = {
  id: 11,
  name: "тест 2",
  tasks: [
    {
      task: {
        id: 4,
        name: "задание 1",
        subtopic: 6,
        description: "<p>asd</p>",
        correct_answers: ["dddd"],
        solutions: "<p>cccc</p>",
        hints: "<p>xxxxx</p>",
        keyboard_elements: [1, 2],
      },
      next_task_correct: {
        id: 5,
        name: "задание 2",
        subtopic: 6,
        description: "<p>asd</p>",
        correct_answers: ["12", "33"],
        solutions: "<p>aaaa</p>",
        hints: "<p>zzzzz</p>",
        keyboard_elements: [1, 3],
      },
      next_task_incorrect: {
        id: 6,
        name: "задание 3",
        subtopic: 6,
        description: "<p>шгршгр</p>",
        correct_answers: ["54"],
        solutions: "<p>гргр</p>",
        hints: "<p>8498</p>",
        keyboard_elements: [1],
      },
    },
    {
      task: {
        id: 5,
        name: "задание 2",
        subtopic: 6,
        description: "<p>asd</p>",
        correct_answers: ["12", "33"],
        solutions: "<p>aaaa</p>",
        hints: "<p>zzzzz</p>",
        keyboard_elements: [1, 3],
      },
      next_task_correct: {
        id: 7,
        name: "задание 4",
        subtopic: 6,
        description: "<p>нпнпааа</p>",
        correct_answers: ["133", "6767"],
        solutions: "<p>нпн</p>",
        hints: "<p>654654</p>",
        keyboard_elements: [1, 3],
      },
      next_task_incorrect: {
        id: 8,
        name: "задание 5",
        subtopic: 6,
        description: "<p>гр</p>",
        correct_answers: ["654"],
        solutions: "<p>654</p>",
        hints: "<p>гнпгнп</p>",
        keyboard_elements: [3],
      },
    },
    {
      task: {
        id: 6,
        name: "задание 3",
        subtopic: 6,
        description: "<p>шгршгр</p>",
        correct_answers: ["54"],
        solutions: "<p>гргр</p>",
        hints: "<p>8498</p>",
        keyboard_elements: [1],
      },
      next_task_correct: {
        id: 4,
        name: "задание 1",
        subtopic: 6,
        description: "<p>asd</p>",
        correct_answers: ["dddd"],
        solutions: "<p>cccc</p>",
        hints: "<p>xxxxx</p>",
        keyboard_elements: [1, 2],
      },
      next_task_incorrect: {
        id: 5,
        name: "задание 2",
        subtopic: 6,
        description: "<p>asd</p>",
        correct_answers: ["12", "33"],
        solutions: "<p>aaaa</p>",
        hints: "<p>zzzzz</p>",
        keyboard_elements: [1, 3],
      },
    },
  ],
};

function UserPage() {
    const [currentTask, setCurrentTask] = useState(testData.tasks[0]);
    const [answer, setAnswer] = useState('');
    const [isFinished, setIsFinished] = useState(false);
    const [results, setResults] = useState([]);
  
    const handleAnswerChange = (event) => {
      setAnswer(event.target.value);
    };
  
    const handleSubmit = () => {
      if (isFinished) {
        return; // Если тест завершен, ничего не делаем
      }
      
      const isCorrect = currentTask.task.correct_answers.includes(answer);
      const nextTaskId = isCorrect ? currentTask.next_task_correct.id : currentTask.next_task_incorrect.id;
      const nextTask = testData.tasks.find(task => task.task.id === nextTaskId);
      
      setResults(prevResults => [...prevResults, {taskName: currentTask.task.name, isCorrect}]);
  
      if (!nextTask) {
        setIsFinished(true); // Завершаем тест, если следующее задание не найдено
      } else {
        setCurrentTask(nextTask);
        setAnswer(''); // Очистить поле ввода после отправки
      }
    };
  
    return (
      <div className="container mx-auto p-4">
        {isFinished ? (
          <div>
            <h1 className="text-xl font-bold">Тест завершен!</h1>
            <ul className="list-disc">
              {results.map((result, index) => (
                <li key={index}>
                  {result.taskName}: {result.isCorrect ? 'Правильно' : 'Неправильно'}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
          <div>{currentTask.task.name}</div>
            <div className="task-description" dangerouslySetInnerHTML={{__html: currentTask.task.description}}></div>
            <input 
              type="text" 
              value={answer} 
              onChange={handleAnswerChange} 
              className="input bg-white border border-gray-300 rounded p-2 my-2"
            />
            <button 
              onClick={handleSubmit} 
              className="btn bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              {isFinished  ? 'Следующая задача' : 'Завершен'}
            </button>
          </div>
        )}
      </div>
    );
  }
  
export default UserPage;
