import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Debt.css';

function DebtToIncomeRatioCalculator({ userId }) {
    const [income, setIncome] = useState('');
    const [debt, setDebt] = useState('');
    const [ratio, setRatio] = useState(null);
    const [ratioHistory, setRatioHistory] = useState([]);

    const calculateRatio = () => {
        const incomeAmount = parseFloat(income);
        const debtAmount = parseFloat(debt);

        const ratioRatio = (debtAmount * 100) / incomeAmount;
        setRatio(ratioRatio.toFixed(2));
        return ratioRatio.toFixed(2);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/debt/add', {
                uid: localStorage.getItem("user"),
                debt: debt,
                income: income,
                ratio: calculateRatio()
            });
            if (response.status === 201) {
                fetchRatioHistory();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchRatioHistory = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/debt/${localStorage.getItem("user")}`);
            setRatioHistory(response.data.ratio);
        } catch (error) {
            console.error('Error fetching ratio history:', error);
        }
    };

    useEffect(() => {
        fetchRatioHistory();
    }, [userId]);

    return (
        <div className="background1">
            <div className="form-container">
                <div className="form-wrapper">
                    <h2>Debt-to-Income Ratio Calculator</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Monthly Income ($)</label>
                            <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
                        </div>
                        <div>
                            <label>Monthly Debt ($)</label>
                            <input type="number" value={debt} onChange={(e) => setDebt(e.target.value)} />
                        </div>
                        <button className="calculate-button" type="submit">Calculate ratio</button>
                    </form>
                    {ratio !== null && (
                        <div className="ratio-result">
                            <p>Your Debt-to-Income Ratio: {ratio}%</p>
                        </div>
                    )}
                    <h3>Ratio History</h3>
                    <ul className="loan-history">
                        {ratioHistory.map((entry, index) => (
                            <li key={index}>
                                Income: ${entry.income}, Debt: ${entry.debt}, Ratio: {entry.ratio}%
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DebtToIncomeRatioCalculator;
