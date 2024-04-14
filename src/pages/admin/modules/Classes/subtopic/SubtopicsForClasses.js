import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createSubtopic,
  deleteSubtopic,
  fetchSubtopicsByTopicId,
  updateSubtopic,
} from "../../../../../api/subtopicsService";
import { fetchClassesByClassId } from "../../../../../api/classService";
import { fetchSectionsById } from "../../../../../api/sectionsService";
import { fetchTopicsById } from "../../../../../api/topicsService";
import Breadcrumb from "../../../../../components/Breadcrumb";
import AddOrEditSubtopicModal from "../modals/AddOrEditSubtopicModal";
import DataTable from "../../../../../components/DataTable";

const SubtopicsForClasses = () => {
  const { classId, sectionId, topicId } = useParams();
  const navigate = useNavigate();

  const [subtopics, setSubtopics] = useState([]);
  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [topicName, setTopicName] = useState("");
  const [currentSubtopic, setCurrentSubtopic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadSubtopics = useCallback(async () => {
    await fetchSubtopicsByTopicId(topicId)
      .then((response) => setSubtopics(response.data))
      .catch((error) => console.error("Error fetching topics:", error));
  }, [topicId]);

  useEffect(() => {
    loadSubtopics();
    const fetchClassName = async () => {
      try {
        const responseClassesByClassId = await fetchClassesByClassId(classId);
        setClassName(responseClassesByClassId.data[0].name);
        const responseSectionsById = await fetchSectionsById(sectionId);
        setSectionName(responseSectionsById.data[0].name);
        const responseTopicsById = await fetchTopicsById(topicId);
        setTopicName(responseTopicsById.data[0].name);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClassName();
  }, [classId, loadSubtopics]);

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
  ];

  const handleSave = async (subtopicData, id) => {
    if (id) {
      await updateSubtopic(id, subtopicData);
    } else {
      await createSubtopic(subtopicData);
    }
    loadSubtopics();
  };

  const openEditModal = (subtopic) => {
    setCurrentSubtopic(subtopic);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteSubtopic(id);
    loadSubtopics();
  };

  const handleSubtopics = (id) => {
    // navigate(`/admin/classes/topic/${id}`);
  };

  return (
    <div>
      <div>
        <Breadcrumb paths={breadcrumbPaths} />
      </div>
      <button
        onClick={() => {
          setCurrentSubtopic(null);
          setIsModalOpen(true);
        }}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Добавить
      </button>
      {isModalOpen && (
        <AddOrEditSubtopicModal
          initialData={currentSubtopic}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
      <DataTable
        data={subtopics}
        tableName={"Микротемы"}
        tableActions={"Действия"}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onMoreInfo={handleSubtopics}
        onMoreInfoText={"Открыть"}
      />
    </div>
  );
};

export default SubtopicsForClasses;
