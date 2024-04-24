import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const nav = useNavigate();
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isLoginForm) {
            nav('./Home')
        } else {
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="background">
            <div className="form-container">
                <div className={`form-wrapper ${isLoginForm ? 'login-form' : 'register-form'}`}>
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
                    
                        <input type="submit" value={isLoginForm ? 'Login' : 'Register'} />
                    </form>
                    <p onClick={toggleForm} className="toggle-form">
                        {isLoginForm ? 'Don\'t have an account? Register here.' : 'Already have an account? Login here.'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
