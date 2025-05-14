import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/admin/about">Manage About Page</Link></li>
          {/* Add more admin links here */}
        </ul>
      </nav>
    </div>
  );
};

export default Admin;
