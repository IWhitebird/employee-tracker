import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../vite-env";

interface UserState {
  search: string;
  page: number;
  gender: string;
  domain: string;
  availability: string;
  data: IUser[];
}

const initialState: UserState = {
  search: "",
  page: 1,
  gender: "all",
  domain: "all",
  availability: "all",
  data: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearch: (state : UserState , action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPage: (state: UserState, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setGender: (state: UserState, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setDomain: (state: UserState, action: PayloadAction<string>) => {
      state.domain = action.payload;
    },
    setAvailability: (state: UserState, action: PayloadAction<string>) => {
      state.availability = action.payload;
    },
    setData : (state: UserState, action: PayloadAction<IUser[]>) => {
        state.data = action.payload;
      }
  },
});

export const { setSearch, setPage, setGender, setDomain, setAvailability , setData } =
  userSlice.actions;

export default userSlice.reducer;
