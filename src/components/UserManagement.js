import React, { useState } from 'react';
import EditUserModal from './EditUserModal';  // Import the EditUserModal

const usersData = [
  { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'Editor', status: 'Inactive' },
];

const UserManagement = () => {
  const [users, setUsers] = useState(usersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState(null);  // Track which user is being edited

  // Handle user status toggle
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

  // Handle user editing (open modal)
  const editUser = (id) => {
    const user = users.find(user => user.id === id);
    setEditingUser(user);
  };

  // Save the updated user
  const saveUserChanges = (id, updatedData) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, ...updatedData } : user
    );
    setUsers(updatedUsers);
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
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

      {/* Show modal for editing user */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onSave={saveUserChanges}
          onClose={() => setEditingUser(null)}  // Close modal
        />
      )}
    </div>
  );
};

export default UserManagement;
