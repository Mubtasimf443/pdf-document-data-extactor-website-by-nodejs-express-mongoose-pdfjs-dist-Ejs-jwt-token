/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ    */
/*  إِ*/
/*اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ  */
/* I believe in allah and he is enough for me */


//Imports and Require
import { createRequire } from "module";
let require = createRequire(import.meta.url);
require("dotenv").config()

import express from "express";
import {fileURLToPath} from "url";
import path from "path";



//variables
const fileRouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//Routes
fileRouter.get("/css/:id", (req,res)=> {
    res.status(200).sendFile(path.join(__dirname, `../public/style/${req.params.id}`));
    
})


fileRouter.get("/javascript/:id", (req,res)=> {

    res.status(200).sendFile(path.join(__dirname, `../public/script/${req.params.id}`));
    
})

fileRouter.get('/image/:id',(req,res)=> {
   
    res.status(200).sendFile(path.join(__dirname, `../public/assets/${req.params.id}`));
   
} );


fileRouter.get('/pdf-ext-image/:name'  , (req,res) =>  {

        
        res.status(200).sendFile(path.join(__dirname, "../uploads/pdf_Image/" + req.params.name));
});


fileRouter.get("/fonts", (req,res) => {
let fontPath =path.join(__dirname, "../public/fonts/AnekBanglat.ttf");

    res.status(200).sendFile(fontPath).then(() => {
        console.log('fonts are send by the marcy of Allah');
    });
 
})
//export
export default fileRouter;