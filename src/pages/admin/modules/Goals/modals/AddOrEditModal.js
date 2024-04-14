import React, { useState, useEffect } from "react";
import { fetchClasses } from "../../../../../api/classService";

const AddGoalModal = ({ onClose, onSave, initialData = null }) => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [goalName, setGoalName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        setIsLoading(true);
        const response = await fetchClasses();
        setClasses(response);
        if (initialData) {
          setSelectedClass(initialData.class_id);
          setGoalName(initialData.name);
        } else if (response.length > 0) {
          setSelectedClass(response[0].id);
        }
      } catch (error) {
        console.error("Ошибка при загрузке классов:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadClasses();
  }, [initialData]);

  const handleSave = async () => {
    if (goalName && selectedClass) {
      const goalData = { name: goalName, class_id: selectedClass };
      await onSave(goalData, initialData?.id); 
      onClose();
    }
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
            Добавить новую цель
          </h3>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : (
            <>
              {classes && classes.length > 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-2">
                      <label>Класс:</label>
                      <select
                        className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                      >
                        {classes.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1 ml-2">
                      <label>Название цели:</label>
                      <input
                        type="text"
                        className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <p>Нет доступных классов.</p>
              )}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AddGoalModal;
