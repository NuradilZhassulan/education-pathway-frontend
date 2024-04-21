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
      className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={onClose}
    >
      <div
        className="relative top-20 mx-auto p-5  w-96 shadow-lg rounded-md text-gray-200 dark:bg-gray-700 dark:text-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium mb-5">
            Добавить новую цель
          </h3>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : (
            <>
              {classes && classes.length > 0 ? (
                <>
                  <div className="">
                    <div className="flex items-center justify-between mb-5">
                      <label>Класс:</label>
                      <select
                        className="flex-1 max-w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
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
                    <div className="flex items-center justify-between">
                      <label>Название цели:</label>
                      <input
                        type="text"
                        className="flex-1 max-w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
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
                  className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
