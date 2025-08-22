import express from "express";
import router from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from 'dotenv'
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors"

dotenv.config()


const app = express();
const port = 5500



//middleware
app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json())

app.use(rateLimiter)

//simple middleware example
// app.use((req,res,next) =>{
//     console.log(`Request method is : ${req.method} and req url: ${req.url}`)
//     next()
// })

app.use('/api/notes',router)



connectDb().then(()=>{
    app.listen(port,() =>{
    console.log(`App started on port : ${port}`)
})
}) 
