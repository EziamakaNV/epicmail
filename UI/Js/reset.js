const dialog = document.getElementById('Dialog');
const closeDialog = document.getElementById('close-dialog');
const submit = document.getElementById('submit');

submit.addEventListener('click',()=>{
    dialog.showModal();
});

closeDialog.addEventListener('click',()=>{
    dialog.close();
});
