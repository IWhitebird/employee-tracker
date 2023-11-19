import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TeamState {
    team_name: string,
    team_description: string,
    team_members: any[],
    createTeamMode : boolean;
}


const initialState: TeamState = {
    team_name: "",
    team_description: "",
    team_members: [],
    createTeamMode : false,
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeamMode: (state, action: PayloadAction<boolean>) => {
        state.createTeamMode = action.payload;
    },
    setTeamName: (state, action: PayloadAction<string>) => {
        state.team_name = action.payload;
    },
    setTeamDescription: (state, action: PayloadAction<string>) => {
        state.team_description = action.payload;
    },
    setTeamMembers: (state, action: PayloadAction<any[]>) => {
        state.team_members = action.payload;
    },
  },
});

export const { setTeamMode, setTeamName, setTeamDescription, setTeamMembers } =
teamSlice.actions;

export default teamSlice.reducer;
