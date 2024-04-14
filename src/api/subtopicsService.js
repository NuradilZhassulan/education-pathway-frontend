import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL + "/subtopics/";

export const fetchSubtopics = async () => {
  return axios.get(baseUrl);
};

export const fetchSubtopicsByTopicId = (topicId) => {
  return axios.get(`${baseUrl}?topic_id=${topicId}`);
};

export const createSubtopic = async (subtopic) => {
  return axios.post(baseUrl, subtopic);
};

export const updateSubtopic = async (id, subtopic) => {
  return axios.put(`${baseUrl}${id}/`, subtopic);
};

export const deleteSubtopic = async (id) => {
  return axios.delete(`${baseUrl}${id}/`);
};
