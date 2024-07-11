/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ    */
/*  إِ*/
/*اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ  */
/* I believe in Allah and he is enough for me */





//Imports and Requiring 
import { createRequire } from "module";
let require = createRequire(import.meta.url);
require('dotenv').config();
 import jwt from "jsonwebtoken";
import path from "path";
import {  fileURLToPath } from "url";
import express from "express";
import ejs from "ejs";
const upload = require('express-fileupload');
import cookieParser from "cookie-parser";
import { log } from "console";



//Variables
import secret_page_auth from "../Utils/secretPageAuth.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pageRouter = express.Router();


let Secret =  process.env.Secret;



//Routes
pageRouter.get('/', (req , res)=> {
    res.render('Login');
    // console.log('login');
});


pageRouter.get('/sign-up', (req ,res)=> {
    res.render('SingUp');
});

pageRouter.get('/login', (req,res)=> {
    
    res.render('Login');
});


pageRouter.get('/new-nibondon' , secret_page_auth , 
    async (req,res)=> {
       return res.render('new-nibondon') ;
});


pageRouter.get('/new-nid', secret_page_auth   , (req,res)=> {
    res.render('new-nid');
});


pageRouter.get('/clone',  secret_page_auth ,
    (req,res)=> {
    res.render('clone');
});


pageRouter.get('/profile' ,secret_page_auth , 
    (req, res) => {
let {name , email , phone } = req.userInfo ;
    res.render('profile' , {name ,email ,phone}) ;
});


pageRouter.get('/varify' , (req, res) => {
    if(req.cookies.varify === undefined) {
        return res.send('<h1 style="color:red">Your Sign Up failed </h1>') ;
    }
    jwt.verify(req.cookies.varify , Secret , (err , data) => {
    if (err !== null) {
       return res.send('<h1 style="color:red">Your Sign Up failed </h1>')
    }
    res.render('varify') ;
    })
   
       
    
    
})

export default pageRouter;