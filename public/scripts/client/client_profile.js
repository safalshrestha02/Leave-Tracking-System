const dashboard = document.querySelector(".dashboard-content");
const dashboardClientName = document.querySelector(".client-name");
const dashboardClientEmail = document.querySelector(".client-email-value");
const dashboardCompanyName = document.querySelector(".client-company-value");
const dashboardCompanyAddress = document.querySelector(".client-company_address-value");
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
  } catch (err) {
    dashboard.innerHTML = `<p class = "fetch-error">${err.message}....</p>`;
  }
};
fetchClientProfile();

// --------------------------------------- CHANGE PASSWORD ------------------------------- //

const passwordContainer = document.querySelector(".main-password-change-container");
const changePasswordButton = document.querySelector(".change-password-button");
const cancelButton = document.querySelector(".cancel-button");

changePasswordButton.addEventListener("click", () => {
  passwordContainer.classList.add("change-password-active");
});

cancelButton.addEventListener("click", () => {
  passwordContainer.classList.remove("change-password-active");
});
