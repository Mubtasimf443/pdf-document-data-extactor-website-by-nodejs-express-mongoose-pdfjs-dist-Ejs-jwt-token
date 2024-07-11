/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ    */
/*  إِ*/
/*اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ  */
/* I believe in Allah and he is enough for me */








let singUpBtn = document.querySelector('.sign-up-btn');
const form = document.querySelector("#Register-Form") ;
let email = document.querySelector("#email-Input");
let name = document.querySelector("#Name-Input");
let phone = document.querySelector("#phone-Input");
let password = document.querySelector("#password-Input");
let cpassword = document.querySelector("#C-Password-Input");


singUpBtn.addEventListener('click', async (event)=> {
    event.preventDefault();
   /*
    if (email.value === null ||  password.value === null  ||  cpassword.value === null )  {
        alert('Please Enter the requied details');
        return
    }
    if (email.value === '' ||  password.value === ''  ||  cpassword.value === '' )  {
        alert('Please Enter the requied details');
        return
    }
    if (password.value !== cpassword.value) {
        alert('password Dont Match')
    } */
    let formData = new FormData(form);
    let res = await fetch(`http://localhost:4000/auth/register?name=${name.value}&email=${email.value}&phone=${phone.value}&password=${password.value}&cpassword=${cpassword.value}`, {
        method: "POST" ,
    })

    let response = await res.json() ;
    if( response.error !== undefined ) {
        return alert(response.error) ;
    }

    if (response.url !== undefined) {
        window.location.assign(response.url)        
    }
    
    // console.log(res);
    console.log(response);

})














