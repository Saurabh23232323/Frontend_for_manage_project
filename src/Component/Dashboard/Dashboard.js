import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import './Dashboard.css';
import headerBg from '../../images/Logo.svg';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [counters, setCounters] = useState({
        totalProjects: 0,
        closedProjects: 0,
        runningProjects: 0,
        closureDelayProjects: 0,
        cancelledProjects: 0,
    });

    useEffect(() => {
        fetch('http://localhost:8080/counters')
            .then(response => response.json())
            .then(data => setCounters(data))
            .catch(error => console.error('Error fetching counters:', error));
    }, []);

    const data = {
        labels: ['Total', 'Closed', 'Running', 'Closure Delay', 'Cancelled'],
        datasets: [
            {
                label: 'Projects',
                backgroundColor: 'rgba(0, 123, 255, 0.6)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0, 123, 255, 0.8)',
                hoverBorderColor: 'rgba(0, 123, 255, 1)',
                data: [
                    counters.totalProjects,
                    counters.closedProjects,
                    counters.runningProjects,
                    counters.closureDelayProjects,
                    counters.cancelledProjects,
                ],
            }
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif',
                        weight: 'bold'
                    }
                }
            },
            title: {
                display: true,
                text: 'Project Status Overview',
                font: {
                    size: 18,
                    family: 'Arial, sans-serif',
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif',
                        weight: 'bold'
                    }
                }
            },
            y: {
                ticks: {
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif'
                    }
                }
            }
        }
    };

    return (
        <div className="dashboard">
            <div className="header">
               
                <div className="header-content">
                    <h1>Dashboard</h1>
                    <div className="logo">
                        <img src={headerBg} alt="Logo" />
                    </div>
                </div>
            </div>
            <div className="stats">
                <div className="stat">
                    <h2>Total Projects</h2>
                    <p>{counters.totalProjects}</p>
                </div>
                <div className="stat">
                    <h2>Closed Projects</h2>
                    <p>{counters.closedProjects}</p>
                </div>
                <div className="stat">
                    <h2>Running Projects</h2>
                    <p>{counters.runningProjects}</p>
                </div>
                <div className="stat">
                    <h2>Closure Delay Projects</h2>
                    <p>{counters.closureDelayProjects}</p>
                </div>
                <div className="stat">
                    <h2>Cancelled Projects</h2>
                    <p>{counters.cancelledProjects}</p>
                </div>
            </div>
            <div className="chart">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default Dashboard;
