import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mainData: [],
}

const merchantsMainDataSlice = createSlice({
  name: 'merchantsMainData',
  initialState,
  reducers: {
    getMerchantMainDataSuccess: (state, action) => {
      state.mainData = action.payload
    },
    getMerchantMainDataFailure: (state) => {
      state.mainData = initialState.mainDataResults
    },
    setMarchantsResults: (state, action) => {
      state.mainData = action.payload
    },
    resetMainDataResults: () => initialState
  }
})

export default merchantsMainDataSlice.reducer

export const { getMerchantMainDataSuccess, getMerchantMainDataFailure, resetMainDataResults, setMarchantsResults } = merchantsMainDataSlice.actions
