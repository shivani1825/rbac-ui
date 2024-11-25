/// src/components/UserManagement.js
import React, { useState } from 'react';
import '../styles/UserManagement.css';
import '../styles/RoleManagement.css';
import RoleManagement from './RoleManagement';

const usersData = [
  { id: 1, name: 'Shivani', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Rohini', role: 'Editor', status: 'Inactive' },
  { id: 3, name: 'Kumari', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'Venkat', role: 'Editor', status: 'Inactive' },
];

const permissions = {
  Admin: ['Read', 'Write', 'Delete'],
  Editor: ['Read', 'Write'],
  Viewer: ['Read']
};

const UserManagement = () => {
  const [users, setUsers] = useState(usersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('Admin');
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // Handle user status toggle (Activate/Deactivate)
  const toggleStatus = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
    );
    setUsers(updatedUsers);
  };

  // Handle user deletion with confirmation
  const deleteUser = (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    }
  };

  // Handle user editing (inline edit)
  const editUser = (id) => {
    setEditUserId(id);
    const user = users.find((user) => user.id === id);
    setEditedName(user.name);  // Set initial value for editing
  };

  const saveEdit = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, name: editedName } : user
    );
    setUsers(updatedUsers);
    setEditUserId(null);  // Close the editing mode
  };

  const cancelEdit = () => {
    setEditUserId(null);  // Close the editing mode without saving
  };

  // Handle role change
  const handleRoleChange = (userId, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
  };

  // Handle add user form submission
  const addUser = () => {
    if (newUserName) {
      const newUser = {
        id: users.length + 1, // New user ID
        name: newUserName,
        role: newUserRole,
        status: 'Active', // New users are active by default
      };
      setUsers([...users, newUser]);
      setShowAddUserModal(false); // Close the modal
      setNewUserName(''); // Reset input fields
      setNewUserRole('Admin');
    } else {
      alert('Please enter a name for the new user.');
    }
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
      
      {/* Add User Button */}
      <button onClick={() => setShowAddUserModal(true)}>Add User</button>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New User</h3>
            <input
              type="text"
              placeholder="Enter user name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <select
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            <button onClick={addUser}>Add User</button>
            <button onClick={() => setShowAddUserModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Users Table */}
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
              <td>
                {editUserId === user.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                {editUserId === user.id ? (
                  <>
                    <button onClick={() => saveEdit(user.id)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => editUser(user.id)}>Edit</button>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                    <button onClick={() => toggleStatus(user.id)}>
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </>
                )}
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
