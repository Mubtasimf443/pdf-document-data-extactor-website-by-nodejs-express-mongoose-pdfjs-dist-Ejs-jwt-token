/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ    */
/*  إِ*/
/*اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ  */
/* I believe in Allah and he is enough for me */




//Importing necessary package
import {createRequire  } from "module";
let require = createRequire(import.meta.url);
require('dotenv').config();
import mongoose from "mongoose";
import path from "path";
import {  fileURLToPath } from "url";
import express from "express";
import { log } from "console";
import pdfRouter from "./Routes/pdfRoutes.js";
import pageRouter from "./Routes/pageRoutes.js";
import fileRouter from "./Routes/sendFileRoutes.js";
import AuthRouter from "./Routes/AuthRoutes.js";
import cors from "cors";
let bodyParser = require("als-body-parser")({}) ;
import connectDatabase from "./Utils/connectDatabase.js";
import cookieParser from "cookie-parser";




//Variables
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let mongo = process.env.MONGO ;



 
//setting up evironment

app.set('view engine', 'ejs') ;
app.use(cookieParser()) ;
app.set("views",path.join(__dirname, "/views") )
app.use(cors({
origin:'*' 
}));

  // connectDatabase(mongo);




//Server
app.get("/",(req ,res)=> {
    res.redirect('/page/') 
});


app.get('/json')
//Routes
app.use("/pdf", pdfRouter );

app.use('/page', pageRouter);

app.use("/file", fileRouter );

app.use('/auth', AuthRouter); 

app.listen(4000, ()=> {
    console.log("InshaAllah");
}); 
