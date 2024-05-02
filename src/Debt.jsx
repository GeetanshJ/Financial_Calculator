import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { json } from 'stream/consumers';

function DebtToIncomeRatioCalculator({ userId }) {
    const [income, setIncome] = useState('');
    const [debt, setDebt] = useState('');
    const [ratio, setRatio] = useState(null);
    const [ratioHistory, setRatioHistory] = useState([]);

    const calculateRatio = () => {
        const incomeAmount = parseFloat(income);
        const debtAmount = parseFloat(debt);

            const ratioRatio = (debtAmount  * 100)/incomeAmount;
            setRatio(ratioRatio.toFixed(2));
    
            console.log(ratioRatio , "ratio")
        return ratioRatio;
    };

    const getRatioColor = () => {
        if (ratio === null) return ''; // Return default color if ratio is not calculated

        if (ratio <= 20) {
            return { color: '#2ecc71', label: 'Low' }; // Green color for low ratio (<= 20%)
        } else if (ratio <= 40) {
            return { color: '#f1c40f', label: 'Moderate' }; // Yellow color for moderate ratio (21% - 40%)
        } else {
            return { color: '#e74c3c', label: 'High' }; // Red color for high ratio (> 40%)
        }
    };

    const ratioColorMeaning = {
        Low: 'Your Debt-to-Income ratio is low. This indicates that you have a healthy balance between your income and debt.',
        Moderate: 'Your Debt-to-Income ratio is moderate. This indicates that you have a manageable level of debt compared to your income.',
        High: 'Your Debt-to-Income ratio is high. This indicates that a significant portion of your income goes towards paying off debts, which may pose financial risks.'
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // console.log(userId + "userId")
            // console.log(income + "income")
            // console.log(debt + "debt")
            // console.log(calculateRatio() + "ratio")
        //    console.log( localStorage.getItem("user") + "userid")
            const response = await axios.post('http://localhost:8000/debt/add', {
                
                uid: localStorage.getItem("user"),
                debt: debt,
                income: income,
                ratio: calculateRatio() // Use the calculated ratio value in the request
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
            console.log(JSON.stringify(response));
            setRatioHistory(response.data.ratio);
        } catch (error) {
            console.error('Error fetching ratio history:', error);
        }
    };

    useEffect(() => {
        fetchRatioHistory();
    }, [userId]);

    return (
        <div className="background2">
            <div className="form-container">
                <div className="form-wrapper">
                    <h2>Debt-to-Income Ratio Calculator</h2>
                    <div>
                        <label>Monthly Income ($)</label>
                        <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
                    </div>
                    <div>
                        <label>Monthly Debt ($)</label>
                        <input type="number" value={debt} onChange={(e) => setDebt(e.target.value)} />
                    </div>
                    <button className="calculate-button" onClick={handleSubmit}>Calculate ratio</button>
                    {ratio !== null && (
                        <div>
                            <div className="ratio-result" style={{ backgroundColor: getRatioColor().color }}>
                                <p>Your Debt-to-Income Ratio: {ratio}% ({getRatioColor().label})</p>
                            </div>
                            <p style={{ color: getRatioColor().color }}>{ratioColorMeaning[getRatioColor().label]}</p>
                        </div>
                    )}
                    <h3>ratio History</h3>
                    <ul >
                        {ratioHistory.map((ratioEntry) => (
                            <li key={ratioEntry.ratioId} style={{ marginBottom: '18px' }}>
                                Income: ${ratioEntry.income}, Debt: ${ratioEntry.debt}, ratio: {ratioEntry.ratio}%
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DebtToIncomeRatioCalculator;
