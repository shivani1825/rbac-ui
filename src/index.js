import React from 'react';
import ReactDOM from "react-dom/client"; // Import from react-dom/client
import './index.css';
import UserManagement from './components/UserManagement'; // Import UserManagement

// Create a root and render the UserManagement component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserManagement /> {/* Render UserManagement component */}
  </React.StrictMode>
);
