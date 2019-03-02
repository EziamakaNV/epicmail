const deleteButtons = document.getElementsByClassName('delete');
const deleteModal = document.getElementById('delete-modal');
const closeDeleteModal = document.getElementById('close-delete-modal');

const sendButtons = document.getElementsByClassName('send');
const sendModal = document.getElementById('send-modal');
const closeSendModal = document.getElementById('close-send-modal');



closeDeleteModal.addEventListener('click', (e)=>{
    deleteModal.style.display = 'none'
});

for(let i = 0; i<deleteButtons.length; i++){
    deleteButtons[i].addEventListener('click',(e)=>{
        e.target.parentNode.parentNode.parentNode.style.display = 'none';
        deleteModal.style.display = "block";

    });
}


closeSendModal.addEventListener('click', (e)=>{
    sendModal.style.display = 'none';
});

for(let i = 0; i<sendButtons.length; i++){
    sendButtons[i].addEventListener('click',(e)=>{
        e.target.parentNode.parentNode.parentNode.style.display = 'none';
        sendModal.style.display = 'block';

    });
}