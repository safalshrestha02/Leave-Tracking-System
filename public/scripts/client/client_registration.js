//----------------selectiong dom elements------------------
const form = document.querySelector("form");

const companyName_error = document.querySelector(".cname_error");
const companyAddress_error = document.querySelector(".caddress_error");
const clientName_error = document.querySelector(".cNname_error");
const email_error = document.querySelector(".email_error");
const password_error = document.querySelector(".password_error");

const noPassword = document.querySelector(".fa-eye-slash");



// ----------showing and hiding password------------------

noPassword.addEventListener("click", () => {
  noPassword.classList.toggle("fa-eye");

  const cPasswordShow = document.querySelector(".password-register-field");

  if (noPassword.classList[2] === "fa-eye") {
    cPasswordShow.setAttribute("type", "text");
  } else {
    cPasswordShow.setAttribute("type", "password");
  }
});


// ===========form validation====================================

//-------------------- form event listener

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

  const formData = {
    companyName: companyName,
    companyAddress: companyAddress,
    name: clientName,
    email: clientEmail,
    password: clientPassword
  }

  try {
    const res2= await submitFormData(formData);
    console.log(res2)
    const data = await res2.json();

    // const res = await fetch("http://localhost:3000/client_registration", {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    //   headers: { "Content-Type": "application/json" },
    // });
    // const data = await res.json()

    // ---------------handling errors---------
    if (data.errors) {

      const registerInputs = document.querySelectorAll(".register-input");

      registerInputs.forEach((inputField) => {
        inputField.setAttribute("style", "border: 2px solid #03c988");
      });

      companyName_error.textContent = data.errors.companyName;
      email_error.textContent = data.errors.email;
      password_error.textContent = data.errors.password;
      clientName_error.textContent = data.errors.name;
      companyAddress_error.textContent = data.errors.companyAddress;

      if (companyName_error.textContent) {
        const companyNameInput = document.querySelector("#cName");
        companyNameInput.setAttribute("style", "border: 2px solid red");
      }
      if (email_error.textContent) {
        const emailInput = document.querySelector("#cEmail");
        emailInput.setAttribute("style", "border: 2px solid red");
      }
      if (password_error.textContent ) {
        const passwordInput = document.querySelector("#cPassword");
        passwordInput.setAttribute("style", "border: 2px solid red");
      }
      if (clientName_error.textContent) {
        const clientNameInput = document.querySelector("#cCName");
        clientNameInput.setAttribute("style", "border: 2px solid red");
      }
      if (companyAddress_error.textContent) {
        const companyAddressInput = document.querySelector("#cAddress");
        companyAddressInput.setAttribute("style", "border: 2px solid red");
      }

    }

    if (res.status === 201) {
      const registerInputs = document.querySelectorAll(".register-input");

      registerInputs.forEach((inputField) => {
        inputField.setAttribute("style", "border: 2px solid #03c988");
      });

      const successAlert = document.querySelector(".success-alert");
      successAlert.style.display = "block";

      setTimeout(()=> {
        location.assign("http://localhost:3000/client_login");
      }, 1000)

    }

  } catch (err) {
    console.log(err)
  }
});


// ---submitting form data--------

const submitFormData = async (formData) => {
  const res = await fetch("http://localhost:3000/client_registration", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

