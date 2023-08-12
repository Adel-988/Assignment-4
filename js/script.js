"use strict";

let signInEmail = document.querySelector("#sign-in-email");

let signInPassword = document.querySelector("#sign-in-password");

let signUpName = document.querySelector("#sign-up-name");

let signUpEmail = document.querySelector("#sign-up-email");

let signUpPassword = document.querySelector("#sign-up-password");

let signUpData;

document.querySelector("#btn-signup").addEventListener("click", function () {
  if (localStorage.getItem("signUpData") == null) {
    signUpData = [];
    if (
      nameValidation() == true &&
      emailValidation() == true &&
      passwordValidation() == true
    ) {
      let signUpInfo = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value,
      };

      signUpData.push(signUpInfo);

      localStorage.setItem("signUpData", JSON.stringify(signUpData));

      clearSignup();

      document
        .querySelector("#signup-error-span")
        .classList.replace("d-none", "d-block");

      document
        .querySelector("#signup-error-span")
        .classList.replace("text-danger", "text-success");

      document.querySelector("#signup-error-span").innerHTML =
        "Successfully signed up";
    } else if (
      signUpName.value == "" ||
      signUpEmail.value == "" ||
      signUpPassword.value == ""
    ) {
      document
        .querySelector("#signup-error-span")
        .classList.replace("d-none", "d-block");

      document
        .querySelector("#signup-error-span")
        .classList.replace("text-success", "text-danger");

      document.querySelector("#signup-error-span").innerHTML =
        "All inputs are required";
    } else if (emailValidation() == false) {
      document.querySelector("#signup-error-span").innerHTML =
        "Please enter a valid email address";
    } else if (passwordValidation() == false) {
      document
        .querySelector("#signup-error-span")
        .classList.replace("d-none", "d-block");

      document
        .querySelector("#signup-error-span")
        .classList.replace("text-success", "text-danger");

      document.querySelector("#signup-error-span").innerHTML =
        "Please enter a password combined of at least eight numbers, letters and punctuation marks (such as ! and &).";
    }
  } else {
    for (
      let i = 0;
      i < JSON.parse(localStorage.getItem("signUpData")).length;
      i++
    ) {
      if (
        signUpEmail.value ==
        JSON.parse(localStorage.getItem("signUpData"))[i].email
      ) {
        document
          .querySelector("#signup-error-span")
          .classList.replace("d-none", "d-block");

        document
          .querySelector("#signup-error-span")
          .classList.replace("text-success", "text-danger");

        document.querySelector("#signup-error-span").innerHTML =
          "This email already exists";
      }
    }
  }
});

document.querySelector("#bottom-signin").addEventListener("click", function () {
  document.querySelector("#login").classList.replace("d-none", "d-block");

  document.querySelector("#sign-up").classList.replace("d-block", "d-none");

  document
    .querySelector("#signup-error-span")
    .classList.replace("d-block", "d-none");

  clearSignup();
});

document.querySelector("#bottom-signup").addEventListener("click", function () {
  document.querySelector("#login").classList.replace("d-block", "d-none");

  document.querySelector("#sign-up").classList.replace("d-none", "d-block");

  document
    .querySelector("#login-error-span")
    .classList.replace("d-block", "d-none");

  clearSignup();
});

document.querySelector("#btn-login").addEventListener("click", function () {
  if (localStorage.getItem("signUpData") == null) {
    document.querySelector("#login").classList.replace("d-block", "d-none");

    document.querySelector("#sign-up").classList.replace("d-none", "d-block");

    document
      .querySelector("#signup-error-span")
      .classList.replace("d-none", "d-block");

    document.querySelector("#signup-error-span").innerHTML = "Sign up first";
  } else {
    for (
      let i = 0;
      i < JSON.parse(localStorage.getItem("signUpData")).length;
      i++
    ) {
      if (
        signInEmail.value ==
          JSON.parse(localStorage.getItem("signUpData"))[i].email &&
        signInPassword.value ==
          JSON.parse(localStorage.getItem("signUpData"))[i].password
      ) {
        document
          .querySelector("#welcome")
          .classList.replace("d-none", "d-block");
        document.querySelector("#login").classList.replace("d-block", "d-none");
        document.querySelector("nav").classList.replace("d-none", "d-block");
        document.querySelector("#welcome-content").innerHTML =
          "Welcome " + JSON.parse(localStorage.getItem("signUpData"))[i].name;

        clearSignin();

        document
          .querySelector("#login-error-span")
          .classList.replace("d-block", "d-none");
      } else if (signInEmail.value == "" && signInPassword.value == "") {
        document
          .querySelector("#login-error-span")
          .classList.replace("d-none", "d-block");

        document.querySelector("#login-error-span").innerHTML =
          "All inputs are required";
      } else {
        document
          .querySelector("#login-error-span")
          .classList.replace("d-none", "d-block");

        document.querySelector("#login-error-span").innerHTML =
          "Invalid username or password";
      }
    }
  }
});

document.querySelector("#log-out").addEventListener("click", function () {
  document.querySelector("#welcome").classList.replace("d-block", "d-none");
  document.querySelector("#login").classList.replace("d-none", "d-block");
  document.querySelector("nav").classList.replace("d-block", "d-none");
});

function clearSignup() {
  signUpName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
}

function clearSignin() {
  signInEmail.value = "";
  signInPassword.value = "";
}

function nameValidation() {
  let regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  if (regex.test(signUpName.value) == true) {
    return true;
  } else {
    return false;
  }
}

function emailValidation() {
  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (regex.test(signUpEmail.value) == true) {
    return true;
  } else {
    return false;
  }
}

function passwordValidation() {
  let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (regex.test(signUpPassword.value) == true) {
    return true;
  } else {
    return false;
  }
}
