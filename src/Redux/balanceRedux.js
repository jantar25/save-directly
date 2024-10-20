import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  balanceData: [],
  total: 0,
  isFetching: false,
}

const balancesSlice = createSlice({
  name: 'balances',
  initialState,
  reducers: {
    // GET ALL RESULTS
    getBalanceStart: (state) => {
      state.isFetching = true
    },
    getBalanceSuccess: (state, action) => {
      state.balanceData = action.payload.data
      state.total = action.payload.total
      state.isFetching = false
    },
    getBalanceFailure: () => initialState,
    resetBalance: () => initialState
  }
})

export default balancesSlice.reducer

export const { getBalanceStart, getBalanceSuccess, getBalanceFailure, resetBalance } = balancesSlice.actions
