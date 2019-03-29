/* eslint-disable linebreak-style */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
// eslint-disable-next-line prefer-arrow-callback
const $loginButton = $('#loginButton');
$loginButton.click(function () {
/* eslint-disable linebreak-style */
/* eslint-disable func-names */
const $email = $('#emlInput').val();
const $password = $('#pwdInput').val();
console.log($email);
  $.post({
    url: '/api/v1/auth/login',
    data: {
      email: $email,
      password: $password,
    },
    success: (data) => {
      console.log(data);
      window.location.replace('/inbox'); // on success, redirect to the inbox
    },
  });
});
