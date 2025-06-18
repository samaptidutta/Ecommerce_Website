import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch single product by ID
export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      console.log('Fetch Product Response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Fetch Product Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

// Fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  'product/fetchSimilarProducts',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/products/similar/${id}`);
      console.log('Similar Products Response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Similar Products Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch similar products');
    }
  }
);

// Fetch best seller
export const fetchBestSeller = createAsyncThunk(
  'product/fetchBestSeller',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/products/bestseller');
      console.log('Best Seller Response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Best Seller Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch best seller');
    }
  }
);

// Fetch products by filters
export const fetchProductsByFilters = createAsyncThunk(
  'product/fetchProductsByFilters',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/products', { params: filters });
      console.log('Filtered Products Response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Filtered Products Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    selectedProduct: null,
    similarProducts: [],
    bestSeller: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Product
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        console.log('Updated selectedProduct:', action.payload);
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log('Fetch Product Failed:', action.payload);
      })
      // Fetch Similar Products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
        console.log('Updated similarProducts:', action.payload);
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log('Fetch Similar Products Failed:', action.payload);
      })
      // Fetch Best Seller
      .addCase(fetchBestSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.bestSeller = action.payload;
        console.log('Updated bestSeller:', action.payload);
      })
      .addCase(fetchBestSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log('Fetch Best Seller Failed:', action.payload);
      })
      // Fetch Products by Filters
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        console.log('Updated products:', action.payload);
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log('Fetch Products by Filters Failed:', action.payload);
      });
  },
});

export default productSlice.reducer;