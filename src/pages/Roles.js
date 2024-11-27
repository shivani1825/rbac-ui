import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

const Roles = () => {
  const [roles, setRoles] = useState([]); // State for roles with permissions
  const [users, setUsers] = useState([]); // State for users
  const [openRoleModal, setOpenRoleModal] = useState(false); // Modal visibility for roles
  const [openPermissionModal, setOpenPermissionModal] = useState(false); // Modal visibility for permissions
  const [newRole, setNewRole] = useState(""); // New role input
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(null); // Selected role index for editing permissions
  const [permissions, setPermissions] = useState([]); // Permissions for a role

  // Permission options
  const permissionOptions = ["Read", "Write", "Edit", "Delete"];

  // Fetch roles and users from localStorage when the component mounts
  useEffect(() => {
    const loadRoles = () => {
      const savedRoles = JSON.parse(localStorage.getItem("roles")) || [];
      setRoles(savedRoles);
    };

    const loadUsers = () => {
      const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
      setUsers(savedUsers);
    };

    loadRoles();
    loadUsers();
  }, []);

  // Save roles and users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleOpenRoleModal = () => setOpenRoleModal(true);
  const handleCloseRoleModal = () => setOpenRoleModal(false);

  const handleOpenPermissionModal = (index) => {
    setSelectedRoleIndex(index);
    setPermissions(roles[index]?.permissions || []);
    setOpenPermissionModal(true);
  };
  const handleClosePermissionModal = () => setOpenPermissionModal(false);

  // Add role function
  const addRole = () => {
    if (newRole.trim() !== "") {
      setRoles((prevRoles) => [
        ...prevRoles,
        { name: newRole, permissions: [] }, // Initialize permissions as empty
      ]);
      setNewRole("");
      handleCloseRoleModal();
    } else {
      alert("Role name cannot be empty!");
    }
  };

  // Update permissions function
  const updatePermissions = () => {
    setRoles((prevRoles) => {
      const updatedRoles = [...prevRoles];
      updatedRoles[selectedRoleIndex].permissions = permissions;
      return updatedRoles;
    });
    handleClosePermissionModal();
  };

  // Handle permission checkbox toggle
  const handlePermissionChange = (permission) => {
    setPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((perm) => perm !== permission)
        : [...prevPermissions, permission]
    );
  };

  // Delete role function
  const deleteRole = (roleToDelete) => {
    setRoles((prevRoles) =>
      prevRoles.filter((role) => role.name !== roleToDelete.name)
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Role and User Management</h2>

      {/* Action Buttons */}
      <div style={{ marginBottom: "20px", backgroundColor: "#f0f0f0", padding: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenRoleModal}
          style={{ marginRight: "10px", padding: "10px 20px" }}
        >
          Add Role
        </Button>
      </div>

      {/* Roles Table */}
      <h3>Roles</h3>
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
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions.join(", ") || "None"}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOpenPermissionModal(index)}
                >
                  Manage Permissions
                </Button>
                <Button color="secondary" onClick={() => deleteRole(role)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Role Modal */}
      <Modal open={openRoleModal} onClose={handleCloseRoleModal}>
        <div
          style={{
            padding: "20px",
            background: "white",
            margin: "10% auto",
            width: "300px",
            borderRadius: "8px",
          }}
        >
          <h3>Add New Role</h3>
          <TextField
            label="Role Name"
            fullWidth
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addRole}
            style={{ width: "100%" }}
          >
            Add Role
          </Button>
        </div>
      </Modal>

      {/* Permission Modal */}
      <Modal open={openPermissionModal} onClose={handleClosePermissionModal}>
        <div
          style={{
            padding: "20px",
            background: "white",
            margin: "10% auto",
            width: "300px",
            borderRadius: "8px",
          }}
        >
          <h3>Manage Permissions</h3>
          <FormGroup>
            {permissionOptions.map((permission, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                  />
                }
                label={permission}
              />
            ))}
          </FormGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={updatePermissions}
            style={{ marginTop: "10px", width: "100%" }}
          >
            Save Permissions
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Roles;
