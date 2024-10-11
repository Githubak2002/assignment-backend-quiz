import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";


import {connectDB} from "./config/connectDB.js"
import authRoutes from "./routes/authRoute.js"
import quizRoutes from "./routes/quizRoute.js"

// 2. config
dotenv.config();

// 3. app
const app = express();
const port = process.env.PORT || 8000;

// 4. middelwares
app.use(cors());
app.use(cookieParser()); 
app.use(express.json()); 

// Routes
// app.use('/', (req,res) => {
//   res.send('Hello from server');
// })

app.use('/api/quizzes', quizRoutes);
app.use('/api/auth', authRoutes);

// Liestien to requests
async function startServer  (){
  const db = await connectDB();
  if(db.success)
  {
    console.log(db.msg)
    app.listen( port, async () => {
      console.log(`Server is running on port ${port}`);
    });
  }
  else
    console.error(db.msg)
}

startServer()




// ORDER
/*

imports
dotenv.config()

const app = express();
const PORT = process.env.BACKEND_PORT || 8080;
const __dirname = path.resolve();

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json()); 
app.use(cookieParser()); 

// Route setup
app.use("/api/auth", authRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "Frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
  });
}

// Start the server and connect to the database
const startServer = async () => {
  const dbConnected = await connectDB();
  if (dbConnected) {
    console.log("DB connected!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} - http://localhost:${PORT}`);
    });
  } else {
    console.error("Error connecting to the database. Server not started.");
    process.exit(1); // Exit the process with failure code
  }
};

startServer();


*/

