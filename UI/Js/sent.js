const buttons = document.getElementsByTagName('button');
const modal = document.getElementsByClassName('modal')[0];
const close = document.getElementsByClassName('close')[0];


close.addEventListener('click', (e)=>{
    modal.style.display='none'
});

for(let i = 0; i<buttons.length; i++){
    buttons[i].addEventListener('click',(e)=>{
        e.target.parentNode.parentNode.parentNode.style.display = 'none';
        modal.style.display = 'block';

    });
}

