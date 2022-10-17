import * as productService from '@/apiServices/product.service';
import { IProductProps } from '@/interfaces/redux.interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState: IProductProps = {
  loading: false,
  products: [],
  error: null,
};

export const getAllProductDispatch = createAsyncThunk(
  'product/geAllProduct',
  async (value, { rejectWithValue }) => {
    const response = await productService.geAllProduct();
    if (response.data) {
      return response.data;
    }
    return rejectWithValue(response.message);
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearState: (state) => {
      return {
        ...state,
        loading: false,
        products: [],
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductDispatch.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllProductDispatch.fulfilled, (state, action: any) => {
        return {
          ...state,
          loading: false,
          products: action.payload,
        };
      })
      .addCase(getAllProductDispatch.rejected, (state, action: any) => {
        return {
          ...state,
          loading: false,
          products: [],
          error: action.payload.message,
        };
      });
  },
});
export const { clearState } = productSlice.actions;
export default productSlice.reducer;
