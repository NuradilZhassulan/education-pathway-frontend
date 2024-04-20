import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL + "/tasks/";

export const fetchTasks = async () => {
  return axios.get(baseUrl);
};

export const fetchTaskById = (id) => {
  return axios.get(`${baseUrl}?id=${id}`);
};

export const fetchTasksBySubtopicId = (subtopicId) => {
  return axios.get(`${baseUrl}?subtopic_id=${subtopicId}`);
};

export const createTask = async (task) => {
  try {
    const response = await axios.post(baseUrl, task);
    console.log("Task created:", response.data);
    return response.data;  // Возвращаем данные задачи, которые должны включать ID
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error("Validation errors:", error.response.data);
      throw new Error("Validation errors");  // Выбрасываем ошибку с сообщением
    } else {
      console.error("Error creating task:", error.message);
      throw error;  // Перебрасываем исходную ошибку
    }
  }
};


export const updateTask = async (id, task) => {
  return axios.put(`${baseUrl}${id}/`, task);
};

export const deleteTask = async (id) => {
  return axios.delete(`${baseUrl}${id}/`);
};
