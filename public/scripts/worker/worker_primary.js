const navTopWorkerName = document.querySelector('.worker-name')
const navTopWorkerID = document.querySelector('#id-number')
const workersApiUrl = 'http://localhost:3000/api/workers'

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const fetchWorkerApi = async () => {
    const response = await fetch(workersApiUrl)
    const result = await response.json()
    const { firstName, lastName, workerID, email, gender, country, city } = result[result.length - 1]
    const fullName = capitalize(firstName) + ' ' + capitalize(lastName)
    navTopWorkerName.innerHTML = fullName
    navTopWorkerID.innerHTML = workerID
    return { fullName, workerID, email, gender, country, city }
}
fetchWorkerApi()