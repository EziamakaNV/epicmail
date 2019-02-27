const divs = document.getElementById('messages').getElementsByTagName('div');


for(let i= 0; i < divs.length; i++){
    divs[i].addEventListener('click',showMessage)
}


function showMessage(e){
    document.getElementById("message-modal").style.display = "block";
    console.log('yeah');
}

const button = document.getElementById('close-button');
button.onclick = (e)=>{
    document.getElementById("message-modal").style.display = "none";
}