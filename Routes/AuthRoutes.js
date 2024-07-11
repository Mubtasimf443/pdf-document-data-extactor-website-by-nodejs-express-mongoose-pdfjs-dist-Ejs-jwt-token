/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ    */
/*  إِ*/
/*اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ  */
/* I believe in Allah and he is enough for me */






import { createRequire } from "module";
let require = createRequire(import.meta.url);
require("dotenv").config()
import { json } from "express";
import fs from "fs";
import path from "path";
import {  fileURLToPath } from "url";
import {  Router} from "express";
const AuthRouter = Router();
import User from "../models/User.js";
import  cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import upload from "express-fileupload";
import sign_up_middleWare from "../Utils/sign_up_middleware.js";
 import express from "express";
import { error, log } from "console";
import crypto from "crypto";
import { AcquireWritableStreamDefaultWriter } from "pdfjs-dist";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// Variables
 let Secret = process.env.Secret
 let __filename= fileURLToPath(import.meta.url) ;
 let __dirname = path.dirname(__filename) ;
 let transport = await nodemailer.createTransport({
  host : 'smpt.ethereal.com' ,
  port: 587,
  auth : {
    user : 'jamar68@ethereal.email',
    password: 'YCZdxyfqcqr5QXf2dE'
  }
}) ;





 
AuthRouter.post('/register' ,  sign_up_middleWare,  async (req, res) => {
  let {name , email , phone , password , cpassword  } = req.query ;

  let checked = await User.findOne().where('email').equals(email);
  if (checked !== null) {
   res.status(200).json({error : 'You Already Have an Acoout , Please Login' }) ; return
  }
  let varifyNumber = Math.floor(Math.random() * 7) ;
  let varifyId = await  `${Date.now() }_${Math.floor(Math.random() * 3)}_${Math.floor(Math.random() * 3)}_${Math.floor(Math.random() * 3)}` ;
  let objext = {
    name : name ,
    email : email ,
    phone: phone , 
    password : password ,
    varify : varifyNumber 
  }
  let data = await Buffer.from(JSON.stringify(objext)) ;
  let uploadPath = await path.resolve(__dirname , `../uploads/varify/${varifyId}.json` ) ;
  await fs.writeFileSync(uploadPath, data) ;
 
  let info = transport.sendMail({
    from: 'Mubtasim < Mubtasimf443@gmail.com>',
    to: `${name} <${email}>` ,
    subject : 'Check Your Varification Number' ,
    html: `<h3>Get your varification code </h3> <br> <br><p> hello ${name}  ,<br> Your varification code is ${varifyNumber} .<br> Thanks for Joining with Us.  </p> `

  }) ;

  let token = await jwt.sign({name , email , phone , password , varifyId} , Secret , {
    
  }) ;
  res.status(200).cookie('varify' , token , { httpOnly : true , expires : new Date(Date.now() + 60000) ,  sameSite:'strict' }) ; 
  res.end(JSON.stringify({
    url : '/page/varify'
  }))
  await setTimeout(async () => {
    //varification time is 60 secondes and after 60 secode json file will be remove 
    //this will prevent app to become loaded very to be big

    await fs.unlinkSync(uploadPath) ;
  } , 60000)
});






AuthRouter.post('/login' ,  
 
 async (req, res) => {

let {email ,password } = req.query ;

  let user = await User.findOne().where('email').equals(email);
if (user === null) {
  res.status(200).json({error: 'You Have To Sign Up' , url:'/page/sign-up'}) ; 
}
 let checkpassword = await bcrypt.compareSync(password ,user.password ) ;
if (checkpassword === true) {
  let token = jwt.sign({ login : true ,  email} , Secret , {})
  res.status(200).cookie('jwt' , token , {
    sameSite:'strict' , httpOnly:'true' , expires : new Date(Date.now() + 10000000000)
  } ) ;
  res.end(JSON.stringify({url :'/page/new-nid' }))
}

}
);





AuthRouter.post('/logout' , (req, res ) => {
  let cookie = req.cookies.jwt
  if( cookie === null || cookie === undefined || cookie === '' ) {
       return res.redirect('/page/login')
    }
   
    jwt.verify(cookie, Secret , async (err ,items ) => {
        if (err) {
            return res.redirect('/page/login') ;
        }
        if (items !== null) {
            if(items.login === false || items.email === undefined || items.email === '' || items.login === '') {
                return res.redirect('/page/login')
            }
        let checkEmail = await User.findOne().where('email').equals(items.email) ;
        if ( checkEmail === null ) {
            return res.redirect('/page/login')
        } 
       let token = await jwt.sign({email : items.email , login : false } , Secret , {})
        }
      res.redirect('/page/login').cookie('jwt' , token , {
        sameSite:'strict' , httpOnly:'true' , expires : new Date(Date.now() + 10000000000)
      }) ;

      return
    })

}) ;


AuthRouter.post('/varify' , async (req, res) => {
  let code = req.query.code ;

  if (code === undefined || typeof code !== 'number' || code.toString().length !== 6 ) {
    return res.json({error: 'Sorry Invelid Varification code '}) 
  }
  if(req.cookies.varify === undefined) {
    return res.json({error: 'Time is Out  Please Sign UP Again '})
  }

  jwt.verify(req.cookies.varify , Secret , async (err , data) => {
    if (err !== null) {
       return res.status(200).send(JSON.stringify({error:'Your Sign Up failed ' })) 
    }
    let {name , email , phone , password , varifyId} = data ;
    let jsonPath = await path.resolve(__dirname , `../uploads/varify/${varifyId}.json`);

    let Json = await fs.readFileSync(jsonPath) ;
    let jsonData =await JSON.stringify(Json) ;
    if( code === jsonData.varify && jsonData.email === email && name === jsonData.name && password === jsonData.password && phone === jsonData.phone) {
      let saltedPassword = await bcrypt.hash(password , bcrypt.generateSalt(12)) ;
      
      let user = new User({name ,email ,phone , password : saltedPassword , token : [] }) ;
      let token = await user.registerToken(email , Secret) ;
      await user.save()
      .then(async (rasult) => {
       console.log(rasult);
    
        res.status(200).cookie('jwt' , token , { httpOnly : true , sameSite : "strict" , expires : new Date(Date.now() + 68000000000)  
         , }) ;
         res.end(JSON.stringify({url: "/page/profile"}))
       return 
        })
       .catch(async ( err) => {
         console.log(err);
         res.json({error : 'Failed to Register , please try to login' }) ;
         return ;
        }) 
    } else {
      return res.status(200).json({error : 'your Vatification Code do not Match'})
    }
  

   
   
  
   
   
  
  
     
     
    
       

}) })

export default AuthRouter;



































