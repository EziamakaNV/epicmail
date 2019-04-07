/* eslint-disable linebreak-style */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const $signUpButton = $('#signUpButton');

// Function definition to check if the passwords provided match
const passwordsMatch = (password1, password2) => {
  if (password1 === password2) {
    return true;
  }
  return false;
};

$signUpButton.click(function () {
  const $firstName = $('#firstName').val();
  const $lastName = $('#lastName').val();
  const $userName = $('#userName').val();
  const $password = $('#password').val();
  const $confirmPassword = $('#confirmPassword').val();

  passwordsMatch($password, $confirmPassword);
  if (passwordsMatch) {
    // Post signup data to the signup endpoint 
    $.post({
      url: '/api/v1/auth/signup',
      data: {
        firstName: $firstName,
        lastName: $lastName,
        userName: $userName,
        password: $password,
      },
      success: (data) => {
        console.log(data);
        window.location.replace('/inbox'); // on success, redirect to the inbox
      },
    });
  } else {
    console.log('Passwords do not match');
  }
});
