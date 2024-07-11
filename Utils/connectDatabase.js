 /* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ    */
/*  إِ*/
/*اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ  */
/* I believe in Allah and he is enough for me */

 import mongoose from "mongoose";
 

  const connectDatabase = async (mongoKey) => {
    try {
        await mongoose.connect(mongoKey ,).then(() => { 
            console.log('Database connected Alhamdulilah');
        })
    } catch (error) {
        throw error
      //console.log(errot)
    }
 }


export default connectDatabase ;
