import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to Money Mentor</h1>
            <p>
                We offer a variety of financial calculators to help you manage your finances effectively.
                Whether you're planning to take out a loan or evaluating your debt-to-income ratio,
                our tools can assist you in making informed decisions.
            </p>
            <div className="tool-links">
                <Link to="/Loan">EMI Calculator</Link>
                <Link to="/Debt">Debt-to-Income Ratio Calculator</Link>
                <Link to="/Sip">SIP Calculator</Link>
            </div>
        </div>
    );
}

export default Home;
