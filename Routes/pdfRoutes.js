/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ    */
/*  إِ*/
/*اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ  */
/* I believe in allah and he is enough for me */


// importing package 
import { createRequire } from "module";
let require = createRequire(import.meta.url);
require("dotenv").config()

import path from "path";
import { fileURLToPath } from "url";
import express, { json } from "express";
import fs from "fs";
import upload from "express-fileupload";
import sepImageToPdf from "../Utils/ExportImage.js";
import { PdfReader } from "pdfreader";
import { error, log } from "console";

//setting up variavles
const pdfRouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var ImgFolder = path.resolve(__dirname, "../uploads/pdf_Image")
const pdfReader = new PdfReader();







//Routes



pdfRouter.post('/pdf-to-json', upload(), 
async (req,res, next) => {
    
  let sampleFile;
  let uploadPath;
 
     sampleFile = req.files.file;
  
    if (req.files === null || req.files === undefined ) {
      res.status(400).send('No files were uploaded.');
      return;
    }
    
    if (req.files.file.length >= 1 ) {
      res.status(499).send(JSON.stringify({
        error: "true", massage: " You can not upload more the One files "
      })) ;
      return;
    }
    if (req.files.file.mimetype!=="application/pdf") {
      res.status(404).send(JSON.stringify({
        error : "true",
        massage : " Only pdf files are allowed "
      }));
      return;
    }
    let savingName = `${Date.now()}-${Math.floor(Math.random()*100000)}`;
    uploadPath = path.resolve(__dirname,`../uploads/pdf/${savingName}.pdf`);
  
    
      sampleFile.mv(uploadPath, function(err) {
      if (!err) {
        return [];
      }
      });
      
    
    
    
   req.uploadInfo  = {
      path:`C:/Allah_is_with_me/uploads/pdf/${savingName}.pdf`,
      name : savingName + ".pdf"
    };
    
     next();
  
  }, 
  async (req,res, next) => {
    
  
  setTimeout(() => {

   // sepImageToPdf was create from npm package pdf-export-image
    sepImageToPdf("uploads/pdf/" + req.uploadInfo.name , "uploads/pdf_Image" )
    .then((images) => {

   fs.unlink(path.resolve(__dirname, `../uploads/pdf_Image/${images[0].fileName}.png`), (err) => {
    if (err) {
      throw err;
    }
   })
    req.personPhoto = `/file/pdf-ext-image/${images[1].fileName}.png` ;
    
    req.personSignature =  `/file/pdf-ext-image/${images[2].fileName}.png` ;
    next();
    })
    .catch((e) => { 

      console.log(e)
  
    })
    
  },1500)  }, 
  (req, res, next) => {
  // Pdf reader is a npm package 
  // And I have editted this  package as my wish  so you also need to  
  //customize pdfreeader and create and array and push data to array and return data
    pdfReader.parseFileItems("uploads/pdf/" + req.uploadInfo.name , (err, item) => {
      if(err) {
        throw err;
      }
    if (item !== null) {
      req.ItemDataForJSON = item;
      next();
    }
    })
  },

  async (req, res) => {
    let ItemDataForJSON = req.ItemDataForJSON;
   await res.writeHead(200,{"Content-Type":"application/json"});
    await res.end(JSON.stringify({
      item:ItemDataForJSON,
      photo:req.personPhoto,
      signature:req.personSignature
    })); 


    fs.unlink(req.uploadInfo.path, (err) => {
      if (err) {
        throw err
      }
    }) 
  }
  ) 
  
 


export default pdfRouter;