import mongoose from "mongoose";

export interface IUser extends Document {
  first_name: string;
  last_name?: string | null;
  email: string;
  gender: string;
  avatar?: string | null;
  domain: string;
  available: boolean;
}

export interface ITeams extends Document {
  team_name: string;
  team_description?: string | null;
  team_members: Array<mongoose.Types.ObjectId>;
}
