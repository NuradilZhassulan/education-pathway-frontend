import React, { useEffect, useState } from 'react';
import { fetchGoals } from "../../../../api/goalsService";
import { fetchSubtopics } from "../../../../api/subtopicsService";
import { fetchTestByGoalId } from "../../../../api/testsService";
import TestBody from './TestBody';

const Test = () => {

    const [goals, setGoals] = useState([]);
    const [testName, setTestName] = useState([]);
    const [testByGoalId, setTestByGoalId] = useState([])
    const [currentTask, setCurrentTask] = useState();
    const [selectedGoal, setSelectedGoal] = useState("");

    useEffect(() => {
        const getGoals = async () => {
            const fetchedGoals = await fetchGoals();
            setGoals(fetchedGoals.data);
        };
        getGoals();
    }, []);

    const handleGoal = async (value) => {
        setSelectedGoal(value);
        const fetchedTests = await fetchTestByGoalId(value);
        console.log(fetchedTests)
        setCurrentTask(fetchedTests.data[0].tasks[0]);
        setTestByGoalId(fetchedTests.data[1])
        setTestName(fetchedTests.data[1].name)
    };

    return (
        <div className="">
            <div className="container mx-auto p-4">
                <div className="mt-4">
                    <label
                        htmlFor="testName"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Выберите цель
                    </label>
                    <select
                        onChange={(e) => handleGoal(e.target.value)}
                        value={selectedGoal || ""}
                        className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                    >
                        <option value="">Выберите цель</option>
                        {goals.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.class_.name} {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                {currentTask && (
                    <TestBody testName={testName} testByGoalId={testByGoalId} currTask={currentTask}/>
                )}
                

            </div>
        </div>
    );
};

export default Test;
