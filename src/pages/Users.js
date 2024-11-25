import React, { useState } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Modal, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const Users = () => {
  // Initial users data
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Admin" },
    { id: 2, name: "Jane Smith", role: "Editor" },
  ]);

  const [open, setOpen] = useState(false); // Modal visibility state
  const [newUser, setNewUser] = useState({ name: "", role: "" }); // New user data state
  const [editUser, setEditUser] = useState(null); // User being edited state

  const roles = ["Admin", "Editor", "Viewer"]; // Roles for users

  // Open the modal, and optionally pass in a user for editing
  const handleOpen = (user) => {
    if (user) {
      // If editing an existing user, populate the fields with the current user's data
      setEditUser(user);
      setNewUser({ name: user.name, role: user.role });
    } else {
      // If adding a new user, clear the fields
      setEditUser(null);
      setNewUser({ name: "", role: "" });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // Save a new or edited user
  const handleSave = () => {
    if (!newUser.name || !newUser.role) {
      alert("Please enter both name and role!");
      return;
    }

    if (editUser) {
      // Update existing user
      setUsers(users.map(user => (user.id === editUser.id ? { ...user, ...newUser } : user)));
    } else {
      // Add new user with a unique ID
      const newId = users.length ? users[users.length - 1].id + 1 : 1; // Generate unique ID
      setUsers([...users, { ...newUser, id: newId }]);
    }
    setNewUser({ name: "", role: "" });
    setOpen(false);
  };

  // Delete a user by ID
  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
        Add User
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => handleOpen(user)}>
                  Edit
                </Button>
                <Button color="secondary" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for adding/editing a user */}
      <Modal open={open} onClose={handleClose}>
        <div style={{ padding: "20px", background: "white", margin: "10% auto", width: "300px" }}>
          <h3>{editUser ? "Edit User" : "Add New User"}</h3>
          <TextField
            label="User Name"
            fullWidth
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            style={{ marginBottom: "10px" }}
          />
          <FormControl fullWidth style={{ marginBottom: "10px" }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              {roles.map((role, index) => (
                <MenuItem key={index} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {editUser ? "Save Changes" : "Add User"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Users;

