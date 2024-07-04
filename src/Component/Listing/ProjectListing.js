import React, { useState, useEffect } from 'react';
import './ProjectListing.css';
import logo from '../../images/Logo.svg';
import searchIcon from '../../images/back arrow.svg';

const ProjectListing = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortPriority, setSortPriority] = useState('None');

  useEffect(() => {
    fetch('http://localhost:8080/List')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortPriority(e.target.value);
  };

  const handleAction = (projectName, startDate, action) => {
    fetch(`http://localhost:8080/update-status?projectName=${projectName}&startDate=${startDate}&status=${action}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        setProjects(projects.map(project => project.projectName === projectName && project.startDate === startDate ? { ...project, status: action } : project));
      })
      .catch(error => console.error('Error updating project status:', error));
  };

  const filterProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProjects = filterProjects.sort((a, b) => {
    if (sortPriority === 'High') return b.priority.localeCompare(a.priority);
    if (sortPriority === 'Low') return a.priority.localeCompare(b.priority);
    return 0;
  });

  return (
    <div className="project-listing">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Project Listing</h1>
      </header>
      <div className="controls-container">
        <div className="controls">
          <div className="search-bar">
            <img src={searchIcon} alt="Search Icon" className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <select className="priority-dropdown" value={sortPriority} onChange={handleSortChange}>
            <option value="None">Sort By: Priority</option>
            <option value="High">High</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
      <table className="project-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Reason</th>
            <th>Type</th>
            <th>Division</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Dept.</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedProjects.map((project, index) => (
            <tr key={index}>
              <td>
                {project.projectName}
                <br />
                <span className="date">{project.startDate} to {project.endDate}</span>
              </td>
              <td>{project.reason}</td>
              <td>{project.type}</td>
              <td>{project.division}</td>
              <td>{project.category}</td>
              <td>{project.priority}</td>
              <td>{project.department}</td>
              <td>{project.location}</td>
              <td>{project.status}</td>
              <td>
                <button onClick={() => handleAction(project.projectName, project.startDate, 'Running')} className="start-btn">Start</button>
                <button onClick={() => handleAction(project.projectName, project.startDate, 'Closed')} className="action-btn">Close</button>
                <button onClick={() => handleAction(project.projectName, project.startDate, 'Cancelled')} className="action-btn">Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>&laquo;</button>
        <button>&lt;</button>
        <span>2</span>
        <button>&gt;</button>
        <button>&raquo;</button>
      </div>
    </div>
  );
};

export default ProjectListing;
