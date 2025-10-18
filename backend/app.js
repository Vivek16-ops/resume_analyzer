import express from 'express';
import dotenv from "dotenv";
import cors from "cors"
import testingRoutes from './routes/testing.js'
import FileHandling from './routes/fileHandling.js'
import connectMongoDb from './db/connectDB.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/testAPI', testingRoutes);
app.use('/api/fileHandling', FileHandling);

app.listen(PORT, (error) => {
    if (!error) {
        connectMongoDb();
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    }
    else
        console.log("Error occurred, server can't start", error.message);
}
);