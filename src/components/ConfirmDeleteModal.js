import React from 'react';

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <h3>Are you sure you want to delete this user?</h3>
      <button onClick={onConfirm}>Yes, Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ConfirmDeleteModal;
