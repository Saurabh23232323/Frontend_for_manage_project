import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <Link to="/dashboard">
          <FontAwesomeIcon icon={faTachometerAlt} className="sidebar-icon" />
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/project-listing">
          <FontAwesomeIcon icon={faList} className="sidebar-icon" />
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/create-project">
          <FontAwesomeIcon icon={faPlus} className="sidebar-icon" />
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
