import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Logo from '../../images/Logo.svg';
import Background from '../../images/login-bg-1.svg';

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/check/${email}/${password}`)
            .then((res) => res.json())
            .then((result) => {
                if (result === true) {
                    alert('Login Successful');
                    onLoginSuccess();
                    navigate('/dashboard');
                } else {
                    alert('Incorrect User Id or Password');
                }
            });
    };

    return (
        <div
            className="login-container"
            style={{
                height: '60vh',
                backgroundImage: `url(${Background})`,
                width:'200vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                paddingTop: '18%',
            }}
        >
            <div className="logo" style={{justifyContent:'center'}}>
                <img src={Logo} alt="Logo" className="logo-image" style={{ width:'25vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                paddingTop: '18%',}} />
                <h2 style={{ width:'30vh',paddingTop: '18%'}}>Online Project Management</h2>
                <div className="login-box">
                    <form onSubmit={handleSubmit}>
                        <h3>Login to get started</h3>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <a href="#" className="forgot-password">
                            Forgot password?
                        </a>
                        <button type="submit">Login</button>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
