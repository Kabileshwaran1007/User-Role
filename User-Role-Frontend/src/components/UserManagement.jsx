import React, { useEffect, useState } from 'react';
import { getUsers, createUser, deleteUser, updateUser } from '../api/userApi';
import './UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]); 
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: '', status: 'Active' });
    const [editId, setEditId] = useState(null); 
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const data = await getUsers();
            console.log('Fetched Users:', data);  
            setUsers(data);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to fetch users');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            if (editId) {
                // Update existing user
                const updatedUser = await updateUser(editId, formData);
                setUsers(users.map(user => (user._id === editId ? updatedUser : user))); 
                console.log("Updated user:", updatedUser); 
                setEditId(null); 
            } else {
                
                await createUser(formData);
                fetchUsers(); 
            }
            setFormData({ username: '', email: '', password: '', role: '', status: 'Active' }); // Reset form
        } catch (err) {
            console.error('Error submitting user:', err);
            setError(editId ? 'Failed to update user' : 'Failed to create user');
        } finally {
            setIsLoading(false);
        }
    };

    

    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            await deleteUser(id);
            setUsers(users.filter(user => user._id !== id)); // Update UI optimistically
        } catch (err) {
            console.error('Error deleting user:', err);
            setError('Failed to delete user');
        } finally {
            setIsLoading(false);
        }
    };

    const cancelEdit = () => {
        setEditId(null); 
        setFormData({ username: '', email: '', password: '', role: '', status: 'Active' });
    };

    return (
        <div>
            <h2>User Management</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {isLoading && <p>Loading...</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                {!editId && (
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                )}
                <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                >
                    <option value="">Select Role</option>
                    <option value="Read">Read</option>
                    <option value="Write">Write</option>
                    <option value="Delete">Delete</option>
                </select>
                <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <button type="submit">{editId ? 'Update User' : 'Add User'}</button>
                {editId && <button type="button" onClick={cancelEdit}>Cancel</button>}
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role?.name || user.role}</td>
                            <td>{user.status}</td>
                            <td>
                                {/* <button onClick={() => handleEdit(user)}>Edit</button> */}
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
