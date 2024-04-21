import React, { useState } from 'react';
import { createKeyboardElement } from '../api/keyboardElementsService';

const KeyboardElementCreator = () => {
  const [keyboardName, setKeyboardName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddKeyboardElement = async () => {
    if (!keyboardName) {
      setError('Пожалуйста, введите название клавиатурного элемента');
      return;
    }
    setLoading(true);
    try {
      // Замените URL вашим API-эндпоинтом
      const response = await createKeyboardElement({ symbol: keyboardName });
      console.log('Добавлено:', response.data);
      setKeyboardName('');
      setError('');
    } catch (err) {
      setError('Ошибка при добавлении элемента');
      console.error('Ошибка API:', err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex flex-col items-center">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          value={keyboardName}
          onChange={(e) => setKeyboardName(e.target.value)}
          placeholder="Введите символ клавиатуры"
        />
        <button
          onClick={handleAddKeyboardElement}
          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? 'Добавление...' : 'Добавить'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default KeyboardElementCreator;
