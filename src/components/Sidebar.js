import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
            <h3 className="text-xl font-semibold">Меню</h3>
            <ul className="leading-10">
                <li className="hover:bg-gray-700 px-3 py-2 rounded"><Link to="/admin/goals">Цели</Link></li>
                <li className="hover:bg-gray-700 px-3 py-2 rounded"><Link to="/admin/classes">Классы</Link></li>
                <li className="hover:bg-gray-700 px-3 py-2 rounded"><Link to="/admin/tests">Тесты</Link></li>
                <li className="hover:bg-gray-700 px-3 py-2 rounded"><Link to="/admin/students">Ученики</Link></li>
                <li className="hover:bg-gray-700 px-3 py-2 rounded"><Link to="/admin/settings">Настройки</Link></li>
                <li className="hover:bg-gray-700 px-3 py-2 rounded"><Link to="/admin/lessons">Уроки</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
