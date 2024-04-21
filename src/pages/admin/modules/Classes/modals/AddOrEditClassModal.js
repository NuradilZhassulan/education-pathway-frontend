import React, { useState, useEffect } from "react";

const AddOrEditClassModal = ({ onClose, onSave, initialData = null }) => {
  const [className, setClassName] = useState("");

  useEffect(() => {
        if (initialData) {
          setClassName(initialData.name);
        }
  }, [initialData]);

  const handleSave = async () => {
    if (className) {
      const classData = { name: className };
      await onSave(classData, initialData?.id);
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
            Добавить класс
          </h3>
          <>
            <div className="flex items-center justify-between">
              <div className="flex-1 ml-2">
                <label>Название класса:</label>
                <input
                  type="text"
                  className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
              </div>
            </div>
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
        </div>
      </div>
    </div>
  );
};

export default AddOrEditClassModal;
