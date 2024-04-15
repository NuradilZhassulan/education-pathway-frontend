import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchGoals,
} from "../../../../../api/goalsService";

const AddOrEditSubtopicModal = ({ onClose, onSave, initialData = null }) => {
  const { topicId } = useParams();
  const [subtopicName, setSubtopicName] = useState("");

  const [availableGoals, setAvailableGoals] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);

  console.log(availableGoals)

  useEffect(() => {
    if (initialData) {
      setSubtopicName(initialData.name);
      // Инициализируем selectedGoals идентификаторами goals из initialData
      const goalIds = initialData.goals.map(goal => goal.id);
      setSelectedGoals(goalIds);
    }
    
    loadGoals();
  }, [initialData]);

  const loadGoals = async () => {
    const data = await fetchGoals();
    setAvailableGoals(data.data);
  };

  const handleSave = async () => {
    if (subtopicName) {
      const topicData = {
        name: subtopicName,
        topic_id: topicId,
        goals_ids: selectedGoals,
      };
      await onSave(topicData, initialData?.id);
      onClose();
    }
  };

  const handleGoalToggle = (goalId) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    );
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={onClose}
    >
      <div
        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Добавить микротему
          </h3>
          <>
            <div className="flex items-center justify-between">
              <div className="flex-1 ml-2">
                <label>Название микротемы:</label>
                <input
                  type="text"
                  className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  value={subtopicName}
                  onChange={(e) => setSubtopicName(e.target.value)}
                />
              </div>
              <div className="flex-1 ml-2">
                <h2>Добавить тег цели</h2>
                {availableGoals?.map((goal) => (
                  <div key={goal.id}>
                    <input
                      type="checkbox"
                      checked={selectedGoals.includes(goal.id)}
                      onChange={() => handleGoalToggle(goal.id)}
                    />{" "}
                     {goal.class_.name} {" "} {goal.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                id="ok-btn"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleSave}
              >
                Добавить
              </button>
              <button
                id="cancel-btn"
                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={onClose}
              >
                Отмена
              </button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default AddOrEditSubtopicModal;
