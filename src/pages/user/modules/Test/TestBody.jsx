import React, { useState, useEffect, useRef } from 'react';
import "//unpkg.com/mathlive";
import { fetchSubtopics } from '../../../../api/subtopicsService';
import { fetchTasks } from '../../../../api/tasksService';
import { fetchSections } from '../../../../api/sectionsService';
import { fetchTopics } from '../../../../api/topicsService';
import RadarChart from './RadarChart';
import prepareChartData from './prepareChartData';
import PolarAreaChart from './PolarAreaChart';

const TestBody = (props) => {

    const { testName, testByGoalId, currTask } = props;
    const [currentTask, setCurrentTask] = useState(currTask);
    const [answer, setAnswer] = useState("");
    const [isFinished, setIsFinished] = useState(false);
    const [results, setResults] = useState([]);
    const [subtopics, setSubtopics] = useState([]);
    const [topics, setTopics] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [sections, setSections] = useState([]);
    const [radarChartData, setRadarChartData] = useState(null)
    const [polarAreaChartData, setPolarAreaChartData] = useState(null)

    const mf = useRef();

    useEffect(() => {
        const getData = async () => {
            const fetchedSubtopics = await fetchSubtopics();
            const sortedSubtopics = sortSubtopicsById(fetchedSubtopics.data);
            setSubtopics(sortedSubtopics);
            const fetchedTasks = await fetchTasks();
            setTasks(fetchedTasks.data);
            const fetchedSections = await fetchSections()
            setSections(fetchedSections.data);
            const fetchedTopics = await fetchTopics()
            setTopics(fetchedTopics.data);
        };
        getData();
        if (mf.current) {
            mf.current.mathVirtualKeyboardPolicy = "manual";
            mf.current.addEventListener("focusin", (evt) =>
                window.mathVirtualKeyboard.show()
            );
            mf.current.addEventListener("focusout", (evt) =>
                window.mathVirtualKeyboard.hide()
            );
        }
    }, []);

    // Функция сортировки по id
    const sortSubtopicsById = (subtopics) => {
        return subtopics.sort((a, b) => a.id - b.id);
    };

    const findLastCorrectTask = (results) => {
        const firstIncorrect = results.find(result => !result.isCorrect);
        if (!firstIncorrect) return null;
        const lastCorrectIndex = results.indexOf(firstIncorrect) - 1;
        return lastCorrectIndex >= 0 ? results[lastCorrectIndex] : null;
    };

    // Получение subtopic из заданий
    const getSubtopicFromTasks = (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        return task ? task.subtopic : null;
    };

    // Обновление знания по микротемам
    const updateSubtopicKnowledge = (subtopicId) => {
        return subtopics.map(sub => ({
            ...sub,
            known: sub.id === subtopicId
        }));
    };

    useEffect(() => {
        // Загрузка данных (здесь можно добавить API вызовы)
        // Используемые setResults, setTasks, setSubtopics должны быть заполнены данными


        setRadarChartData(prepareChartData(subtopics, topics, sections, 'radar'))
        setPolarAreaChartData(prepareChartData(subtopics, topics, sections, 'polarArea'))

        const lastCorrectTask = findLastCorrectTask(results);
        if (lastCorrectTask) {
            const subtopicId = getSubtopicFromTasks(lastCorrectTask.taskID);
            const updatedSubtopics = updateSubtopicKnowledge(subtopicId);
            setSubtopics(updatedSubtopics); // Обновление состояния с известными микротемами
        }
    }, [isFinished]);

    const handleSubmit = () => {
        if (isFinished) {
            return; // Если тест завершен, ничего не делаем
        }

        const isCorrect = currentTask.task.correct_answers.includes(answer);
        const nextTaskId = isCorrect ? currentTask.next_task_correct.id : currentTask.next_task_incorrect.id;
        const nextTask = testByGoalId.tasks.find(task => task.task.id === nextTaskId);

        setResults(prevResults => [...prevResults, { taskID: currentTask.task.id, taskName: currentTask.task.name, isCorrect, userAnswer: answer, correctAnswers: currentTask.task.correct_answers }]);

        if (!nextTask) {
            setIsFinished(true); // Завершаем тест, если следующее задание не найдено
        } else {
            setCurrentTask(nextTask);
            setAnswer(''); // Очистить поле ввода после отправки
        }
    };



    return (
        <div className="mt-4">
            {isFinished ? (
                <div className="overflow-x-auto">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto rounded-lg ">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="text-left font-medium text-white px-4 py-2">Задание</th>
                                    <th className="text-left font-medium text-white px-4 py-2">Статус</th>
                                    <th className="text-left font-medium text-white px-4 py-2">Ваш ответ</th>
                                    <th className="text-left font-medium text-white px-4 py-2">Верные ответы</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((result, index) => (
                                    <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}`}>
                                        <td className="px-4 py-2">{result.taskName}</td>
                                        <td className="px-4 py-2">{result.isCorrect ? "Правильно" : "Неправильно"}</td>
                                        <td className="px-4 py-2">{result.userAnswer}</td>
                                        <td className="px-4 py-2">{result.correctAnswers.join(", ")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <h1>Статус Знаний по Микротемам</h1>
                    {subtopics.map(sub => (
                        <p key={sub.id}>{sub.name} - {sub.known ? 'знает' : 'не знает'}</p>
                    ))}

                    <h2>Radar Chart</h2>
                    <RadarChart data={radarChartData} />
                    <h2>Polar Area Chart</h2>
                    <PolarAreaChart data={polarAreaChartData} />
                </div>
            ) : (
                <div className='mt-2 bg-gray-200 p-5 border border-gray-300 rounded-lg '>
                    {currentTask && (
                        <>
                            <div className='block mb-2 text-sm font-medium text-gray-900'>{testName}</div>
                            <div className='block mb-2 text-xl font-medium text-gray-900'>{currentTask.task.name}</div>
                            <div
                                className="mt-2 bg-gray-100 p-5 border border-gray-300 rounded-lg "
                                dangerouslySetInnerHTML={{
                                    __html: currentTask.task.description,
                                }}
                            ></div>

                            <div className='block mb-2 mt-4 text-sm font-medium text-gray-900'>Введите свой ответ ниже</div>
                            <math-field
                                ref={mf}
                                onInput={evt => setAnswer(evt.target.value)}
                                style={{
                                    display: 'block',
                                    marginBottom: '20px',
                                    borderRadius: '10px',
                                    minHeight: '50px',
                                    border: '1px solid #ccc', // Добавим границу для лучшей видимости
                                    padding: '5px' // Немного отступа внутри поля
                                }}
                            >
                                {answer}
                            </math-field>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSubmit}
                                    className="btn bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    {!isFinished ? "Следующая задача" : "Завершен"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default TestBody;
