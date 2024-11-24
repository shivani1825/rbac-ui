import React, { useState } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([
    { name: "John Doe", role: "Admin" },
    { name: "Jane Smith", role: "Editor" },
    // Add more users as needed
  ]);

  const handleDelete = (userName) => {
    setUsers(users.filter(user => user.name !== userName));
  };

  const handleEdit = (userName) => {
    // Logic for editing a user (perhaps a modal or form)
    alert(`Edit user: ${userName}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>

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
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => handleEdit(user.name)}>
                  Edit
                </Button>
                <Button color="secondary" onClick={() => handleDelete(user.name)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;

