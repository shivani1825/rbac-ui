import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./pages/Users"; // Users component that manages user management
import Roles from "./pages/Roles"; // Placeholder for roles page (you can implement later)

const App = () => {
  const roles = ["Admin", "Editor", "Viewer"];  // Hardcoded roles for simplicity
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users roles={roles} />} />
        <Route path="/roles" element={<Roles />} />
      </Routes>
    </Router>
  );
};

export default App;



