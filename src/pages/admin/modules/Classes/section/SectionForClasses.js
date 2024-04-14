import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createSection,
  deleteSection,
  fetchSectionsByClassId,
  updateSection,
} from "../../../../../api/sectionsService";
import { fetchClassesByClassId } from "../../../../../api/classService";
import Breadcrumb from "../../../../../components/Breadcrumb";
import AddOrEditSectionModal from "../modals/AddOrEditSectionModal";
import DataTable from "../../../../../components/DataTable";

const SectionForClasses = () => {
  const { classId } = useParams();
  const navigate = useNavigate();

  const [sections, setSections] = useState([]);
  const [className, setClassName] = useState("");
  const [currentSection, setCurrentSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(sections)

  const loadSections = useCallback(async () => {
    await fetchSectionsByClassId(classId)
      .then((response) => setSections(response.data))
      .catch((error) => console.error("Error fetching sections:", error));
  }, [classId]);

  useEffect(() => {
    loadSections();
    const fetchClassName = async () => {
      try {
        const response = await fetchClassesByClassId(classId);
        setClassName(response.data[0].name);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClassName();
  }, [classId, loadSections]);

  const breadcrumbPaths = [
    { name: "Главная", link: "/admin" },
    { name: `${className}`, link: "/admin/classes" },
    { name: "Разделы", link: `/admin/classes/sections/${classId}` },
  ];

  const handleSave = async (sectionData, id) => {
    if (id) {
      await updateSection(id, sectionData);
    } else {
      await createSection(sectionData);
    }
    loadSections();
  };

  const openEditModal = (section) => {
    setCurrentSection(section);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteSection(id);
    loadSections();
  };

  const handleSections = (id) => {
    navigate(`/admin/classes/sections/${classId}/topic/${id}`);
  };

  return (
    <div>
      <div>
        <Breadcrumb paths={breadcrumbPaths} />
      </div>
      <button
        onClick={() => {
          setCurrentSection(null);
          setIsModalOpen(true);
        }}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Добавить
      </button>
      {isModalOpen && (
        <AddOrEditSectionModal
          initialData={currentSection}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
      <DataTable
        data={sections}
        tableName={"Раздел"}
        tableActions={"Действия"}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onMoreInfo={handleSections}
        onMoreInfoText={"Открыть"}
      />
      {/* <div className="w-full text-left mt-4">
        {sections.map((section) => (
          <div key={section.id} style={{ marginLeft: "20px" }}>
            {section.name}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default SectionForClasses;
