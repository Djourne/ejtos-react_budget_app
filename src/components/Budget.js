import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const handleBudgetChange = (event) => {
        const updatedBudget = parseInt(event.target.value);

        if (updatedBudget < 0) {
            alert("Budget cannot be negative!");
            return;
        }

        if (updatedBudget < budget) {
            alert("Budget cannot be lower than the spending!");
            return;
        }

        if (updatedBudget > 20000) {
            alert("Budget cannot exceed 20,000!");
            return;
        }

        setNewBudget(updatedBudget);

        dispatch({
            type: 'SET_BUDGET',
            payload: updatedBudget,
        });
    }

    return (
        <div className='alert alert-secondary'>
            <span>Budget: £{budget}</span>
            <input
                type="number"
                step="10"
                value={newBudget}
                onChange={handleBudgetChange}
                max="20000"
            />
        </div>
    );
};

export default Budget;
