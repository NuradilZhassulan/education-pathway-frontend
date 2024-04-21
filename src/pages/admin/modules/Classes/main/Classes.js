import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchClasses,
  createClass,
  updateClass,
  deleteClass,
} from "../../../../../api/classService";
import AddOrEditClassModal from "../modals/AddOrEditClassModal";
import DataTable from "../../../../../components/DataTable";

const Classes = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [currentClass, setCurrentClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    const data = await fetchClasses();
    setClasses(data);
  };

  const handleSave = async (classData, id) => {
    if (id) {
      await updateClass(id, classData);
    } else {
      await createClass(classData);
    }
    loadClasses();
  };

  const openEditModal = (classItem) => {
    setCurrentClass(classItem);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteClass(id);
    loadClasses();
  };

  const handleSections = async (id) => {
    navigate(`/admin/classes/sections/${id}`);
  };

  return (
    <div>
      <button
        onClick={() => {
          setCurrentClass(null);
          setIsModalOpen(true);
        }}
        className="p-2 bg-indigo-500 text-white rounded"
      >
        Добавить
      </button>
      {isModalOpen && (
        <AddOrEditClassModal
          initialData={currentClass}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
      <DataTable
        data={classes}
        tableName={"Класс"}
        tableActions={"Действия"}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onMoreInfo={handleSections}
        onMoreInfoText={"Открыть разделы"}
      />
    </div>
  )
};

export default Classes;
