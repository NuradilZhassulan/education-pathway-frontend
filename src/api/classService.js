import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL + "/classes/";

export const fetchClasses = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении классов:", error);
    throw error;
  }
};

export const fetchClassesByClassId = (classId) => {
  return axios.get(`${baseUrl}?id=${classId}`);
};

export const createClass = async (classItem) => {
  return axios.post(baseUrl, classItem);
};

export const updateClass = async (id, classItem) => {
  return axios.put(`${baseUrl}${id}/`, classItem);
};

export const deleteClass = async (id) => {
  return axios.delete(`${baseUrl}${id}/`);
};
