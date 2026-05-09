import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount, incrementAsync } from "./counterSlice";
import { useState } from "react";

const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const status = useSelector((state) => state.counter.status);
    const dispatch = useDispatch();
    
    const [incrementAmount, setIncrementAmount] = useState(0);
    const addValue = Number(incrementAmount) || 0;

    const reserAll = () => {
        setIncrementAmount(0);
        dispatch(reset());
    }

    return (
        <section className="counter-container">
            <p className="counter-display">{count}</p>
            {status === 'loading' && <p className="async-text">Loading...</p>}
            {status === 'idle' && <p className="async-text idle">Your result is:</p>}
            {status === 'failed' && <p className="async-text wrong">Something went wrong...</p>}
            <div>
                <button className="counter-button increment" onClick={() => dispatch(increment())}>Increment</button>
                <button className="counter-button decrement" onClick={() => dispatch(decrement())}>Decrement</button>
            </div>
            <input
                className="counter-input" 
                type="number" 
                value={incrementAmount} 
                onChange={(e) => setIncrementAmount(e.target.value)}
            />
            <div>
                <button className="counter-button add-amount" onClick={() => dispatch(incrementByAmount(addValue))}>
                    Add Amount
                </button>
                <button 
                    className="counter-button add-async" 
                    onClick={() => dispatch(incrementAsync(addValue))}
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Wait for 2 sec...' : 'Add Async'}
                </button>
                <button className="counter-button reset" onClick={reserAll}>Reset</button>
            </div>
        </section>
    )
}

export default Counter;