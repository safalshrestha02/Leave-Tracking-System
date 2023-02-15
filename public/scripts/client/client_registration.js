
// ----------showing and hiding password------------------
const noPassword = document.querySelector(".fa-eye-slash");

noPassword.addEventListener("click", () => {
  noPassword.classList.toggle("fa-eye");
  console.log(noPassword.classList[1]);

  const cPasswordShow = document.querySelector(".password-register-field");

  if (noPassword.classList[2] === "fa-eye") {
    cPasswordShow.setAttribute("type", "text");
  } else {
    cPasswordShow.setAttribute("type", "password");
  }
});


// -----------------form validation-----------------------
const form = document.querySelector("form");
const companyName_error = document.querySelector(".cname_error");
const companyAddress_error = document.querySelector(".caddress_error");
const clientName_error = document.querySelector(".cNname_error");
const email_error = document.querySelector(".email_error");
const password_error = document.querySelector(".password_error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  companyName_error.textContent = " ";
  email_error.textContent = " ";
  clientName_error.textContent = " ";
  companyAddress_error.textContent = " ";
  password_error.textContent = " ";

  const companyName = form.cName.value;
  const companyAddress = form.cAddress.value;
  const clientName = form.cCName.value;
  const clientEmail = form.cEmail.value;
  const clientPassword = form.cPassword.value;

  try {
    const res = await fetch("/client_registration", {
      method: "POST",
      body: JSON.stringify({
        companyName: companyName,
        companyAddress: companyAddress,
        name: clientName,
        email: clientEmail,
        password: clientPassword
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);

    if (data.errors) {

      console.log(data.errors)

      companyName_error.textContent = data.errors.companyName;
      email_error.textContent = data.errors.email;
      password_error.textContent = data.errors.password;
      clientName_error.textContent = data.errors.name;
      companyAddress_error.textContent = data.errors.companyAddress;

      // const registerInputs = document.querySelectorAll(".register-input");

      // registerInputs.forEach((inputField) => {
      //   inputField.setAttribute("style", "border: 2px solid red");
      // });

    }
    if (data.client) {
      const successAlert = document.querySelector(".success-alert");
      successAlert.style.display = "block";

      setTimeout(()=> {
        console.log("redirection")
        location.assign("/client_login");
      }, 1000)

    }

  } catch (err) {
    console.log(err)
  }
});
