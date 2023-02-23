const clientsApiUrl = 'http://localhost:3000/api/clients'
const fetchClientsApi = async () => {
    try {
        const response = await fetch(clientsApiUrl)
        const result = await response.json()
        console.log(result)
        const { companyName, companyAddress, name: clientName, email: clientEmail, _id, companyID } = result[0]
        return { companyName, companyAddress, clientName, clientEmail, _id, companyID }
    }

    catch (err) {
        console.log(err)
    }
}


const workersApiUrl = 'http://localhost:3000/api/workers'
const fetchWorkersApi = async () => {
    try {
        const response = await fetch(workersApiUrl)
        const workersData = await response.json()
        return workersData
    }

    catch (err) {
        console.log(err.message)
    }
}


const leaveRequestsApiUrl = 'http://localhost:3000/api/leaveRequests'
const fetchLeaveRequestsApi = async () => {
    const response = await fetch(leaveRequestsApiUrl)
    const leaveRequestsData = await response.json()
    return leaveRequestsData

}


// Getting the actual workers
const workersUnderClient = async () => {
    const activeClient = await fetchClientsApi();
    const totalWorkers = await fetchWorkersApi();
    const workersClient = totalWorkers.filter((worker) => {
        return worker.companyName === activeClient.companyName;
    })
    return workersClient;
}


// Getting the actual leave requests
const leaveRequestsUnderClient = async () => {
    const activeClient = await fetchClientsApi();
    const totalLeaveRequests = await fetchLeaveRequestsApi()
    const leaveRequestsClient = totalLeaveRequests.filter((leaveRequest) => {
        const { workerDetails } = leaveRequest
        return workerDetails.companyName === activeClient.companyName
    })
    return leaveRequestsClient
}
