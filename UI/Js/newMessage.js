const sendDialog = document.getElementById('Dialog-1');
const draftDialog = document.getElementById('Dialog-2');
const saveDraft = document.getElementById('save-draft');
const sendMessage = document.getElementById('send');
const closeSend = document.getElementById('close-dialog-1');
const closeDraft = document.getElementById('close-dialog-2');

closeDraft.addEventListener('click',(e)=>{
    draftDialog.close();
});

closeSend.addEventListener('click',(e)=>{
    sendDialog.close();
});


saveDraft.addEventListener('click',(e)=>{
    draftDialog.showModal();
});

sendMessage.addEventListener('click',(e)=>{
    sendDialog.showModal();
});