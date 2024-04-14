import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Goals from './modules/Goals/main/Goals';
import Classes from './modules/Classes/main/Classes';
import SectionForGoals from './modules/Goals/section/SectionForGoals';
import SectionForClasses from './modules/Classes/section/SectionForClasses';
import TopicsForClasses from './modules/Classes/topic/TopicsForClasses'
import SubtopicsForClasses from './modules/Classes/subtopic/SubtopicsForClasses'

const AdminPage = () => {
  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <div className="w-64 h-full min-h-screen bg-gray-800 text-white">
        <Sidebar />
      </div>
      <div className="flex-1 p-4">
        <Routes>
          <Route path="goals" element={<Goals />} />
          <Route path="classes" element={<Classes />} />
          <Route path="goals/sections/:goalId" element={<SectionForGoals />} />
          <Route path="classes/sections/:classId" element={<SectionForClasses />} />
          <Route path="classes/sections/:classId/topic/:sectionId" element={<TopicsForClasses />} />
          <Route path="classes/sections/:classId/topic/:sectionId/subtopic/:topicId" element={<SubtopicsForClasses />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
