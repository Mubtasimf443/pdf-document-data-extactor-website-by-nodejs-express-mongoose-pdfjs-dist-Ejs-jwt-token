/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ    */

/*اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ  */
/* I believe in allah and he is enough for me */


import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config() ;
import User from "../models/User.js";





//variables
let secret = process.env.Secret ;

const secret_page_auth = async ( req ,res, next ) => {
    let cookie = req.cookies.jwt
    if(cookie=== null || cookie === undefined || cookie === '') {
       return res.redirect('/page/login')
    }
   
    jwt.verify(cookie, secret , async (err ,items ) => {
        if (err) {
            return res.redirect('/page/login') ;
        }
        if (items !== null) {
            if(items.login === false || items.email === undefined || items.email === '' || items.login === '') {
                return res.redirect('/page/login')
            }
        let checkEmail = await User.findOne().where('email').equals(items.email) ;
        console.log(checkEmail);
        if ( checkEmail === null ) {
            return res.redirect('/page/login')
        } 
    req.userInfo = checkEmail ;
        next() ;
        
        }
    })
}








export default secret_page_auth ;