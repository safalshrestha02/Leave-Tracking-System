const activeClientApiUrl = 'http://localhost:3000/api/activeClient'
const fetchActiveClientApi = async () => {
    try {
        const response = await fetch(activeClientApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

            })
        })
        const result = await response.json()
        const { data } = result
        const { companyName, companyAddress, name: clientName, email: clientEmail, _id, companyID } = data
        return { companyName, companyAddress, clientName, clientEmail, _id, companyID }
    }

    catch (err) {
        console.log(err)
    }
}

// Getting the actual workers
const workersUnderClient = async () => {
    const activeClient = await fetchActiveClientApi();
    const { _id } = activeClient
    const workersResponse = await fetch(`http://localhost:3000/api/clients_workers/${_id}`)
    const workersResult = await workersResponse.json()
    return workersResult
}

const leaveRequestsApiUrl = 'http://localhost:3000/api/leaveRequests'
const fetchLeaveRequestsApi = async () => {
    const response = await fetch(leaveRequestsApiUrl)
    const leaveRequestsData = await response.json()
    return leaveRequestsData
}


// Getting the actual leave requests
const leaveRequestsUnderClient = async () => {
    const activeClient = await fetchActiveClientApi();
    const totalLeaveRequests = await fetchLeaveRequestsApi()
    const leaveRequestsClient = totalLeaveRequests.filter((leaveRequest) => {
        const { workerDetails } = leaveRequest
        return workerDetails.companyName === activeClient.companyName
    })
    return leaveRequestsClient
}
