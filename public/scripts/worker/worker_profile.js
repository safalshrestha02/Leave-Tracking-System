const dashboardWorkerName = document.querySelector('.worker-name-profile')
const dashboardWorkerID = document.querySelector('.emp-id-value')
const dashboardWorkerEmail = document.querySelector('.emp-email-value')
const dashboardWorkerGender = document.querySelector('.emp-gender-value')
const dashboardWorkerCountry = document.querySelector('.emp-country-value')
const dashboardWorkerCity = document.querySelector('.emp-city-value')


const fetchProfile = async () => {
    const { fullName, workerID, email, gender, country, city } = await fetchWorkerApi()
    dashboardWorkerName.innerHTML = fullName
    dashboardWorkerID.innerHTML = workerID
    dashboardWorkerEmail.innerHTML = email
    dashboardWorkerGender.innerHTML = capitalize(gender)
    dashboardWorkerCountry.innerHTML = capitalize(country)
    dashboardWorkerCity.innerHTML = capitalize(city)
}
fetchProfile()