// teams.ts
import mongoose from "mongoose";
import { ITeams } from "../types";

const TeamsSchema = new mongoose.Schema<ITeams>(
  {
    team_name: { 
        type: String, 
        required: true 
    },
    team_description: { 
        type: String, 
        required: false 
    },
    team_members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITeams>("Teams", TeamsSchema);
