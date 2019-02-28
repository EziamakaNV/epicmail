const buttons = document.getElementsByTagName('button');

for(let i = 0; i<buttons.length; i++){
    buttons[i].addEventListener('click',(e)=>{
        e.target.parentNode.parentNode.parentNode.style.display = 'none';
    });
}

