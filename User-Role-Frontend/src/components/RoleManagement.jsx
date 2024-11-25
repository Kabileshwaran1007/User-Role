import React, { useEffect, useState } from 'react';
import { getRoles, createRole, deleteRole } from '../api/roleApi';

const RoleManagement = () => {
    const [roles, setRoles] = useState([]); 
    const [formData, setFormData] = useState({ name: '', permissions: [] });

    useEffect(() => {
        const fetchRoles = async () => {
            const data = await getRoles();
            setRoles(data); 
        };
        fetchRoles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createRole(formData);
        setFormData({ name: '', permissions: [] });
        const data = await getRoles();
        setRoles(data);
    };

    const handleDelete = async (id) => {
        await deleteRole(id);
        const data = await getRoles();
        setRoles(data);
    };

    return (
        <div>
            <h2>Role Management</h2>
            <span>Choose role: Read,Write,Delete </span>
            <form onSubmit={handleSubmit}> 
           
                <input
                    type="text"
                    placeholder="Role Name"
                    value={formData.name}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        const capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
                        setFormData({ ...formData, name: capitalizedValue });
                    }}
                    required
                />
                   
               
                <button type="submit">Add Role</button> 
            </form>
            <ul>
                {Array.isArray(roles) && roles.map(role => (
                    <li key={role._id}>
                        {role.name}
                        <button onClick={() => handleDelete(role._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoleManagement;