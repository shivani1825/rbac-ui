import React, { useState } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Modal, TextField } from "@mui/material";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRole, setNewRole] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addRole = () => {
    setRoles([...roles, newRole]);
    setNewRole("");
    handleClose();
  };

  const deleteRole = (roleToDelete) => {
    setRoles(roles.filter(role => role !== roleToDelete));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Role Management</h2>
      <Button variant="contained" color="primary" onClick={handleOpen}>Add Role</Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role, index) => (
            <TableRow key={index}>
              <TableCell>{role}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => alert(`Edit permissions for ${role}`)}>
                  Edit Permissions
                </Button>
              </TableCell>
              <TableCell>
                <Button color="secondary" onClick={() => deleteRole(role)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal open={open} onClose={handleClose}>
        <div style={{ padding: "20px", background: "white", margin: "10% auto", width: "300px" }}>
          <h3>Add New Role</h3>
          <TextField
            label="Role Name"
            fullWidth
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Button variant="contained" color="primary" onClick={addRole}>Add Role</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Roles;
