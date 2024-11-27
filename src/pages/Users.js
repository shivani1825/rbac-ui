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
  InputLabel,
  FormControl,
  TableSortLabel,
} from "@mui/material";
import { fetchUsers, createUser, deleteUser, fetchRoles } from "../mockApi"; // Import the mock API

const Users = () => {
  const [users, setUsers] = useState([]); // Users state
  const [roles, setRoles] = useState([]); // Roles state
  const [open, setOpen] = useState(false); // Modal visibility state
  const [newUser, setNewUser] = useState({ name: "", role: "" }); // New user data state
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" }); // Sorting state

  // Fetch users and roles from the mock API when the component mounts
  useEffect(() => {
    const loadUsersAndRoles = async () => {
      try {
        const usersData = await fetchUsers();
        const rolesData = await fetchRoles();

        // Set the state with fetched data, but also check localStorage for previously saved data
        const storedUsers = JSON.parse(localStorage.getItem("users")) || usersData;
        const storedRoles = JSON.parse(localStorage.getItem("roles")) || rolesData;

        setUsers(storedUsers);
        setRoles(storedRoles);
      } catch (error) {
        console.error("Error loading users and roles:", error);
      }
    };
    loadUsersAndRoles();
  }, []);

  // Open the modal for adding a new user
  const handleOpen = () => setOpen(true);

  // Close the modal
  const handleClose = () => setOpen(false);

  // Add a new user
  const addUser = async () => {
    try {
      if (newUser.name && newUser.role) {
        // Create a new user and add it to the state
        const addedUser = await createUser(newUser);

        // Update users state and localStorage
        const updatedUsers = [...users, addedUser];
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers)); // Persist data

        setNewUser({ name: "", role: "" }); // Clear the form
        handleClose(); // Close the modal
      } else {
        alert("Please fill in both name and role.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Delete a user by ID
  const deleteUserHandler = async (userId) => {
    try {
      await deleteUser(userId); // Call API to delete user

      // Remove user from the list and update localStorage
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // Persist data
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filter users by search term
  const filteredUsers = sortedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>
      <div style={{ marginBottom: "20px" }}>
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add User
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortConfig.key === "name"}
                direction={sortConfig.key === "name" ? sortConfig.direction : "asc"}
                onClick={() => handleSort("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortConfig.key === "role"}
                direction={sortConfig.key === "role" ? sortConfig.direction : "asc"}
                onClick={() => handleSort("role")}
              >
                Role
              </TableSortLabel>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button color="secondary" onClick={() => deleteUserHandler(user.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for adding a new user */}
      <Modal open={open} onClose={handleClose}>
        <div style={{ padding: "20px", background: "white", margin: "10% auto", width: "300px" }}>
          <h3>Add New User</h3>
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
          <Button variant="contained" color="primary" onClick={addUser}>
            Add User
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
