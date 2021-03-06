/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const saveDraft = document.getElementById('save-draft');
const draftModal = document.getElementById('draft-modal');
const closeDraftModal = document.getElementById('close-draft-modal');

// const send = document.getElementById('send');
const sendModal = document.getElementById('send-modal');
const closeSendModal = document.getElementById('close-send-modal');


closeSendModal.addEventListener('click', () => {
  sendModal.style.display = 'none';
});

// send.addEventListener('click', () => {
//   sendModal.style.display = 'block';
// });

closeDraftModal.addEventListener('click', () => {
  draftModal.style.display = 'none';
});

saveDraft.addEventListener('click', () => {
  draftModal.style.display = 'block';
});


const dropDown = document.getElementsByClassName('dropdown')[0];
const dropDownContent = document.getElementsByClassName('dropdown-content')[0];

dropDown.addEventListener('click', () => {
  dropDownContent.style.display = 'block';
});

dropDownContent.addEventListener('click', () => {
  dropDownContent.style.display = 'block';
});

/*
    Interact with API
*/

const $sendButton = $('#send');

$sendButton.click(() => {
  // Define the required API parameters
  const $receiverEmail = $('#receiverEmail').val();
  const $subject = $('#subject').val();
  const $message = $('#message').val();

  if ($receiverEmail && $subject && $message) {
    $.post({
      url: '/api/v1/messages',
      data: {
        receiverEmail: $receiverEmail,
        subject: $subject,
        message: $message,
      },
      success: (data) => {
        console.log(data);
        // On success display success message
        sendModal.style.display = 'block';
      },
    });
  } else {
    console.log('missing fields');
  }
});
