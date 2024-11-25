// src/mockApi.js
let users = [
    { id: 1, name: "Alice", role: "Admin" },
    { id: 2, name: "Bob", role: "Editor" },
  ];
  
  let roles = ["Admin", "Editor", "Viewer"];
  
  export const fetchUsers = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(users);
      }, 1000);
    });
  };
  
  export const createUser = (user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        users.push({ ...user, id: users.length + 1 });
        resolve(user);
      }, 1000);
    });
  };
  
  export const deleteUser = (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        users = users.filter((user) => user.id !== userId);
        resolve();
      }, 1000);
    });
  };
  
  export const fetchRoles = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(roles);
      }, 500);
    });
  };
  
  export const createRole = (role) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        roles.push(role);
        resolve(role);
      }, 1000);
    });
  };
  
  export const deleteRole = (role) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        roles = roles.filter((r) => r !== role);
        resolve();
      }, 1000);
    });
  };
  