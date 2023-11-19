/// <reference types="vite/client" />

/**
 * Represents a user in the system.
 */
export interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    avatar: string ;
    domain: string;
    available: boolean;
  }

/**
 * Represents a team in the system.
 */
export interface ITeams {
    team_name: string;
    team_description?: string | null;
    team_members: Array<mongoose.Types.ObjectId>;
}
