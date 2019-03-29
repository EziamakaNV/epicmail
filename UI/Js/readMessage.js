/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable linebreak-style */
// eslint-disable-next-line func-names
// eslint-disable-next-line no-undef
$(document).ready(function () { // When document is ready, load inbox
  // eslint-disable-next-line no-undef
  $.get({
    url: '/api/v1/messages',
    success: (response) => {
      console.log(response);
      response.data.forEach((message) => {
        $('#messages').append(`
      <div id="${message.id}">
      <p class="From">${message.senderid}</p>
      <p class="Subject">${message.subject}</p>
      <p class="Message">${message.message}</p>
      <hr>
      </div>
      `);
      });
    },
    dataType: 'json',
  });
});
