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
  console.log(1);
  const $firstName = $('#firstName').val();
  const $lastName = $('#lastName').val();
  const $userName = $('#userName').val();
  const $password = $('#password').val();
  const $confirmPassword = $('#confirmPassword').val();
  console.log(2);

  passwordsMatch($password, $confirmPassword);
  console.log(3);
  if (passwordsMatch) {
    console.log(4);
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
    console.log(5);
  } else {
    console.log('Passwords do not match');
  }


});
