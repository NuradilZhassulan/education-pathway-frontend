import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL + "/topics/";

export const fetchTopics = async () => {
  return axios.get(baseUrl);
};

export const fetchTopicsById = (topicId) => {
  return axios.get(`${baseUrl}?id=${topicId}`);
};

export const fetchTopicsBySectionId = (sectionId) => {
  return axios.get(`${baseUrl}?section_id=${sectionId}`);
};

export const createTopic = async (topic) => {
  return axios.post(baseUrl, topic);
};

export const updateTopic = async (id, topic) => {
  return axios.put(`${baseUrl}${id}/`, topic);
};

export const deleteTopic = async (id) => {
  return axios.delete(`${baseUrl}${id}/`);
};
