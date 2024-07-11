/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ    */
/*  إِ*/
/*اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ  */
/* I believe in Allah and he is enough for me */


const form = document.querySelector("#upload-div");
const btn = document.getElementById('upload-btn');
const file =form.querySelector("#file");
var date, todayDate , monthDate, yearDate ;




//functions

const pdfToJSON = async (event)=> {
    event.preventDefault();
    const formData = new FormData(form);
   
    const sendResponse =  await fetch('http://localhost:4000/pdf/pdf-to-json',{ body:formData , 
        method: 'POST' });
    const response = await sendResponse.json();
    console.log(response);
    let {item ,photo , signature} = response;
    
    let nationalID = item.findIndex((element) => { return element.text === 'National ID' }) + 1 ;
    let pin = item.findIndex((element) => { return element.text === 'Pin' }) + 1 ;
    let nameBangla = item.findIndex((element) => { return element.text === 'Name(Bangla)' }) + 1 ;
    let nameEnglish = item.findIndex((element) => { return element.text === 'Name(English)' }) + 1 ;
    let dataOfBirth = item.findIndex((element) => { return element.text === 'Date of Birth' }) + 1 ;
    let birthPlace = item.findIndex((element) => { return element.text === 'Birth Place' }) + 1 ;
    let fatherName = item.findIndex((element) => { return element.text === 'Father Name' }) + 1 ;
    let motherName = item.findIndex((element) => { return element.text === 'Mother Name' }) + 1 ;
     

   document.getElementById("nid-num-inp").value = item[nationalID].text;
  document.querySelector("#name-b").value = item[nameBangla].text;
    document.getElementById("fa-name-inp").value = item[fatherName].text;
    document.getElementById("b-place-inp").value = item[birthPlace].text;
    document.getElementById("name-e-inp").value = item[nameEnglish].text;
    document.getElementById("pin-inp").value = item[pin].text;
    document.getElementById("mother-name-inp").value = item[motherName].text;
    document.getElementById("date-birth-inp").value = item[dataOfBirth].text;
    document.getElementById("given-date-inp").value = ''//`${todayDate.getDate()}-${todayDate.getMonth()}-${todayDate.getFullYear()}`;

    //changing the btn 
    btn.disabled = true;
    btn.style.background = "#0368309c";
    btn.style.cursor = "wait";

}




file.addEventListener("change", () => {
    btn.style.background = "#03a94f";
    btn.removeAttribute('disabled');
    console.log('file upload SuccessFul');
    btn.style.cursor = "pointer";
});


btn.addEventListener('click', pdfToJSON);


