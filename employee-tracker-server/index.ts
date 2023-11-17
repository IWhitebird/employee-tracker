import express , {Request, Response , Express} from "express";
import dotenv from "dotenv";
import connect from "./config/database";
import cors from "cors";
dotenv.config();

//To Connect to MongoDB Database
connect();

const app : Express = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin:true,
    credentials: true,
}));


app.get("/", (req : Request , res : Response) => {
    return res.json({
        success: true,
        message: "Your Server is now running",
    });
});

app.listen(PORT, () => { console.log(`Server is running at ${PORT}`) });