const modal = document.getElementsByClassName('modal')[0];
const close = document.getElementsByClassName('close')[0];
const create = document.getElementById('create-group');

create.addEventListener('click', (e)=>{
    modal.style.display='block';
});

close.addEventListener('click', (e)=>{
    modal.style.display='none';
});


const dropDown = document.getElementsByClassName('dropdown')[0];
const dropDownContent= document.getElementsByClassName('dropdown-content')[0];

dropDown.addEventListener('click',()=>{
    dropDownContent.style.display="block";
});

dropDownContent.addEventListener('click',()=>{
    dropDownContent.style.display="block";
});