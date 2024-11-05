import express from "express";
import Connection from "./database/db.js";
import bodyParser from "body-parser";
import route from "./routes/route.js";
import cors from "cors";

const app = express();
const PORT = 8001;

// CORS setup with specified origin
app.use(cors({ origin: 'http://localhost:3000' })); // Adjust the origin to match your frontend's URL

// Middleware
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", route);

// Connect to database
Connection();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
