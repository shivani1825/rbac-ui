import React, { useState } from 'react';
import '../styles/UserManagement.css';
import '../styles/RoleManagement.css';
import RoleManagement from './RoleManagement';
import { permissions } from '../utils/permissions';  // Import permissions file

const usersData = [
  { id: 1, name: 'Shivani', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Rohini', role: 'Editor', status: 'Inactive' },
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

  // Handle role change
  const handleRoleChange = (userId, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
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
            <th>Permissions</th>
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
                <RoleManagement user={user} onRoleChange={handleRoleChange} />
              </td>
              <td>
                <ul>
                  {permissions[user.role].map((permission, index) => (
                    <li key={index}>{permission}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;

