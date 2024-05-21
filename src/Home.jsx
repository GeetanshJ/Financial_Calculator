import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

function Home() {
    return (
        <div className="home-container">
            <img src="./logo.jpg" alt="Money Mentor Logo" className="logo" />
            <h1>Welcome to Money Mentor</h1>
            <p>
                We offer a variety of financial calculators to help you manage your finances effectively.
                Whether you're planning to take out a loan or evaluating your debt-to-income ratio,
                our tools can assist you in making informed decisions.
            </p>
            <div className="tool-links">
                <Link to="/Loan" className="tool-link loan">EMI Calculator</Link>
                <Link to="/Debt" className="tool-link debt">Debt-to-Income Ratio Calculator</Link>
                <Link to="/Sip" className="tool-link sip">SIP Calculator</Link>
                <Link to="/Retirement" className="tool-link retirement">Retirement Plan</Link>

            </div>
        </div>
    );
}

export default Home;
