import axios from 'axios';
import {API_URL} from '../config';

//  Create Circle

export const createCircle = (data, user_id) => {
  console.log(data, user_id);
  return axios.post(`${API_URL}/circle/${user_id}`, data);
};

// GET ALL CIRCLE

export const getAllCircle = user_id => {
  return axios.get(`${API_URL}/circle/${user_id}`);
};

// deleteCircle

export const deleteCircle = data => {
  console.log(data);
  return axios({
    method: 'DELETE',
    url: `${API_URL}/circle`,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// addPerson
export const createPerson = data => {
  console.log(data);
  return axios({
    method: 'POST',
    url: `${API_URL}/sos_contact`,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// getAllContactByCircle_id

export const getAllContactByCircleId = data => {
  console.log(data);
  return axios({
    method: 'POST',
    url: `${API_URL}/sos_contact/all`,
    data: {
      user_id: data.user_id,
      circle_id: data.circle_id,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
