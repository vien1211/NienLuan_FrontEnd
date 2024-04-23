import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  product: [],
  search: '',
}

export const productSlide = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    searchProduct: (state, action) => {
      state.search = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchProduct } = productSlide.actions

export default productSlide.reducer