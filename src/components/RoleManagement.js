import React, { useState } from 'react';

// Sample roles to assign
const roles = ['Admin', 'Editor', 'Viewer'];

const RoleManagement = ({ user, onRoleChange }) => {
  const [selectedRole, setSelectedRole] = useState(user.role);

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);
    onRoleChange(user.id, newRole);  // Update role in parent component
  };

  return (
    <div className="role-management">
      <select value={selectedRole} onChange={handleRoleChange}>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoleManagement;

