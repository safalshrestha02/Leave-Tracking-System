const clientsApiUrl = 'http://localhost:3000/api/clients'
const fetchClientsApi = async () => {
    const response = await fetch(clientsApiUrl)
    const result = await response.json()
    const { companyName, companyAddress, name: clientName, email: clientEmail } = result[0]
    return { companyName, companyAddress, clientName, clientEmail }
}


const workersApiUrl = 'http://localhost:3000/api/workers'
const fetchWorkersApi = async () => {
    const response = await fetch(workersApiUrl)
    const workersData = await response.json()
    return workersData
}


const leaveRequestsApiUrl = 'http://localhost:3000/api/leaveRequests'
const fetchLeaveRequestsApi = async () => {
    const response = await fetch(leaveRequestsApiUrl)
    const leaveRequestsData = await response.json()
    return leaveRequestsData
}