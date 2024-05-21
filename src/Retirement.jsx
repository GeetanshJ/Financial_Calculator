

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Retirement.css';

function RetirementCalculator() {
    const [currentAge, setCurrentAge] = useState('');
    const [retirementAge, setRetirementAge] = useState('');
    const [annualIncome, setAnnualIncome] = useState('');
    const [desiredRetirementIncome, setDesiredRetirementIncome] = useState('');
    const [annualReturn, setAnnualReturn] = useState('');
    const [monthlySavings, setMonthlySavings] = useState('');
    const [retirementHistory, setRetirementHistory] = useState([]);

    useEffect(() => {
        const fetchRetirementHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/retirement/${localStorage.getItem("user")}`);
                setRetirementHistory(response.data.retirement);
            } catch (error) {
                console.error('Error fetching retirement history:', error);
            }
        };

        fetchRetirementHistory();
    }, []);

    const handleCalculate = async (e) => {
        e.preventDefault();

        const yearsToRetirement = retirementAge - currentAge;
        const totalSavingsNeeded = (desiredRetirementIncome * 12) / (annualReturn / 100);
        const monthlySavingsNeeded = totalSavingsNeeded / (yearsToRetirement * 12);
        setMonthlySavings(monthlySavingsNeeded.toFixed(2));

        try {
            const newCalculation = {
                uid: localStorage.getItem('user'),
                currentAge,
                retirementAge,
                annualIncome,
                desiredRetirementIncome,
                annualReturn,
                monthlySavingsNeeded: monthlySavingsNeeded.toFixed(2)
            };

            await axios.post('http://localhost:8000/retirement/calculate', newCalculation);
            setRetirementHistory([...retirementHistory, newCalculation]);
        } catch (error) {
            console.error('Error saving retirement calculation:', error);
        }
    };

    return (
        <div className="background3">
            <div className="form-container">
                <div className="form-wrapper">
                    <h2>Retirement Planning Calculator</h2>
                    <form onSubmit={handleCalculate}>
                        <div>
                            <label>Current Age:</label>
                            <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} />
                        </div>
                        <div>
                            <label>Retirement Age:</label>
                            <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} />
                        </div>
                        <div>
                            <label>Annual Income:</label>
                            <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} />
                        </div>
                        <div>
                            <label>Desired Retirement Income:</label>
                            <input type="number" value={desiredRetirementIncome} onChange={(e) => setDesiredRetirementIncome(e.target.value)} />
                        </div>
                        <div>
                            <label>Annual Return on Investments (%):</label>
                            <input type="number" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)} />
                        </div>
                        <button className="calculate-button" type="submit">Calculate</button>
                    </form>
                    {monthlySavings && <p>Monthly Savings Needed: ${monthlySavings}</p>}
                </div>
                <div className="history">
                    <h3>Retirement History</h3>
                    <ul>
                        {retirementHistory.map((entry, index) => (
                            <li key={index}>
                                <br/>
                                <span>Calculation {index + 1}:</span>
                                <span>Current Age: {entry.currentAge}</span> 
                                <span>Retirement Age: {entry.retirementAge}</span>
                                <span>Annual Income: ${entry.annualIncome}</span>
                                <span>Desired Retirement Income: ${entry.desiredRetirementIncome}</span>
                                <span>Annual Return on Investments: {entry.annualReturn}%</span>
                                <span>Monthly Savings Needed: ${entry.monthlySavingsNeeded}</span>
                                
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RetirementCalculator;
