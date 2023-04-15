import React, { useState } from 'react'
import '../../Home.css';

const ConfirmModal = props => {
    const [pause, setPause] = useState(false);

    const onCancel = (e) => {
        e.preventDefault();
        props.onCancel();
    }

    const onConfirm = (e) => {
        e.preventDefault();
        props.onConfirm();
    }

    const sleep = (delay) => new Promise(resolve => setTimeout(resolve, delay));

    const check = async() => {
        await sleep(2000);
        setPause(false);
    }
    
        return(
        <div className='addModal' >
            <form > 
                <h3><u>Confirm Trip</u></h3>
                <p>Trip:  {props.tripInfo.tripName}</p>
                <p>Status:  {props.tripInfo.status}</p>
                <p>Points:  {props.tripInfo.possiblePoints}</p>
                <label>Check your location<br/>(will take a few seconds)</label>
                <input required onClick={async () => { setPause(true); check()}} type="checkbox" name="Check"/>
                <button onClick={onConfirm} type="submit" disabled={pause}>Confirm</button>
                <button onClick={onCancel}>Cancel</button>
            </form>
        </div>
        );
}
export default ConfirmModal;