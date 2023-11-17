import { Request, Response } from "express";
import User from "../models/User";


  export const getUsers = async (req: Request, res: Response) => {
    try{
        return res.status(200).json({users: await User.find({})});
    }
    catch(err){
        return res.status(err.statusCode || 500).json({error: err.message});
    }
  }


  export const getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ user });
    } catch (err: any) {
      return res.status(err.statusCode || 500).json({ message: err.message });
    }
  };
  
  export const createUser = async (req: Request, res: Response) => {
    try {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      return res.status(201).json({ user: savedUser });
    } catch (err: any) {
      return res.status(err.statusCode || 500).json({ message: err.message });
    }
  };
  
  export const updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ user: updatedUser });
    } catch (err: any) {
      return res.status(err.statusCode || 500).json({ message: err.message });
    }
  };
  
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndRemove(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(204).send();
    } catch (err: any) {
      return res.status(err.statusCode || 500).json({ message: err.message });
    }
  };