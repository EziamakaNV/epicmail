const dropDown = document.getElementsByClassName('dropdown')[0];
const dropDownContent= document.getElementsByClassName('dropdown-content')[0];

dropDown.addEventListener('click',()=>{
    dropDownContent.style.display="block";
});

dropDownContent.addEventListener('click',()=>{
    dropDownContent.style.display="block";
});