const pendingLeaveContainer = document.querySelector('.pending-leave-container')


const manageLeavesFunc = async () => {

    try {

        // getting actual workers of the company
        const workers = await fetchWorkersApi()
        const { companyName } = await fetchClientsApi()
        const leaveRequestsData = await fetchLeaveRequestsApi()


        const companyWorkers = workers.filter((worker) => {
            const { companyName: workerCompanyName } = worker
            return workerCompanyName.toLowerCase() === companyName.toLowerCase()
        })


        const filterAndFetchLeaves = () => {
            const a = companyWorkers.map((worker) => {

                // getting actual leave requests
                const companyLeaveRequests = leaveRequestsData.filter((request) => {
                    const { employeeName } = request
                    const { firstName, lastName } = worker
                    const fullName = `${firstName} ${lastName}`.toLowerCase()
                    return fullName == employeeName.toLowerCase()
                })
                // console.table(companyLeaveRequests)
                // console.log(companyLeaveRequests.length)

                const fetchLeaves = () => {
                    companyLeaveRequests.map((leaves) => {

                        const { employeeName, startDate, endDate, typeOfLeave, leaveDays, reason, approveState } = leaves
                        const dayOrDays = leaveDays > 1 ? 'Days' : 'Day'
                        let ihtml = `
                        <div class="pending-leave-details">
                        
                            <i class="fa-regular fa-user user-icon"></i>
                        
                            <span class="pending-leave-name">${employeeName}</span>
            
                            <div class="pending-leave-date">
            
                                <span>${startDate.slice(0, 10).replaceAll("-", "/")} - ${endDate.slice(0, 10).replaceAll("-", "/")}</span>
                                <span>${leaveDays} ${dayOrDays}</span>
                            
                            </div>
            
                            <div class="description">
            
                                <h1>Reason:</h1>
            
                                <p class="description-details">
                                    ${reason}
                                </p>
            
                            </div>
            
                            <div class="pending-leave-type-status">
            
                                <p>${typeOfLeave}</p>
            
                                <div class="buttons-container">
                                    <button class="pending-leave-buttons approve-button">
                                        Approve
                                    </button>
            
                                    <button class="pending-leave-buttons reject-button">
                                        Reject
                                    </button>
                                </div>
            
                            </div>
            
                        </div>`

                        if (approveState === 'pending') {
                            pendingLeaveContainer.insertAdjacentHTML('afterbegin', ihtml)
                        }

                        if (approveState === 'approved') {
                            // approveLeaveFunc()
                        }

                        if (approveState === 'rejected') {
                            // rejectLeaveFunc()
                        }
                    })

                }
                fetchLeaves()
                return companyLeaveRequests
            })
            if (a.length == 0) {
                pendingLeaveContainer.innerHTML = ` <p class="no-leaves">No any Pending Leave Requests...</p>`
            }
        }
        filterAndFetchLeaves()

    }

    catch (err) {
        pendingLeaveContainer.innerHTML = ''
        pendingLeaveContainer.innerHTML = `<p class = "fail">Failed to fetch data from the api...</p>`
    }

}

manageLeavesFunc()