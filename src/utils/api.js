// api.js
import axios from "axios";

// const API_BASE_URL = "http://localhost:3000/api/v1";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const loginUser = async (email, password) => {
  return axios.post(
    `${API_BASE_URL}/users/login`,
    { email, password },
    { withCredentials: true }
  );
};
export const registerUser = async (name, email, password, passwordConfirm) => {
  return axios.post(
    `${API_BASE_URL}/users/signup`,
    { name, email, password, passwordConfirm }
    // { withCredentials: true }
  );
};

export const updateUser = async (data) => {
  return axios.patch(`${API_BASE_URL}/users/updateMe`, data, {
    withCredentials: true,
  });
};

export const logoutUser = async () => {
  return axios.get(`${API_BASE_URL}/users/logout`, { withCredentials: true });
};
export const getCurrentUser = async () => {
  return axios.get(`${API_BASE_URL}/users/me`, { withCredentials: true });
};

// ---------
export const getAllVehicles = async () => {
  return axios.get(`${API_BASE_URL}/vehicles`, {
    // withCredentials: true,
  });
};
export const getVehicleBySlug = async (slug) => {
  return axios.get(`${API_BASE_URL}/vehicles/slug/${slug}`, {
    // withCredentials: true,
  });
};
export const getFavoriteVehicles = async () => {
  return axios.get(`${API_BASE_URL}/users/favorites`, {
    withCredentials: true,
  });
};

export const addFavoriteVehicle = async (vehicleId) => {
  return axios.post(
    `${API_BASE_URL}/users/favorites`,
    { id: vehicleId },
    { withCredentials: true }
  );
};
export const removeFavoriteVehicle = async (vehicleId) => {
  return axios.delete(`${API_BASE_URL}/users/favorites/${vehicleId}`, {
    withCredentials: true,
  });
};
