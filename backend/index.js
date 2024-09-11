import express from 'express';
import configDotenv from 'dotenv';
import connectDB from './utils/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import registerRouter from '../backend/routes/user.route.js';
import loginRouter from '../backend/routes/user.route.js';
import logoutRouter from '../backend/routes/user.route.js';
import profileUpdateRouter from '../backend/routes/user.route.js';
import companyRegister from '../backend/routes/company.route.js';
import jobRoute from '../backend/routes/job.route.js'
import jobApplicationRoute from "../backend/routes/applications.route.js"
const app  = express();
configDotenv.config({});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:8000',
    credentials:true
}
app.use(cors(corsOptions));

app.use("/api/newuser", registerRouter);
app.use("/api/user",loginRouter);
app.use("/api/user", logoutRouter);
app.use("/api/user", profileUpdateRouter);


app.use("/api/user", companyRegister);

//job route;
app.use("/api/job", jobRoute )

//job application;
app.use("/api/application", jobApplicationRoute )

 

 
const PORT  = process.env.PORT || 7000;
app.listen(PORT, ()=>{
    connectDB();
    console.log(`port is running ${PORT}`);
});