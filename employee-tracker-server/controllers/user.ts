import { Request, Response } from "express";
import User from "../models/User";

  export const getUsers = async (req: Request, res: Response) => {
    try {
      const {
        page = 1,
        limit = 20,
        search = "",
        gender,
        domain,
        available,
      } = req.query;

      const perPage: number = parseInt(limit as string);
      const currentPage: number = parseInt(page as string);

      const searchQuery: any = {};

      if (search) {
        searchQuery.$or = [
          { first_name: { $regex: search, $options: "i" } },
          { last_name: { $regex: search, $options: "i" } },
        ];
      }

      if (gender && gender !== "all") {
        searchQuery.gender = gender;
      }

      if (domain && domain !== "all") {
        searchQuery.domain = domain;
      }

      if (available && available !== "all") {
        searchQuery.available = available;
      }

      const [totalUsers, users] = await Promise.all([
        User.countDocuments(searchQuery),
        User.find(searchQuery)
          .lean()
          .skip((currentPage - 1) * perPage)
          .limit(perPage),
      ]);

      const totalPages: number = Math.ceil(totalUsers / perPage);

      if (totalPages > 0 && totalUsers > 0 && currentPage > totalPages) {
        return res.status(400).json({ message: "Page out of range" });
      }

      return res.status(200).json({
        users,
        currentPage,
        totalPages,
        totalUsers,
      });
    } catch (err: any) {
      return res.status(err.statusCode || 500).json({ message: err.message });
    }
  };

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