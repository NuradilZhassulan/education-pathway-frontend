import React, { useState } from 'react';

const TestForm = ({ onSave }) => {
  const [testName, setTestName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(testName);
    setTestName('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="testName" className="block text-sm font-medium text-gray-700">
          Название теста
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="testName"
            id="testName"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Введите название теста"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Сохранить
      </button>
    </form>
  );
};

export default TestForm;
