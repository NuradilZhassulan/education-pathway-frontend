import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Goals from './modules/Goals/main/Goals';
import Classes from './modules/Classes/main/Classes';
import SectionForGoals from './modules/Goals/section/SectionForGoals';
import SectionForClasses from './modules/Classes/section/SectionForClasses';
import TopicsForClasses from './modules/Classes/topic/TopicsForClasses'
import SubtopicsForClasses from './modules/Classes/subtopic/SubtopicsForClasses'
import TasksForClasses from './modules/Classes/task/TasksForClasses';
import AddOrEditTask from './modules/Classes/task/AddOrEditTask'
import KeyboardElementCreator from '../../components/KeyboardElement';
import Tests from './modules/Tests/main/Tests'

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
          <Route path="classes/sections/:classId/topic/:sectionId/subtopic/:topicId/tasks/:subtopicId" element={<TasksForClasses />} />
          <Route path="classes/sections/:classId/topic/:sectionId/subtopic/:topicId/tasks/:subtopicId/addOrEditTask/:taskId?" element={<AddOrEditTask />} />
          <Route path="keyboardElementCreator" element={<KeyboardElementCreator />} />
          <Route path="tests" element={<Tests />} />
          {/* <Route path="tests/createTest" element={<CreateTest />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
