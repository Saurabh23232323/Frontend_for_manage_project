import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Component/Login/Login';
import Dashboard from './Component/Dashboard/Dashboard';
import Sidebar from './Component/Sidebar/Sidebar';
import CreateProject from './Component/CreateProject/CreateProject';
import ProjectListing from './Component/Listing/ProjectListing';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    return (
        <Router>
            <div className="app-container">
                {isAuthenticated && <Sidebar />}
                <div className={isAuthenticated ? "main-content" : ""}>
                    <Routes>
                        <Route path="/login" element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />} />
                        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                        <Route path="/create-project" element={isAuthenticated ? <CreateProject /> : <Navigate to="/login" />} />
                        <Route path="/project-listing" element={isAuthenticated ? <ProjectListing /> : <Navigate to="/login" />} />
                        <Route path="/" element={<Navigate to="/login" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
