import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Category } from '../entities/category'
import { CategoriesAPI } from '../api/categoriesAPI'


export interface CategoryState {
  categories: Category[]
}

const initialState: CategoryState = {
  categories: [],
}


// First, create the thunk
export const fetchCategories = createAsyncThunk(
    'fetchCategories',
    async (thunkAPI) => {
      return await CategoriesAPI.fetchAll();
    },
  )

  export const createCategory = createAsyncThunk(
    'createCategory',
    async (category: Category, thunkAPI) => {
      return await CategoriesAPI.createCategory(category)
    },
  )



export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("action.payload", action.payload);
      state.categories = action.payload;
    //   state.entities.push(action.payload)
    }),
    builder.addCase(createCategory.fulfilled, (state, action) => {
        // Add user to the state array
        console.log("action.payload", action.payload);
        state.categories.push(action.payload)
      //   state.entities.push(action.payload)
      })
}
})

// Action creators are generated for each case reducer function
// ACTIONS
export const {  } = categorySlice.actions

export default categorySlice.reducer