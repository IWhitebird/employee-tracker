"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// teams.ts
const mongoose_1 = __importDefault(require("mongoose"));
const TeamsSchema = new mongoose_1.default.Schema({
    team_name: {
        type: String,
        required: true
    },
    team_description: {
        type: String,
        required: false
    },
    team_members: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Teams", TeamsSchema);
//# sourceMappingURL=Team.js.map