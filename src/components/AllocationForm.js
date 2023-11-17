import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = (props) => {
    const { dispatch, remaining, currency } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                resetDropdownStyles();
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const resetDropdownStyles = () => {
        dropdownRef.current.style.backgroundColor = '';
        dropdownRef.current.style.color = '';
    };

    const submitEvent = () => {
        if (cost > remaining) {
            alert(`The value cannot exceed remaining funds ${currency} ${remaining}`);
            setCost('');
            return;
        }

        const expense = {
            name: name,
            cost: parseInt(cost),
        };

        if (action === 'Reduce') {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }
    };

    return (
        <div>
            <div className="row">
                <div className="input-group mb-3" style={{ marginLeft: '2rem' }} ref={dropdownRef}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value="Marketing" name="marketing"> Marketing</option>
                        <option value="Sales" name="sales">Sales</option>
                        <option value="Finance" name="finance">Finance</option>
                        <option value="HR" name="hr">HR</option>
                        <option value="IT" name="it">IT</option>
                        <option value="Admin" name="admin">Admin</option>
                    </select>

                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect02" onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add" name="Add">Add</option>
                        <option value="Reduce" name="Reduce">Reduce</option>
                    </select>

                    <input
                        required='required'
                        type='number'
                        id='cost'
                        value={cost}
                        style={{ marginLeft: '2rem', size: 10 }}
                        onChange={(event) => setCost(event.target.value)}
                    />

                    {/* Add currency prefix to the Change Allocation textbox */}
                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <span className="input-group-text">{currency}</span>
                    </div>
                    <input
                        required='required'
                        type='number'
                        id='cost'
                        value={cost}
                        style={{ marginLeft: '2rem', size: 10 }}
                        onChange={(event) => setCost(event.target.value)}
                    />

                    {/* Add the currency selection dropdown with custom styles */}
                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <label className="input-group-text" htmlFor="currency">Currency</label>
                    </div>
                    <select
                        className="custom-select"
                        id="currency"
                        onChange={(event) => dispatch({ type: 'CHG_CURRENCY', payload: event.target.value })}
                        value={currency}
                        style={{ backgroundColor: '#29bad1', color: 'white' }}>
                        <option value="$">Dollar ($)</option>
                        <option value="£">Pound (£)</option>
                        <option value="€">Euro (€)</option>
                        <option value="₹">Rupee (₹)</option>
                    </select>

                    <button className="btn btn-primary" onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllocationForm;
