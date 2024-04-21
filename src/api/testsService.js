import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL + "/tests/";

export const fetchTests = async () => {
  return axios.get(baseUrl);
};

export const fetchTestById = (id) => {
  return axios.get(`${baseUrl}?id=${id}`);
};

export const createTest = async (test) => {
  return axios.post(baseUrl, test);
};

export const updateTest = async (id, test) => {
  console.log(test)
  return axios.put(`${baseUrl}${id}/`, test);
};

export const deleteTest = async (id) => {
  return axios.delete(`${baseUrl}${id}/`);
};
