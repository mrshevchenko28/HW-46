import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const incrementAsync = createAsyncThunk(
    "incrementAsync",
    async (amount) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const isError = Math.random() > 0.5;

        if (isError) {
            throw new Error("Unexpected error!");
        }
        return amount;
    }
);

const initialState = {
    count: 0,
    status: 'idle',
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => { state.count += 1; },
        decrement: (state) => { state.count -= 1; },
        reset: (state) => { state.count = 0; },
        incrementByAmount: (state, action) => {
            state.count += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.count += action.payload;
            })
            .addCase(incrementAsync.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;