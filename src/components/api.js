import axios from 'axios';

const baseURL = 'http://localhost:8081';

const api = axios.create({
  baseURL,
});

export const register = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAlbum = async (albumData) => {
  try {
    const response = await api.post(`/api/auth/create-album`, albumData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAlbums = async () => {
  try {
    const response = await api.get('/api/auth/albums');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAlbum = async (albumId) => {
  try {
    const response = await api.delete(`/api/auth/delete-album/${albumId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAlbum = async (updatedAlbumData) => {
  try {
    const response = await api.put(`/api/auth/update-album`, updatedAlbumData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
