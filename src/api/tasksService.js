import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL + "/tasks/";

export const fetchTasks = async () => {
  return axios.get(baseUrl);
};

export const fetchTasksById = (id) => {
  return axios.get(`${baseUrl}?id=${id}`);
};

export const fetchTasksBySubtopicId = (subtopicId) => {
  return axios.get(`${baseUrl}?subtopic_id=${subtopicId}`);
};

export const createTask = async (task) => {
  return axios.post(baseUrl, task);
};

export const updateTask = async (id, task) => {
  return axios.put(`${baseUrl}${id}/`, task);
};

export const deleteTask = async (id) => {
  return axios.delete(`${baseUrl}${id}/`);
};
