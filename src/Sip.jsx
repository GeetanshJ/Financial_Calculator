import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sip.css'; 

function SIPCalculator() {
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [numberOfPayments, setNumberOfPayments] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [maturityAmount, setMaturityAmount] = useState('');
    const [sipHistory, setSipHistory] = useState([]);

    useEffect(() => {
        fetchSipHistory();
    }, []);

    const calculateMaturityAmount = (e) => {
        e.preventDefault(); // Prevent default form submission

        const P = parseFloat(investmentAmount);
        const n = parseFloat(numberOfPayments);
        const i = parseFloat(interestRate) / 100;

        if (!isNaN(P) && !isNaN(n) && !isNaN(i) && P > 0 && n > 0 && i > 0) {
            const M = P * ((Math.pow((1 + i), n) - 1) / i) * (1 + i);
            const maturityAmountValue = M.toFixed(2);
            setMaturityAmount(maturityAmountValue);

            try {
                axios.post('http://localhost:8000/sip/add', {
                    uid: localStorage.getItem('user'),
                    investmentAmount: investmentAmount,
                    numberOfPayments: numberOfPayments,
                    interestRate: interestRate,
                    maturityAmount: maturityAmountValue,
                }).then(() => {
                    fetchSipHistory();
                });
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            setMaturityAmount('');
        }
    };

    const fetchSipHistory = () => {
        try {
            axios.get(`http://localhost:8000/sip/${localStorage.getItem("user")}`)
                .then((response) => {
                    setSipHistory(response.data.sip);
                });
        } catch (error) {
            console.error('Error fetching SIP history:', error);
        }
    };

    return (
        <div className="background">
            <div className="form-container">
                <div className="form-wrapper">
                    <h2>SIP Calculator</h2>
                    <form onSubmit={calculateMaturityAmount}>
                        <div>
                            <label>Investment Amount (p.m):</label>
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
                        <button className="calculate-button" type="submit">Calculate Maturity Amount</button>
                    </form>
                    {maturityAmount && <p>Maturity Amount: {maturityAmount}</p>}
                </div>
                <div className="loan-history">
                    <h3>SIP History</h3>
                    <ul>
                        {sipHistory.map((entry, index) => (
                            <li key={index}>
                                Investment Amount: {entry.investmentAmount}, Number of Payments: {entry.numberOfPayments}, Interest Rate: {entry.interestRate}%, Maturity Amount: {entry.maturityAmount}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SIPCalculator;
