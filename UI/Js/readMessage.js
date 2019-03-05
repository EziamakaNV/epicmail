const divs = document.getElementById('messages').getElementsByTagName('div');


for(let i= 0; i < divs.length; i++){
    divs[i].addEventListener('click',(e)=>{
        document.getElementById("message-modal").style.display = "block";
    });
}


const button = document.getElementById('close-button');
button.onclick = (e)=>{
    document.getElementById("message-modal").style.display = "none";
}

const dropDown = document.getElementsByClassName('dropdown')[0];
const dropDownContent= document.getElementsByClassName('dropdown-content')[0];

dropDown.addEventListener('click',()=>{
    dropDownContent.style.display="block";
});

dropDownContent.addEventListener('click',()=>{
    dropDownContent.style.display="block";
});