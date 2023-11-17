import express , {Request, Response , Express} from "express";
import dotenv from "dotenv";
import MongoConnect from "./config/database";
import cors from "cors";
dotenv.config();

import userRoutes from "./routes/user";
import teamRoutes from "./routes/team";

//To Connect to MongoDB Database
MongoConnect();

const app : Express = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(cors({
    origin:true,
    credentials: true,
}));

//Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/team", teamRoutes);
app.get("/", (res : Response) => {
    return res.json({
        success: true,
        message: "Your Server is now running",
    });
});

//To Start the Server
app.listen(PORT, () => { console.log(`Server is running at ${PORT}`) });