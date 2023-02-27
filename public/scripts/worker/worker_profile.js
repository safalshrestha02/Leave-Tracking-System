const dashboardWorkerName = document.querySelector(".worker-name-profile");
const dashboardCompany = document.querySelector('.emp-companyName-value');
const dashboardWorkerID = document.querySelector(".emp-id-value");
const dashboardWorkerEmail = document.querySelector(".emp-email-value");
const dashboardWorkerGender = document.querySelector(".emp-gender-value");
const dashboardWorkerCountry = document.querySelector(".emp-country-value");
const dashboardWorkerCity = document.querySelector(".emp-city-value");
const companyNameField = document.querySelector('#company-name')

const fetchWorkerProfile = async () => {
  const { fullName, workerID, email, gender, country, city, companyName } = await fetchActiveWorkerApi();
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
