import React, { useState } from 'react';

function EmiCalculator() {
    const [principal, setPrincipal] = useState('');
    const [annualInterestRate, setAnnualInterestRate] = useState('');
    const [tenureInYears, setTenureInYears] = useState('');
    const [emi, setEmi] = useState(null);

    const calculateEmi = () => {
        const P = parseFloat(principal);
        const r = parseFloat(annualInterestRate) / 1200; // Monthly interest rate
        const n = parseFloat(tenureInYears) * 12; // Total number of payments

        // Calculate EMI using formula: EMI = (P*r*(1+r)^n) / ((1+r)^n - 1)
        const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setEmi(emiValue.toFixed(2)); // Round off to two decimal places
    };

    return (
        <div className="background">
            <div className="form-container">
                <div className="form-wrapper">
                    <h2>EMI Calculator</h2>
                    <div>
                        <label>Principal Amount (₹)</label>
                        <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
                    </div>
                    <div>
                        <label>Annual Interest Rate (%)</label>
                        <input type="number" value={annualInterestRate} onChange={(e) => setAnnualInterestRate(e.target.value)} />
                    </div>
                    <div>
                        <label>Tenure (Years)</label>
                        <input type="number" value={tenureInYears} onChange={(e) => setTenureInYears(e.target.value)} />
                    </div>
                    <button className="calculate-button" onClick={calculateEmi}>Calculate EMI</button>
                    {emi && <p>Your EMI: ₹{emi}</p>}
                </div>
            </div>
        </div>
    );
}

export default EmiCalculator;
