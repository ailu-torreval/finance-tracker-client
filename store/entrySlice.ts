import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Entry } from "../entities/entry";
import { EntriesAPI } from "../api/entriesAPI";
import { EntryDTO } from "../entities/entryDTO";

export interface EntryState {
  entries: Entry[];
}

const initialState: EntryState = {
  entries: [],
};

// First, create the thunk
export const fetchEntries = createAsyncThunk(
  "fetchEntries",
  async (thunkAPI) => {
    return await EntriesAPI.fetchAll();
  }
);

export const createEntry = createAsyncThunk(
  "createEntry",
  async (entry: EntryDTO, thunkAPI) => {
    return await EntriesAPI.createEntry(entry);
  }
);

export const updateEntry = createAsyncThunk(
  "updateEntry",
  async ({ entry, id }: { entry: EntryDTO; id: string }, thunkAPI) => {
    return await EntriesAPI.updateEntry(entry, id);
  }
);

export const deleteEntry = createAsyncThunk(
  "deleteEntry",
  async (id: string, thunkAPI) => {
    return await EntriesAPI.deleteEntry(id);
  }
);

export const entrySlice = createSlice({
  name: "entry",
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
      console.log("action.payload", action.payload);
      state.entries = action.payload;
    }),
      builder.addCase(createEntry.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.entries.push(action.payload);
      }),
      builder.addCase(updateEntry.fulfilled, (state, action) => {
        state.entries = state.entries.map((entry) =>
          entry.id === action.payload.id ? action.payload : entry
        );
      });
    builder.addCase(deleteEntry.fulfilled, (state, action) => {
      console.log("deleete", typeof action.payload.id, action.payload);
      state.entries = state.entries.filter(
        (entry) => entry.id !== Number(action.payload.id)
      );
    });
  },
});

// Action creators are generated for each case reducer function
// ACTIONS
export const {} = entrySlice.actions;

export default entrySlice.reducer;
