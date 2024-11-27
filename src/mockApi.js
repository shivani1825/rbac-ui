let users = [
  { id: 1, name: "Shivani", role: "Admin", status: "Active" },
  { id: 2, name: "Rohini", role: "Editor", status: "Inactive" },
  { id: 3, name: "Kumari", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Venkat", role: "Editor", status: "Inactive" },
];

let roles = ["Admin", "Editor", "Viewer"];

let permissions = [
  "Read",
  "Write",
  "Delete",
  "Execute",
];

let rolePermissions = {
  Admin: ["Read", "Write", "Delete", "Execute"],
  Editor: ["Read", "Write"],
  Viewer: ["Read"],
};

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
      rolePermissions[role] = []; // Initialize permissions for the new role
      resolve(role);
    }, 1000);
  });
};

export const deleteRole = (role) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      roles = roles.filter((r) => r !== role);
      delete rolePermissions[role]; // Remove permissions for the deleted role
      resolve();
    }, 1000);
  });
};

// New API for fetching all permissions
export const fetchPermissions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(permissions);
    }, 500);
  });
};

// New API for fetching permissions for a specific role
export const fetchRolePermissions = (role) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(rolePermissions[role] || []);
    }, 500);
  });
};

// New API for updating permissions for a specific role
export const updateRolePermissions = (role, updatedPermissions) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      rolePermissions[role] = updatedPermissions;
      resolve(updatedPermissions);
    }, 1000);
  });
};
