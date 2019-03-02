const saveDraft = document.getElementById('save-draft');
const draftModal = document.getElementById('draft-modal');
const closeDraftModal = document.getElementById('close-draft-modal');

const send = document.getElementById('send');
const sendModal = document.getElementById('send-modal');
const closeSendModal = document.getElementById('close-send-modal');



closeSendModal.addEventListener('click', (e)=>{
    sendModal.style.display = 'none'
});

send.addEventListener('click',(e)=>{
    sendModal.style.display = "block";

});


closeDraftModal.addEventListener('click', (e)=>{
    draftModal.style.display = 'none';
});

saveDraft.addEventListener('click',(e)=>{
    draftModal.style.display = 'block';

});