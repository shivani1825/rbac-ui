import React, { useState } from 'react';
import './EditUserModal.css'; 

const EditUserModal = ({ user, onSave, onClose }) => {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);

  const handleSave = () => {
    onSave(user.id, { name, role });
    onClose();
  };

  return (
    <div className="modal">
      <h3>Edit User</h3>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Role:</label>
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditUserModal;
