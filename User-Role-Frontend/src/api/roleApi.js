import axios from 'axios';

const API_URL = 'http://localhost:5000/api/roles';

export const createRole = async (roleData) => {
    const response = await axios.post(API_URL, roleData);
    return response.data;
};

export const getRoles = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const updateRole = async (id, roleData) => {
    const response = await axios.put(`${API_URL}/${id}`, roleData);
    return response.data;
};

export const deleteRole = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};