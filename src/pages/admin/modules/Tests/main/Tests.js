import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchTests,
  createTest,
  updateTest,
  deleteTest,
} from "../../../../../api/testsService";
import AddOrEditTest from "../modals/AddOrEditTest";
import DataTable from "../../../../../components/DataTable";

const Tests = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [currentTest, setCurrentTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    await fetchTests()
      .then((response) => setTests(response.data))
      .catch((error) => console.error("Error fetching Tasks:", error));
  };

  const handleSave = async (testData, id) => {
    if (id) {
      await updateTest(id, testData);
    } else {
      await createTest(testData);
    }
    loadTests();
  };

  const openEditModal = (task) => {
    handleTest(task.id);
  };

  const handleDelete = async (id) => {
    await deleteTest(id);
    loadTests();
  };

  const handleTest = (id) => {
    id
      ? navigate(`/admin/tests/addOrEditTest/${id}`)
      : navigate(`/admin/tests/addOrEditTest/`);
  };

  return (
    <div >
      <button
        onClick={() => {
          handleTest();
        }}
        className="p-2 bg-indigo-500 text-white rounded"
      >
        Добавить
      </button>
      {isModalOpen && (
        <AddOrEditTest
          initialData={currentTest}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
      <DataTable
        data={tests}
        tableName={"Тесты"}
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

export default Tests;
