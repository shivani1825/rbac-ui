import React, { useState } from 'react';
//import '../styles/UserManagement.css';
import '../styles/UserManagement.css';

import './UserManagement.css'; // Make sure to import the CSS file for styling

// Sample data for users
const usersData = [
  { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'Editor', status: 'Inactive' },
];

const UserManagement = () => {
  const [users, setUsers] = useState(usersData);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle user status toggle (Activate/Deactivate)
  const toggleStatus = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
    );
    setUsers(updatedUsers);
  };

  // Handle user deletion
  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  // Handle user editing (simple modal or inline edit)
  const editUser = (id) => {
    // Implement your edit logic, maybe a modal or form
    console.log(`Edit user with ID: ${id}`);
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => editUser(user.id)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
                <button onClick={() => toggleStatus(user.id)}>
                  {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
