import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createTask,
  deleteTask,
  fetchTasksBySubtopicId,
  updateTask,
} from "../../../../../api/tasksService";
import { fetchClassesByClassId } from "../../../../../api/classService";
import { fetchSectionsById } from "../../../../../api/sectionsService";
import { fetchTopicsById } from "../../../../../api/topicsService";
import { fetchSubtopicsById } from "../../../../../api/subtopicsService";
import Breadcrumb from "../../../../../components/Breadcrumb";
import AddOrEditTaskModal from "../modals/AddOrEditTaskModal";
import DataTable from "../../../../../components/DataTable";

const TasksForClasses = () => {
  const { classId, sectionId, topicId, subtopicId, taskId } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [topicName, setTopicName] = useState("");
  const [subtopicName, setSubtopicName] = useState("");
  const [currentTask, setCurrentTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadTasks = useCallback(async () => {
    await fetchTasksBySubtopicId(subtopicId)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching Tasks:", error));
  }, [topicId]);

  useEffect(() => {
    loadTasks();
    const fetchClassName = async () => {
      try {
        const responseClassesByClassId = await fetchClassesByClassId(classId);
        setClassName(responseClassesByClassId.data[0].name);
        const responseSectionsById = await fetchSectionsById(sectionId);
        setSectionName(responseSectionsById.data[0].name);
        const responseTopicsById = await fetchTopicsById(topicId);
        setTopicName(responseTopicsById.data[0].name);
        const responseSubtopicsById = await fetchSubtopicsById(subtopicId);
        setSubtopicName(responseSubtopicsById.data[0].name);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClassName();
  }, [classId, loadTasks]);

  const breadcrumbPaths = [
    { name: "Главная", link: "/admin" },
    { name: `${className}`, link: "/admin/classes" },
    { name: "Разделы", link: `/admin/classes/sections/${classId}` },
    {
      name: `${sectionName}`,
      link: `/admin/classes/sections/${classId}/topic/${sectionId}`,
    },
    {
      name: `${topicName}`,
      link: `/admin/classes/sections/${classId}/topic/${sectionId}/subtopic/${topicId}`,
    },
    {
      name: `${subtopicName}`,
      link: `/admin/classes/sections/${classId}/topic/${sectionId}/subtopic/${topicId}/tasks/${subtopicId}`,
    },
  ];

  const handleSave = async (taskData, id) => {
    if (id) {
      await updateTask(id, taskData);
    } else {
      await createTask(taskData);
    }
    loadTasks();
  };

  const openEditModal = (task) => {
    handleTasks(task.id)
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleTasks = (id) => {
    id ? 
      navigate(`/admin/classes/sections/${classId}/topic/${sectionId}/subtopic/${topicId}/tasks/${subtopicId}/addOrEditTask/${id}`)
      :
      navigate(`/admin/classes/sections/${classId}/topic/${sectionId}/subtopic/${topicId}/tasks/${subtopicId}/addOrEditTask/`)
  };

  return (
    <div>
      <div>
        <Breadcrumb paths={breadcrumbPaths} />
      </div>
      <button
        onClick={() => {
          handleTasks()
        }}
        className="p-2 bg-indigo-500 text-white rounded"
      >
        Добавить
      </button>
      {isModalOpen && (
        <AddOrEditTaskModal
          initialData={currentTask}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
      <DataTable
        data={tasks}
        tableName={"Задания"}
        tableActions={"Действия"}
        onEdit={openEditModal}
        onDelete={handleDelete}
        showMoreInfo={false}
        // onMoreInfo={handleTasks}
        // onMoreInfoText={"Открыть"}
      />
    </div>
  );
};

export default TasksForClasses;
