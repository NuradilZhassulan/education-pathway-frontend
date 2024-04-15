import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AddOrEditTaskModal = ({ onClose, onSave, initialData = null }) => {
  const { subtopicId } = useParams();
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
        if (initialData) {
            setTaskName(initialData.name);
        }
  }, [initialData]);

  const handleSave = async () => {
    // if (taskName) {
    //   const taskData = { name: taskName, subtopic_id: subtopicId };
    //   await onSave(taskData, initialData?.id);
    //   onClose();
    // }
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
            Добавить задачу
          </h3>
          <>
            <div className="flex items-center justify-between">
              <div className="flex-1 ml-2">
                <label>Название задачи:</label>
                <input
                  type="text"
                  className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
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

export default AddOrEditTaskModal;