import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: { value: null },
    reducers: {
        setCategory: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;