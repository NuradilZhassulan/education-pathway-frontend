import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../../../../../api/goalsService";
import AddGoalModal from "../modals/AddOrEditModal";
import DataTable from "../../../../../components/DataTable";

const Goals = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    const data = await fetchGoals();
    setGoals(data.data);
  };

  const handleSave = async (goalData, id) => {
    if (id) {
      await updateGoal(id, goalData);
    } else {
      await createGoal(goalData);
    }
    loadGoals();
  };

  const openEditModal = (goal) => {
    setCurrentGoal(goal);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteGoal(id);
    loadGoals();
  };

  const handleSections = (id) => {
    navigate(`/admin/goals/sections/${id}`);
  };

  return (
    <div>
      <button
        onClick={() => {
          setCurrentGoal(null);
          setIsModalOpen(true);
        }}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Добавить
      </button>
      {isModalOpen && (
        <AddGoalModal
          initialData={currentGoal}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
      <DataTable
        data={goals}
        tableName={"Класс и Цель"}
        tableActions={"Действия"}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onMoreInfo={handleSections}
        onMoreInfoText={"Раздел"}
      />
    </div>
  );
};

export default Goals;
