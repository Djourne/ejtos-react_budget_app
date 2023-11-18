// Budget.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, remaining, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const [error, setError] = useState(null);

    const handleBudgetChange = (event) => {
        const inputValue = parseFloat(event.target.value);

        if (isNaN(inputValue)) {
            setError('Please enter a valid number for the budget.');
        } else if (inputValue < remaining) {
            setError('Budget cannot be lower than the spending.');
        } else {
            setError(null);
            setNewBudget(inputValue);
        }
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency} {newBudget}</span>
            <input
                type="number"
                step="10"
                value={newBudget}
                onChange={handleBudgetChange}
            />
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default Budget;
