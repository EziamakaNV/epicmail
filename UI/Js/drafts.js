const deleteButtons = document.getElementsByClassName('delete');
const deleteDialog = document.getElementById('Dialog-2');
const closeDeleteDialog = document.getElementById('close-dialog-2');

const sendButtons = document.getElementsByClassName('send');
const sendDialog = document.getElementById('Dialog-1');
const closeSendDialog = document.getElementById('close-dialog-1');



closeDeleteDialog.addEventListener('click', (e)=>{
    deleteDialog.close();
});

for(let i = 0; i<deleteButtons.length; i++){
    deleteButtons[i].addEventListener('click',(e)=>{
        e.target.parentNode.parentNode.parentNode.style.display = 'none';
        deleteDialog.showModal();

    });
}


closeSendDialog.addEventListener('click', (e)=>{
    sendDialog.close();
});

for(let i = 0; i<sendButtons.length; i++){
    sendButtons[i].addEventListener('click',(e)=>{
        e.target.parentNode.parentNode.parentNode.style.display = 'none';
        sendDialog.showModal();

    });
}