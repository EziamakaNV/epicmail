/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable linebreak-style */
// eslint-disable-next-line func-names
// eslint-disable-next-line no-undef
$(document).ready(function () { // When document is ready, load sent messages
  // eslint-disable-next-line no-undef
  $.get({
    url: '/api/v1/messages/sent',
    success: (response) => {
      console.log(response);
      response.data.forEach((message) => {
        $('#sent-messages').append(`
        <div id="${message.id}">
            <div class="flex-wrapper">
                <div>
                    <p class="To">${message.receiverid}</p>
                    <p class="Subject">${message.subject}</p>
                    <p class="Message">${message.message}</p>
                </div>
                <div>
                    <button>Retract Message</button>
                </div>
            </div>
            <hr>
        </div>
        `);
      });

      const buttons = document.getElementsByTagName('button');
      const modal = document.getElementsByClassName('modal')[0];
      const close = document.getElementsByClassName('close')[0];


      close.addEventListener('click', (e) => {
        modal.style.display = 'none';
      });

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', (e) => {
          e.target.parentNode.parentNode.parentNode.style.display = 'none';
          modal.style.display = 'block';
        });
      }

      const dropDown = document.getElementsByClassName('dropdown')[0];
      const dropDownContent = document.getElementsByClassName('dropdown-content')[0];

      dropDown.addEventListener('click', () => {
        dropDownContent.style.display = 'block';
      });

      dropDownContent.addEventListener('click', () => {
        dropDownContent.style.display = 'block';
      });
    },
    dataType: 'json',
  });
});
