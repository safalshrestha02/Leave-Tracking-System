// ---------------clients-login-page----------------------------

// ------selection dom elements----------------
const clientLoginEmail = document.querySelector(".client-login-email");
const clientLoginPassword = document.querySelector(".client-login-password");
const form = document.querySelector("form");

const login_error = document.querySelector(".login_error");

// ----------fetch and send data for validation------------

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const clientEmail = form.cEmail.value;
  const clientPassword = form.cPassword.value;

  login_error.textContent = " ";

  try {
    const res = await fetch("/api/clientLogin", {
      method: "POST",
      body: JSON.stringify({
        email: clientEmail,
        password: clientPassword,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.errors) {
      login_error.textContent = data.errors.email;

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
        console.log("redirection");
        location.assign("/client_home");
      }, 1000);
    }
  } catch (err) {
    console.log(err);
  }
});
