const dashboard = document.querySelector(".dashboard-content");
const dashboardClientName = document.querySelector(".client-name");
const dashboardClientEmail = document.querySelector(".client-email-value");
const dashboardCompanyName = document.querySelector(".client-company-value");
const dashboardCompanyAddress = document.querySelector(".client-company_address-value");
const dashboardCompanyID = document.querySelector(".client-companyID-value");
const dashboardWorkers = document.querySelector(".client-workers-value");
const companyNameFieldProfile = document.querySelector('#company-name');


const fetchClientProfile = async () => {
  try {
    const totalWorkers = await workersUnderClient()
    const { companyName, companyAddress, clientName, clientEmail, companyID } = await fetchActiveClientApi();
    dashboardClientName.innerHTML = clientName;
    dashboardClientEmail.innerHTML = clientEmail;
    dashboardCompanyName.innerHTML = companyName;
    companyNameFieldProfile.innerHTML = companyName;
    dashboardCompanyAddress.innerHTML = companyAddress;
    dashboardWorkers.innerHTML = totalWorkers.length;
    dashboardCompanyID.innerHTML = companyID;
  } catch (err) {
    dashboard.innerHTML = `<p class = "fetch-error">${err.message}....</p>`;
  }
};
fetchClientProfile();
