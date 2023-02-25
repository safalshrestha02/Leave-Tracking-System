const navTopWorkerName = document.querySelector(".worker-name");
const navTopWorkerID = document.querySelector("#id-number");

const activeWorkerApiUrl = "http://localhost:3000/api/activeWorker"
const fetchActiveWorkerApi = async () => {
  const response = await fetch(activeWorkerApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  })
  const result = await response.json()
  const { data } = result
  const { firstName, lastName, country, city, companyName, workerID, gender, email } = data
  const fullName = `${firstName} ${lastName}`
  navTopWorkerName.innerHTML = fullName;
  navTopWorkerID.innerHTML = workerID;
  return { fullName, country, city, companyName, workerID, gender, email }
}
fetchActiveWorkerApi()
