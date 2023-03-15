const activeClientApiUrl = 'http://localhost:3000/api/activeClient'
const fetchActiveClientApi = async () => {
    try {
        const response = await fetch(activeClientApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        })
        const result = await response.json()
        const { data } = result
        const { companyName, companyAddress, name: clientName, email: clientEmail, _id, companyID, leavesYearly } = data

        if (companyID != null) {
            workerIDinput.addEventListener("input", () => {
                idDetails.innerHTML = ""

                let idetailsHTML = `(Your worker ID will be <p id="mesh-id"> ${companyID}-${workerIDinput.value}</p>)`
                idDetails.innerHTML += idetailsHTML

                if (workerIDinput.value == "") {
                    idDetails.innerHTML = ""
                }
            })
        }

        return { companyName, companyAddress, clientName, clientEmail, _id, companyID, leavesYearly }
    }

    catch (err) {
        console.log(err)
    }
}

// Getting the workers under client
const workersUnderClient = async () => {
    const activeClient = await fetchActiveClientApi();
    const { _id } = activeClient
    const workersResponse = await fetch(`http://localhost:3000/api/clients_workers/${_id}`)
    const workersResult = await workersResponse.json()
    return workersResult
}

// Getting the leave requests under client
const leaveRequestsUnderClient = async () => {
    const activeClient = await fetchActiveClientApi();
    const { _id } = activeClient
    const leavesResponse = await fetch(`http://localhost:3000/api/clientsManageHistory/${_id}/?typeOfLeave=All`)
    const leavesResult = await leavesResponse.json()
    const { Leaves } = leavesResult

    const sortedLeaveRequests = Leaves.sort((leaves1, leaves2) => {
        const { startDate: startDate1 } = leaves1
        const { startDate: startDate2 } = leaves2
        return startDate1.slice(0, 10) > startDate2.slice(0, 10) ? -1 : startDate1.slice(0, 10) < startDate2.slice(0, 10) ? 1 : 0
    })
    return sortedLeaveRequests
}


// Getting the pending leave requests
const pendingLeaveRequestsUnderClient = async () => {
    const leaves = await leaveRequestsUnderClient()
    const pendingLeaves = leaves.filter((leave) => {
        const { approveState } = leave
        return approveState === 'pending'
    })
    return pendingLeaves
}


// Getting the approved leave requests
const approvedLeaveRequestsUnderClient = async () => {
    const leaves = await leaveRequestsUnderClient()
    const approvedLeaves = leaves.filter((leave) => {
        const { approveState } = leave
        return approveState === 'approved'
    })
    return approvedLeaves
}


// Getting the rejected leave requests
const rejectedLeaveRequestsUnderClient = async () => {
    const leaves = await leaveRequestsUnderClient()
    const rejectedLeaves = leaves.filter((leave) => {
        const { approveState } = leave
        return approveState === 'rejected'
    })
    return rejectedLeaves
}

const workerIDinput = document.querySelector("#workerID")
const idDetails = document.querySelector(".id-details")

const deleteExpiredUnapprovedLeavesClient = async () => {
    try{
        const activeClient = await fetchActiveClientApi();
        const { _id } = activeClient
        const expiredUnapprovedLeavesUrl= `http://localhost:3000/api/clientExpireUnapproved/${_id}`
        const req = await fetch(expiredUnapprovedLeavesUrl, {method: "PATCH"})
    } catch (error) {
        console.log(error.message)
    }
}

deleteExpiredUnapprovedLeavesClient()