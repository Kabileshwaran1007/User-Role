import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const createUser = async (userData) => {
    const response = await axios.post(API_URL, userData);
    return response.data;
};

export const getUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, userData);
        console.log("Response from backend:", response.data);  
        return response.data;  
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user");
    }
};

export const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
