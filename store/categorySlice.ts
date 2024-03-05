import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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

  export const updateCategory = createAsyncThunk(
    "updateCategory",
    async ({ categoryName, id }: { categoryName: string; id: string }, thunkAPI) => {
      return await CategoriesAPI.updateCategory(categoryName, id);
    }
  );
  
  export const deleteCategory = createAsyncThunk(
    "deleteCategory",
    async (id: string, thunkAPI) => {
      return await CategoriesAPI.deleteCategory(id);
    }
  );



export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      state.categories = action.payload;
    }),
    builder.addCase(createCategory.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.categories.push(action.payload)
      }),
      builder.addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        );
      });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      console.log("deleete", typeof action.payload.id, action.payload);
      state.categories = state.categories.filter(
        (category) => category.id !== Number(action.payload.id)
      );
    });
}
})

export const {  } = categorySlice.actions

export default categorySlice.reducer