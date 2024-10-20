import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  isFetching: false,
  error: { type: null, message: '' },
}

const merchantsResultsSlice = createSlice({
  name: 'merchants',
  initialState,
  reducers: {
    // GET ALL RESULTS
    getMerchantResultsStart: (state) => {
      state.isFetching = true
    },
    getMerchantResultsSuccess: (state, action) => {
      state.isFetching = false
      state.data = action.payload
      state.error = { type: null, message: '' }
    },
    getMerchantResultsFailure: (state, error) => {
      state.isFetching = false
      state.error = error.payload
      state.data = initialState.data
    },
    resetMerchantResults: () => initialState
  }
})

export default merchantsResultsSlice.reducer

export const { getMerchantResultsStart, getMerchantResultsSuccess, getMerchantResultsFailure, resetSearchResults } = merchantsResultsSlice.actions
