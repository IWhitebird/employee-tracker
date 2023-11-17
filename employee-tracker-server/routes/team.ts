import { Router } from "express";
import {
  createTeam,
  getTeams,
  getTeamById,
} from "../controllers/team"; 

const router: Router = Router();

//CREATE NEW TEAM
router.post("/", createTeam);

//GET ALL TEAMS
router.get("/", getTeams);

//GET TEAM DETAILS BY ID
router.get("/:id", getTeamById);

export default router;
