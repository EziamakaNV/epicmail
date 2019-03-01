const dialog = document.getElementById('Dialog');
const close = document.getElementById('close-dialog');
const create = document.getElementById('create-contact');

create.addEventListener('click', (e)=>{
    dialog.showModal();
});

close.addEventListener('click', (e)=>{
    dialog.close('finished');
});