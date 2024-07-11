/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ    */
/*  إِ*/
/*اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ  */
/* I believe in Allah and he is enough for me */



import { name } from "ejs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name : {
        require :false ,
        type : String
    },
    email : {
        required : false,
        type : String, 
        unique : true 
    },
    password : {
        type : String,
        required : true ,
    },
    phone : {
        type: Number ,
        required: false
    },
    tokens : [ 
        {
     token : String   
        }
    ]

});

userSchema.methods.registerToken = function (email, key) {
    try {
        let token = jwt.sign({login:true , email} , key , {
           //expiresIn : '30 days',
  //  issuer : "http://localhost:4000" ,
        })
        this.tokens.push( { 
            token
        }) ;
        return token ;
    } catch (error) {  
        throw error
    }
   
    
}



const User = mongoose.model("user", userSchema) ;
export default User ;












