const dashboardClientName = document.querySelector('.client-name')
const dashboardClientEmail = document.querySelector('.client-email-value')
const dashboardCompanyName = document.querySelector('.client-company-value')
const dashboardCompanyAddress = document.querySelector('.client-company_address-value')
const dashboardWorkers = document.querySelector('.client-workers-value')
const dashboardClientCountry = document.querySelector('.client-country-value')
const dashboardClientCity = document.querySelector('.client-city-value')


const fetchClientProfile = async () => {
    const { companyName, companyAddress, clientName, clientEmail } = await fetchClientsApi()
    dashboardClientName.innerHTML = clientName
    dashboardClientEmail.innerHTML = clientEmail
    dashboardCompanyName.innerHTML = companyName
    dashboardCompanyAddress.innerHTML = companyAddress
    dashboardWorkers.innerHTML = 300
    dashboardClientCountry.innerHTML = 'Nepal'
    dashboardClientCity.innerHTML = 'Kathmandu'

}
fetchClientProfile()