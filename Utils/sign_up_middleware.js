/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ    */
/*  إِ*/
/*اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ  */
/* I believe in Allah and he is enough for me */







let sign_up_middleWare = ( req,res , next ) => {
    let {name , email , phone , password , cpassword  } = req.query ;
  
  if (email === '' ||  name === ''   ||  phone === ''   ||  password === ''   ||  cpassword === '' || email === undefined ||  name === undefined   ||  phone === undefined    ||  password === undefined   ||  cpassword === undefined  ) {
      return res.status(200).json({ error  : "You have ot given the correct data and Your Data is Undefined or Null"})
  
    } else if (  name.length <= 5 || email.length <= 5 || password.length <= 5 || cpassword.length <= 5  ) {
      return res.status(200).json({ error  : "data cannot be less or equal 5 carrecters long"})

    } else if ( 20 <=  name.length || 20 <= cpassword.length || 20 <=  password.length || 15 <=  phone.length) {
      return res.status(200).json({ error  : "data cannot be less or equal 20 carrecters long"})
  
    } else if (password !== cpassword) {
    return res.status(200).json({
      error  : "password  Do not Match"})
    }  
    next();
}

export default sign_up_middleWare ;