import express from 'express';
import dotenv from "dotenv";
import testingRoutes from './routes/testing.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/api/testAPI',testingRoutes);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);