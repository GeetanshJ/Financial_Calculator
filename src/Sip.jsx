import React, { useState } from 'react';
import './App.css';

function SIPCalculator() {
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [numberOfPayments, setNumberOfPayments] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [maturityAmount, setMaturityAmount] = useState('');

    const calculateMaturityAmount = () => {
        const P = parseFloat(investmentAmount);
        const n = parseFloat(numberOfPayments);
        const i = parseFloat(interestRate) / 100; // Convert interest rate to decimal

        if (!isNaN(P) && !isNaN(n) && !isNaN(i) && P > 0 && n > 0 && i > 0) {
            const M = P * ((Math.pow((1 + i), n) - 1) / i) * (1 + i);
            setMaturityAmount(M.toFixed(2));
        } else {
            setMaturityAmount('');
        }
    };

    return (
        <div className="container">
            <div className="form-wrapper">
                <h2>SIP Calculator</h2>
                <div>
                    <label>Investment Amount(p.m):</label>
                    <input type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value)} />
                </div>
                <div>
                    <label>Number of Months:</label>
                    <input type="number" value={numberOfPayments} onChange={(e) => setNumberOfPayments(e.target.value)} />
                </div>
                <div>
                    <label>Interest Rate (%):</label>
                    <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                </div>
                <button onClick={calculateMaturityAmount}>Calculate Maturity Amount</button>
                {maturityAmount && <p>Maturity Amount: {maturityAmount}</p>}
            </div>
        </div>
    );
}

export default SIPCalculator;
