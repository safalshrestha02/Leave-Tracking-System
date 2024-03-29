// ---------------------workers-login-page--------------

// -------selecting dom elements--------------
const workerLoginWorkerID = document.querySelector(".worker-login-workerID");
const workerLoginPassword = document.querySelector(".worker-login-password");
const loginForm = document.querySelector(".login-form");
const login_error = document.querySelector(".login_error");

// -----------sending data-----------
const loginInputs = document.querySelectorAll(".login-input-field");

loginInputs.forEach((inputField) => {
  inputField.addEventListener("input", () => {
    inputField.setAttribute("style", "border: 2px solid initial");
    login_error.textContent = " ";
  })
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const workerID = loginForm.cWorkerID.value;
  const workerPassword = loginForm.cPassword.value;

  login_error.textContent = " ";

  try {
    const response = await fetch("/api/workerLogin", {
      method: "POST",
      body: JSON.stringify({
        workerID: workerID,
        password: workerPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.errors) {
      login_error.textContent = data.errors.workerID;

      if (login_error.textContent) {
        const loginInputs = document.querySelectorAll(".login-input-field");
        loginInputs.forEach((inputField) => {
          inputField.setAttribute("style", "border: 2px solid red");
        });
      }
    } else {
      const loginInputs = document.querySelectorAll(".login-input-field");

      loginInputs.forEach((inputField) => {
        inputField.setAttribute("style", "border: 2px solid #03c988");
      });

      const successAlert = document.querySelector(".success-alert");
      successAlert.style.display = "block";

      setTimeout(() => {
        successAlert.style.display = "none";
        location.assign("/worker_home");
      }, 1000);
    }
  } catch (err) {

  }
});
