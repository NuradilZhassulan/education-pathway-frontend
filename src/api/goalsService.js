import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL + "/goals/";

export const fetchGoals = async () => {
  return axios.get(baseUrl);
};

export const createGoal = async (goal) => {
  return axios.post(baseUrl, goal);
};

export const updateGoal = async (id, goal) => {
  return axios.put(`${baseUrl}${id}/`, goal);
};

export const deleteGoal = async (id) => {
  return axios.delete(`${baseUrl}${id}/`);
};
