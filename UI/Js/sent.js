const buttons = document.getElementsByTagName('button');
const dialog = document.getElementById('Dialog');
const close = document.getElementById('close-dialog');


close.addEventListener('click', (e)=>{
    dialog.close('finished');
});

for(let i = 0; i<buttons.length; i++){
    buttons[i].addEventListener('click',(e)=>{
        e.target.parentNode.parentNode.parentNode.style.display = 'none';
        dialog.showModal();

    });
}

