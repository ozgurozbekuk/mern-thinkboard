import express from "express";
import router from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
if (process.env.NODE_ENV !== "production"){
    app.use(cors({ origin: "http://localhost:5173" }));
}

app.use(express.json());

app.use(rateLimiter);

//simple middleware example
// app.use((req,res,next) =>{
//     console.log(`Request method is : ${req.method} and req url: ${req.url}`)
//     next()
// })

app.use("/api/notes", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    app.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`App started on port : ${PORT}`);
  });
});
