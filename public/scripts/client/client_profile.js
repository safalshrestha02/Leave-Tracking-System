const dashboard = document.querySelector(".dashboard-content");
const dashboardClientName = document.querySelector(".client-name");
const dashboardClientEmail = document.querySelector(".client-email-value");
const dashboardCompanyName = document.querySelector(".client-company-value");
const dashboardCompanyAddress = document.querySelector(
  ".client-company_address-value"
);
const dashboardCompanyID = document.querySelector(".client-companyID-value");
const dashboardWorkers = document.querySelector(".client-workers-value");
const companyNameFieldProfile = document.querySelector("#company-name");

const fetchClientProfile = async () => {
  try {
    const totalWorkers = await workersUnderClient();
    const { workers } = totalWorkers;
    const { companyName, companyAddress, clientName, clientEmail, companyID } =
      await fetchActiveClientApi();
    dashboardClientName.innerHTML = clientName;
    dashboardClientEmail.innerHTML = clientEmail;
    dashboardCompanyName.innerHTML = companyName;
    companyNameFieldProfile.innerHTML = companyName;
    dashboardCompanyAddress.innerHTML = companyAddress;
    dashboardWorkers.innerHTML = workers.length;
    dashboardCompanyID.innerHTML = companyID;
  } catch (error) {
    dashboard.innerHTML = `<p class = "fetch-error">${error.message}....</p>`;
  }
};
fetchClientProfile();

// --------------------------------------- CHANGE PASSWORD ------------------------------- //

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
    const url = "http://localhost:3000/api/changeClientPwd";

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
