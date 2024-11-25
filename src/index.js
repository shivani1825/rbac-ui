import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UserManagement from './components/UserManagement'; // Import UserManagement

ReactDOM.render(
  <React.StrictMode>
    <UserManagement /> {/* Render UserManagement component */}
  </React.StrictMode>,
  document.getElementById('root')
);

