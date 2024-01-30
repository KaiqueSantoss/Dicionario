
const currentFont = document.querySelector('#currentFont');
const  ntrMode = document.querySelector('#ntrMode');
const  navCont = document.querySelector('#nav');
const  fontChosen  = document.querySelectorAll(".fontChosen");
const  moonIcon = document.querySelector('#moon');
const  elements= document.querySelectorAll('*');
let currentLanguage = document.querySelector("#currentLanguage")
let ntrOn = false;
let searchingWord = null;



fontChosen.forEach((item)=>{
    item.addEventListener('click',changeFont);
})
ntrMode.addEventListener('click',changeTheme);


function changeFont(font){
    
let fontNew = font.target.innerText;
let fontOld = currentFont.innerText;
currentFont.innerText = fontNew;
font.target.innerText = fontOld;

elements.forEach((element)=>{
element.style.fontFamily = fontNew
})

}


function changeTheme(i){
if(!ntrOn){
moonIcon.classList.remove('bi-sun')
i.target.classList.remove('bi-toggle-off');
i.target.classList.remove('text-black');
moonIcon.classList.add('bi-moon-stars-fill')
i.target.classList.add('text-success');
i.target.classList.add('bi-toggle-on');
navCont.setAttribute('data-bs-theme','dark')
document.body.setAttribute('data-bs-theme','dark')

ntrOn = true;
}
else if(ntrOn){
moonIcon.classList.remove('bi-moon-stars-fill')
i.target.classList.remove('text-success');
i.target.classList.remove('bi-toggle-on');
moonIcon.classList.add('bi-sun')
i.target.classList.add('text-black');
i.target.classList.add('bi-toggle-off');
navCont.removeAttribute('data-bs-theme','dark')
document.body.removeAttribute('data-bs-theme')
ntrOn = false;
}
}



