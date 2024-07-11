/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ    */
/*  إِ*/
/*اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ  */
/* I believe in Allah and he is enough for me */




 let loginbtn = document.querySelector('#login-btn') ;
let email_input = document.querySelector('#emailInput') ;
 let password_input =document.getElementById('passInput')



const loginFuction =async () => {
    let email = email_input.value ;
    let password = password_input.value ;
    if(email !== undefined || email !== null || email !== ''  || password !==undefined || password !== null || password !== '' ) {
        let res = await fetch('http://localhost:4000/auth/login?email='+ email + "&password="  + password , 
            {
                method: "POST"
            }) ;
        let response = await res.json() ; 
        console.log(response);
        if (response.alert  !==  undefined  && response.alert  !==   '' ) {
            console.log('alert');
            return alert(response.alert)
        
         } else if (response.error  !==  undefined && response.error  !==  '' ) {
            alert(response.error) ;
            if (response.url !== undefined || response.url !== '') {
               
             return  window.location.replace(response.url) ;
            }
            return   ;
        } else  if(response.url !== undefined || response.url !== '') {
console.log('url');
            return  window.location.replace(response.url) ;
         
        } 
    }
}

 loginbtn.addEventListener('click' , async(event) => {
    event.preventDefault() ;
    await loginFuction() 
})



password_input.addEventListener('keyup' , async (e) => {
   console.log(e.key);
   if (e.key === 'Enter') {
  await  loginFuction() ;
   }
})
