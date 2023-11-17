import { Request, Response } from 'express';
import Team from '../models/Team';


export const createTeam = async (req: Request, res: Response) => {
  try {
    const { team_name, team_description, team_members } = req.body;

    const newTeam = new Team({
      team_name,
      team_description,
      team_members,
    });

    const savedTeam = await newTeam.save();

    return res.status(201).json({ team: savedTeam });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const getTeams = async (req: Request, res: Response) => {
  try {
    const team = await Team.find().populate("team_members");

    return res.status(200).json({ team });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const getTeamById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate("team_members");

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    return res.status(200).json({ team });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message });
  }
};
