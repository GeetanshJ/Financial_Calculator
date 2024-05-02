import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmiCalculator({ userId }) {
    const nav = useNavigate();
    const [principal, setPrincipal] = useState('');
    const [annualInterestRate, setAnnualInterestRate] = useState('');
    const [tenureInYears, setTenureInYears] = useState('');
    const [emi, setEmi] = useState(null);
    const [loans, setLoans] = useState([]);

    const calculateEmi = () => {

        const P = parseFloat(principal);
        const r = parseFloat(annualInterestRate) / 1200;
        const n = parseFloat(tenureInYears) * 12;

        const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        console.log(emiValue.toFixed(2),"dfkjskdsjfnkjdsf");
        return emiValue.toFixed(2);

        setEmi(emiValue.toFixed(2));
        
        
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Calculate EMI

            const response = await axios.post('http://localhost:8000/loan/add', {
                uid: localStorage.getItem("user"),
                principle: principal,
                interest: annualInterestRate,
                tenure: tenureInYears,
                emi: calculateEmi(),
            });
            if (response.status === 201) {
                nav('/Loan');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/loan/${localStorage.getItem("user")}`);
                console.log(response)

                setLoans(response.data.loans);
            } catch (error) {
                console.error('Error fetching loans:', error);
            }
        };
        fetchLoans();
    }, [userId]);

    return (
        <div className="background3">

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
                    <button className="calculate-button" onClick={handleSubmit }>Calculate EMI</button>
                    {emi && <p>Your EMI: ₹{emi}</p>}
                    <h3>Loan History</h3>
                    <ul >
                        {loans.map((loan) => (
                            <li key={loan.loanId} style={{ marginBottom: '18px' }}>
                                Principal: ₹{loan.principle}, Interest: {loan.interest}%, Tenure: {loan.tenure} years,EMI: {loan.emi}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default EmiCalculator;
