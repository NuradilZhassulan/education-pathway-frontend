import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL + "/keyboardElements/";

export const fetchKeyboardElements = async () => {
  return axios.get(baseUrl);
};

export const fetchKeyboardElementsById = (keyboardElementsId) => {
  return axios.get(`${baseUrl}?id=${keyboardElementsId}`);
};

export const fetchKeyboardElementsByTaskId = (taskId) => {
  return axios.get(`${baseUrl}?task_id=${taskId}`);
};

export const createKeyboardElement = async (keyboardElement) => {
  console.log(keyboardElement)
  try {
    return axios.post(baseUrl, keyboardElement);
  } catch(e) {
    console.log(e)
  }
  
};

export const updateKeyboardElement = async (id, keyboardElement) => {
  return axios.put(`${baseUrl}${id}/`, keyboardElement);
};

export const deleteKeyboardElement = async (id) => {
  return axios.delete(`${baseUrl}${id}/`);
};
