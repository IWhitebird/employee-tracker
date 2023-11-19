import express, { Router } from "express";
import {
    getUsers,
    getUsers1,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}from "../controllers/user";

const router: Router = express.Router();

//GET ALL USERS
router.get("/", getUsers);

router.get("/getAll", getUsers1);
//CREATE USER
router.post("/", createUser);

//GET USER BY ID
router.get("/:id", getUserById);

//UPDATE EXISTING USER
router.put("/:id", updateUser);

//DELETE USER BY ID
router.delete("/:id", deleteUser);

export default router;
