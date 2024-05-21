import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function LoginPage() {
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoginForm, setIsLoginForm] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/auth/login', formData);
            console.log(response.data.user.uid);

                localStorage.setItem("user", response.data.user.uid);
                nav('/Home');
            
        } catch (error) {
            window.alert("Invalid Details");
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8000/auth/register', formData);
            if (response.status === 201) {
                window.alert("Registered");
            }
        } catch (error) {
            window.alert("Registration Failed");
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (isLoginForm) {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };

    return (
        <div className="background5">
            <div className="form-container">

                <div className={`form-wrapper ${isLoginForm ? 'login' : 'register'}`}>
                    <h2>{isLoginForm ? 'Login' : 'Register'}</h2>
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <input type="submit" value={isLoginForm ? 'login' : 'register'} />
                    </form>
                    <p onClick={toggleForm} style={{ cursor: 'pointer' }}>
                        {isLoginForm ? 'Don\'t have an account? Register here.' : 'Already have an account? Login here.'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
