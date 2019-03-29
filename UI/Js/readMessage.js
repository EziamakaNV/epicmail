/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable linebreak-style */
// eslint-disable-next-line func-names
// eslint-disable-next-line no-undef
$(document).ready(function () { // When document is ready, load inbox
  // eslint-disable-next-line no-undef
  $.get({
    url: '/api/v1/messages',
    success: (messages) => {
      console.log(messages);
    },
    dataType: 'json',
  });
});
