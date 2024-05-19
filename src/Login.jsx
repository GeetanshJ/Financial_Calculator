import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
function LoginPage() {
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isLoginForm, setIsLoginForm] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/auth/${isLoginForm ? 'login' : 'register'}`, formData);
            console.log(response.data.user.uid);
    
            if (response.status === 201) {
                if (!isLoginForm) {
                window.alert("Registered");
                }
                else if (isLoginForm) {
                    localStorage.setItem("user", response.data.user.uid);
                    console.log(localStorage.getItem("user"));
                    // localStorage.removeItem();
                    nav('/Home');
                }
            }
        } catch (error) {
            if (isLoginForm) {
                window.alert("Invalid Details");
            } else {
                window.alert("Registration Done");
            }
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
        <div className="background">
            <div className="form-container">
                
                <div className={`form-wrapper ${isLoginForm ? 'login' : 'register'}`}>
                    <h2>{isLoginForm ? 'Login' : 'Register'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
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
