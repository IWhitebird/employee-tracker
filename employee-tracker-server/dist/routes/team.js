"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = require("../controllers/team");
const router = (0, express_1.Router)();
//CREATE NEW TEAM
router.post("/", team_1.createTeam);
//GET ALL TEAMS
router.get("/", team_1.getAllTeams);
//GET TEAM DETAILS BY ID
router.get("/:id", team_1.getTeamById);
exports.default = router;
//# sourceMappingURL=team.js.map