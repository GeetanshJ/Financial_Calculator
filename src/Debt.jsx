import React, { useState } from 'react';

function DebtToIncomeRatioCalculator() {
    const [income, setIncome] = useState('');
    const [debt, setDebt] = useState('');
    const [dti, setDti] = useState(null);

    const calculateDti = () => {
        const incomeAmount = parseFloat(income);
        const debtAmount = parseFloat(debt);

        if (!isNaN(incomeAmount) && !isNaN(debtAmount) && incomeAmount > 0 && debtAmount > 0) {
            const dtiRatio = (debtAmount / incomeAmount) * 100;
            setDti(dtiRatio.toFixed(2));
        } else {
            setDti(null);
        }
    };

    const getDtiColor = () => {
        if (dti === null) return ''; // Return default color if dti is not calculated

        if (dti <= 20) {
            return { color: '#2ecc71', label: 'Low' }; // Green color for low DTI (<= 20%)
        } else if (dti <= 40) {
            return { color: '#f1c40f', label: 'Moderate' }; // Yellow color for moderate DTI (21% - 40%)
        } else {
            return { color: '#e74c3c', label: 'High' }; // Red color for high DTI (> 40%)
        }
    };

    const dtiColorMeaning = {
        Low: 'Your Debt-to-Income ratio is low. This indicates that you have a healthy balance between your income and debt.',
        Moderate: 'Your Debt-to-Income ratio is moderate. This indicates that you have a manageable level of debt compared to your income.',
        High: 'Your Debt-to-Income ratio is high. This indicates that a significant portion of your income goes towards paying off debts, which may pose financial risks.'
    };

    return (
        <div className="dti-container">
            <div className="dti-box">
                <h2>Debt-to-Income Ratio Calculator</h2>
                <div className="dti-form-wrapper">
                    <div>
                        <label>Monthly Income ($)</label>
                        <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
                    </div>
                    <div>
                        <label>Monthly Debt ($)</label>
                        <input type="number" value={debt} onChange={(e) => setDebt(e.target.value)} />
                    </div>
                    <button className="calculate-button" onClick={calculateDti}>Calculate DTI</button>
                    {dti !== null && (
                        <div>
                            <div className="dti-result" style={{ backgroundColor: getDtiColor().color }}>
                                <p>Your Debt-to-Income Ratio: {dti}% ({getDtiColor().label})</p>
                            </div>
                            <p style={{ color: getDtiColor().color }}>{dtiColorMeaning[getDtiColor().label]}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DebtToIncomeRatioCalculator;
