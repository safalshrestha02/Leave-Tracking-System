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
  


  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const country = form.country.value;
  const city = form.city.value;
  const email = form.workerEmail.value;
  const workerID = form.workerID.value;
  const gender = document.querySelector("input[name='gender']:checked").value;
  const password = form.workerPassword.value;
  const companyName = form.companyName.value;

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
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    if(data.errors){
      console.log(data.errors,"shardul")
    }

  } catch (error) {
    console.error(error);
  }
});





