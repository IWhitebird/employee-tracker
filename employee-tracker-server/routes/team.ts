import { Router } from "express";
import {
  createTeam,
  getAllTeams,
  getTeamById,
} from "../controllers/team"; 

const router: Router = Router();

//CREATE NEW TEAM
router.post("/", createTeam);

//GET ALL TEAMS
router.get("/", getAllTeams);

//GET TEAM DETAILS BY ID
router.get("/:id", getTeamById);

export default router;
