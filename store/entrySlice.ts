import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Entry } from '../entities/entry'
import { EntriesAPI } from '../api/entriesAPI'
import { CreateEntryDTO } from '../entities/createEntryDTO'

export interface EntryState {
  entries: Entry[]
}

const initialState: EntryState = {
  entries: [],
}


// First, create the thunk
export const fetchEntries = createAsyncThunk(
    'fetchEntries',
    async (thunkAPI) => {
      return await EntriesAPI.fetchAll();
    },
  )

  export const createEntry = createAsyncThunk(
    'createEntry',
    async (entry: CreateEntryDTO, thunkAPI) => {
      return await EntriesAPI.createEntry(entry)
    },
  )



export const entrySlice = createSlice({
  name: 'entry',
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
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("action.payload", action.payload);
      
      state.entries = action.payload;
    //   state.entities.push(action.payload)
    }),
    builder.addCase(createEntry.fulfilled, (state, action) => {
        // Add user to the state array
        console.log("action.payload", action.payload);
        
        state.entries.push(action.payload)
      //   state.entities.push(action.payload)
      })
}
})

// Action creators are generated for each case reducer function
// ACTIONS
export const {  } = entrySlice.actions

export default entrySlice.reducer