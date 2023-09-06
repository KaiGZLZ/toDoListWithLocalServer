import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: "",
  message: "",
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {

      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    clearAlert: (state, action) => {
      
      state.type = "";
      state.message = "";
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAlert, clearAlert } = alertSlice.actions

export default alertSlice.reducer