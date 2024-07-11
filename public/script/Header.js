/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ    */
/*  إِ*/
/*اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ  */
/* I believe in Allah and he is enough for me */



const toggleBtn = document.querySelector('.toggle-btn');
const cencel_btn = document.querySelector('.cencel-Btn');

const bar = document.querySelector('#bar');


toggleBtn.addEventListener("click", (e) => {
  e.preventDefault();
 bar.classList.toggle("active");
});

cencel_btn.addEventListener('click', (e) => {
  e.preventDefault();
  bar.classList.toggle('active');
});




