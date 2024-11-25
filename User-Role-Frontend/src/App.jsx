import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import './App.css';


const App = () => {
    return (
        <Router>
            <div>
                <div>
                    <h2>Welcome to the User and Role Management System</h2>
                    <p>Use the navigation links to manage users and roles.</p>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/roles">Manage Roles</Link>
                        </li>
                        <li>
                            <Link to="/users">Manage Users</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/users" element={<UserManagement />} />
                    <Route path="/roles" element={<RoleManagement />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
