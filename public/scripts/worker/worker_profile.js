const dashboardWorkerName = document.querySelector(".worker-name-profile");
const dashboardCompany = document.querySelector(".emp-companyName-value");
const dashboardWorkerID = document.querySelector(".emp-id-value");
const dashboardWorkerEmail = document.querySelector(".emp-email-value");
const dashboardWorkerGender = document.querySelector(".emp-gender-value");
const dashboardWorkerCountry = document.querySelector(".emp-country-value");
const dashboardWorkerCity = document.querySelector(".emp-city-value");
const companyNameField = document.querySelector("#company-name");

const fetchWorkerProfile = async () => {
  const { fullName, workerID, email, gender, country, city, companyName } =
    await fetchActiveWorkerApi();
  dashboardWorkerName.innerHTML = fullName;
  dashboardCompany.innerHTML = companyName;
  dashboardWorkerID.innerHTML = workerID;
  dashboardWorkerEmail.innerHTML = email;
  dashboardWorkerGender.innerHTML = gender;
  dashboardWorkerCountry.innerHTML = country;
  dashboardWorkerCity.innerHTML = city;
  companyNameField.innerHTML = companyName;
};
fetchWorkerProfile();

const passwordContainer = document.querySelector(
  ".main-password-change-container"
);
const changePasswordButton = document.querySelector(".change-password-button");
const cancelButton = document.querySelector(".cancel-button");

changePasswordButton.addEventListener("click", () => {
  passwordContainer.classList.add("change-password-active");
});

cancelButton.addEventListener("click", () => {
  passwordContainer.classList.remove("change-password-active");
});

const changePasswordError = document.querySelector(".error-container");
const changePasswordForm = document.querySelector(".change-password-form");
const changePasswordFields = document.querySelectorAll(".password-inputs");

// ----------- SUBMIT NEW PASSWORD -------------- //

changePasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  changePasswordError.textContent = " ";

  const currentPassword =
    changePasswordForm.currentPassword.value.toLowerCase();
  const newPassword = changePasswordForm.newPassword.value.toLowerCase();
  const confirmPassword =
    changePasswordForm.confirmNewPassword.value.toLowerCase();

  const formData = {
    currentPassword,
    newPassword,
    confirmPassword,
  };

  try {
    const url = "http://localhost:3000/api/changeWorkerPwd";

    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.message) {
      changePasswordError.innerHTML = `<p class="error-message">${data.message}</p>`;
    }

    if (res.status === 201) {
      changePasswordFields.forEach((inputField) => {
        inputField.setAttribute("style", "border: initial");
      });

      changePasswordForm.reset();
      changePasswordError.textContent = " ";

      const successAlert = document.querySelector(".password-sucessful-alert");
      successAlert.style.display = "block";
      setTimeout(() => {
        successAlert.style.display = "none";
        window.location.replace("/logoutClient");
      }, 2500);
      passwordContainer.classList.remove("change-password-active");
    }
  } catch (error) {
    console.log(error);
  }
});
