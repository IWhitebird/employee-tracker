"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamById = exports.getAllTeams = exports.createTeam = void 0;
const Team_1 = __importDefault(require("../models/Team"));
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { team_name, team_description, team_members } = req.body;
        const newTeam = new Team_1.default({
            team_name,
            team_description,
            team_members,
        });
        const savedTeam = yield newTeam.save();
        return res.status(201).json({ team: savedTeam });
    }
    catch (err) {
        return res.status(err.statusCode || 500).json({ error: err.message });
    }
});
exports.createTeam = createTeam;
const getAllTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const team = yield Team_1.default.find().populate("team_members");
        return res.status(200).json({ team });
    }
    catch (err) {
        return res.status(err.statusCode || 500).json({ error: err.message });
    }
});
exports.getAllTeams = getAllTeams;
const getTeamById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const team = yield Team_1.default.findById(id).populate("team_members");
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }
        return res.status(200).json({ team });
    }
    catch (err) {
        return res.status(err.statusCode || 500).json({ error: err.message });
    }
});
exports.getTeamById = getTeamById;
//# sourceMappingURL=team.js.map