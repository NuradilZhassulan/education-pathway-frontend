import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL + "/sections/";

export const fetchSections = async () => {
  return axios.get(baseUrl);
};

export const fetchSectionsById = (sectionId) => {
  return axios.get(`${baseUrl}?id=${sectionId}`);
};

export const fetchSectionsByGoalId = (goalId) => {
  return axios.get(`${baseUrl}?goal_id=${goalId}`);
};

export const fetchSectionsByClassId = (classId) => {
  return axios.get(`${baseUrl}?class_id=${classId}`);
};

export const createSection = async (section) => {
  return axios.post(baseUrl, section);
};

export const updateSection = async (id, section) => {
  return axios.put(`${baseUrl}${id}/`, section);
};

export const deleteSection = async (id) => {
  return axios.delete(`${baseUrl}${id}/`);
};
