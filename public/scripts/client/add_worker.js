const addWorkerForm = document.querySelector("#worker-register-form");
const noPassword = document.querySelector(".fa-eye-slash")
const formcompanyName = document.querySelector(".company-name-value")
const resetButton = document.querySelector(".form-button-reset")

// ----------showing and hiding password------------------

noPassword.addEventListener("click", () => {
  console.log("gay")
  noPassword.classList.toggle("fa-eye");
  console.log(noPassword.classList[1]);

  const cPasswordShow = document.querySelector("#workerPassword");

  if (noPassword.classList[2] === "fa-eye") {
    cPasswordShow.setAttribute("type", "text");
  } else {
    cPasswordShow.setAttribute("type", "password");
  }
});



// ERROR  

const firstName_error = document.querySelector(".firstName_error")
const lastName_error = document.querySelector(".lastName_error")
const country_error = document.querySelector(".country_error")
const city_error = document.querySelector(".city_error")
const companyName_error = document.querySelector(".companyName_error")
const workerID_error = document.querySelector(".workerID_error")
const gender_error = document.querySelector(".gender_error")
const workerEmail_error = document.querySelector(".workerEmail_error")
const workerPassword_error = document.querySelector(".workerPassword_error")


// SUBMIT ACTION

addWorkerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  firstName_error.textContent = " ";
  lastName_error.textContent = " ";
  country_error.textContent = " ";
  city_error.textContent = " ";
  companyName_error.textContent = " ";
  workerID_error.textContent = " ";
  gender_error.textContent = " ";
  workerEmail_error.textContent = " ";
  workerPassword_error.textContent = " ";
  country_error.textContent = " ";



  const firstName = form.firstName.value.toLowerCase();
  const lastName = form.lastName.value.toLowerCase();
  const country = form.country.value.toLowerCase();
  const city = form.city.value.toLowerCase();
  const email = form.workerEmail.value.toLowerCase();
  const workerID = form.workerID.value;
  const gender = document.querySelector("input[name='gender']:checked").value.toLowerCase();
  const password = form.workerPassword.value;
  const companyName = form.companyName.value.toLowerCase();

  const formData = {
    firstName,
    lastName,
    gender,
    workerID,
    email,
    password,
    country,
    city,
    companyName,
  };

  try {
    const res = await fetch("http://localhost:3000/client_add_worker", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.errors) {
      inputFields.forEach((inputs) => {
        inputs.setAttribute("style", "border: initial");
      });

      console.log(data.errors)
      firstName_error.textContent = data.errors.firstName
      lastName_error.textContent = data.errors.lastName
      city_error.textContent = data.errors.city
      country_error.textContent = data.errors.country
      workerEmail_error.textContent = data.errors.email
      workerPassword_error.textContent = data.errors.password
      workerID_error.textContent = data.errors.workerID

      if (firstName_error.textContent) {
        const firstNameInput = document.getElementById("firstName")
        firstNameInput.setAttribute("style", "border: 1px solid #ff0032");
      }
      if (lastName_error.textContent) {
        const lastNameInput = document.getElementById("lastName")
        lastNameInput.setAttribute("style", "border: 1px solid #ff0032");
      }
      if (city_error.textContent) {
        const cityInput = document.getElementById("city")
        cityInput.setAttribute("style", "border: 1px solid #ff0032");
      }
      if (country_error.textContent) {
        const countryInput = document.getElementById("country")
        countryInput.setAttribute("style", "border: 1px solid #ff0032");
      }
      if (workerEmail_error.textContent) {
        const emailInput = document.getElementById("workerEmail")
        emailInput.setAttribute("style", "border: 1px solid #ff0032");
      }
      if (workerPassword_error.textContent) {
        const passwordInput = document.getElementById("workerPassword")
        passwordInput.setAttribute("style", "border: 1px solid #ff0032");
      }
      if (workerID_error.textContent) {
        const workerIDInput = document.getElementById("workerID")
        workerIDInput.setAttribute("style", "border: 1px solid #ff0032");
      }
    }

    if (res.status === 201) {

      inputFields.forEach((inputField) => {
        inputField.setAttribute("style", "border: initial");
      });

      addWorkerForm.reset()

      const successAlert = document.querySelector(".success-alert");
      successAlert.style.display = "block";
      setTimeout(() => {
        successAlert.style.display = "none";
      }, 2500)

    }

  } catch (error) {
    console.error(error);
  }
});





