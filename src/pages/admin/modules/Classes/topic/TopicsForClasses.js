import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createTopic,
  deleteTopic,
  fetchTopicsBySectionId,
  updateTopic,
} from "../../../../../api/topicsService";
import { fetchClassesByClassId } from "../../../../../api/classService";
import { fetchSectionsById } from "../../../../../api/sectionsService";
import Breadcrumb from "../../../../../components/Breadcrumb";
import AddOrEditTopicModal from "../modals/AddOrEditTopicModal";
import DataTable from "../../../../../components/DataTable";

const TopicForClasses = () => {
  const { classId, sectionId } = useParams();
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [currentTopic, setCurrentTopic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadTopics = useCallback(async () => {
    await fetchTopicsBySectionId(sectionId)
      .then((response) => setTopics(response.data))
      .catch((error) => console.error("Error fetching topics:", error));
  }, [classId]);

  useEffect(() => {
    loadTopics();
    const fetchClassName = async () => {
      try {
        const responseClassesByClassId = await fetchClassesByClassId(classId);
        setClassName(responseClassesByClassId.data[0].name);
        const responseSectionsById = await fetchSectionsById(sectionId);
        setSectionName(responseSectionsById.data[0].name);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClassName();
  }, [classId, loadTopics]);

  const breadcrumbPaths = [
    { name: "Главная", link: "/admin" },
    { name: `${className}`, link: "/admin/classes" },
    { name: "Разделы", link: `/admin/classes/sections/${classId}` },
    {
      name: `${sectionName}`,
      link: `/admin/classes/sections/${classId}/topic/${sectionId}`,
    },
  ];

  const handleSave = async (topicData, id) => {
    if (id) {
      await updateTopic(id, topicData);
    } else {
      await createTopic(topicData);
    }
    loadTopics();
  };

  const openEditModal = (topic) => {
    setCurrentTopic(topic);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteTopic(id);
    loadTopics();
  };

  const handleTopics = (id) => {
    navigate(`/admin/classes/sections/${classId}/topic/${sectionId}/subtopic/${id}`);
  };

  return (
    <div>
      <div>
        <Breadcrumb paths={breadcrumbPaths} />
      </div>
      <button
        onClick={() => {
          setCurrentTopic(null);
          setIsModalOpen(true);
        }}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Добавить
      </button>
      {isModalOpen && (
        <AddOrEditTopicModal
          initialData={currentTopic}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
      <DataTable
        data={topics}
        tableName={"Темы"}
        tableActions={"Действия"}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onMoreInfo={handleTopics}
        onMoreInfoText={"Открыть"}
      />
    </div>
  );
};

export default TopicForClasses;
