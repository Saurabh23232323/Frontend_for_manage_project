import React, { useState } from 'react';
import './CreateProject.css';
import logo from '../../images/Logo.svg';

const CreateProject = () => {
  const [createProject, setCreateProject] = useState('');
  const [Reason, setReason] = useState('Business');
  const [Type, setType] = useState('Internal');
  const [Division, setDivision] = useState('Filters');
  const [Category, setCategory] = useState('Quality A');
  const [Priority, setPriority] = useState('High');
  const [Department, setDepartment] = useState('Strategy');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [Location, setLocation] = useState('Pune');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/save/${createProject}/${Reason}/${Type}/${Division}/${Category}/${Priority}/${Department}/${startDate}/${endDate}/${Location}`)
      .then((res) => res.json())
      .then((result) => {
        if (result === true) {
          alert('Registered project successfully');
        } else {
          alert('Error in project registration');
        }
      });
  };

  return (
    <div className="create-project-container">
      <div className="header-background">
        <div className="header">
          <span className="back-arrow">←</span>
          <h1>Create Project</h1>
          <img src={logo} alt="Logo" className="logo" />
        </div>
      </div>
      <form className="project-form" onSubmit={handleSubmit}>
        <div className="theme-row">
          <input type="text" className="input-large" placeholder="Enter Project Theme" value={createProject} onChange={(e) => setCreateProject(e.target.value)} />
          <button type="submit" className="save-button">Save Project</button>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Reason</label>
            <select className="input-medium" value={Reason} onChange={(e) => setReason(e.target.value)}>
              <option value="Business">Business</option>
              <option value="Transport">Transport</option>
              <option value="Dealership">Dealership</option>
            </select>
          </div>
          <div className="form-group">
            <label>Type</label>
            <select className="input-medium" value={Type} onChange={(e) => setType(e.target.value)}>
              <option value="Internal">Internal</option>
              <option value="External">External</option>
              <option value="Vendor">Vendor</option>
            </select>
          </div>
          <div className="form-group">
            <label>Division</label>
            <select className="input-medium" value={Division} onChange={(e) => setDivision(e.target.value)}>
              <option value="Filters">Filters</option>
              <option value="Compressor">Compressor</option>
              <option value="Pumps">Pumps</option>
              <option value="Glass">Glass</option>
              <option value="Water Heater">Water Heater</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select className="input-medium" value={Category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Quality A">Quality A</option>
              <option value="Quality B">Quality B</option>
              <option value="Quality C">Quality C</option>
              <option value="Quality D">Quality D</option>
            </select>
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select className="input-medium" value={Priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="form-group">
            <label>Department</label>
            <select className="input-medium" value={Department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="Strategy">Strategy</option>
              <option value="Finance">Finance</option>
              <option value="Quality">Quality</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Stores">Stores</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Start Date as per Project Plan</label>
            <input type="date" className="input-medium" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>End Date as per Project Plan</label>
            <input type="date" className="input-medium" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <select className="input-medium" value={Location} onChange={(e) => setLocation(e.target.value)}>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group status">
            <label>Status:</label>
            <span>Registered</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
