import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = [...action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTasks } = userSlice.actions

export default userSlice.reducer