const pendingLeaveContainer = document.querySelector('.pending-leave-container')


const manageLeavesFunc = async () => {
    try {
        const workers = await fetchWorkersApi()
        const { companyName } = await fetchClientsApi()
        const leaveRequestsData = await fetchLeaveRequestsApi()

        const companyWorkers = workers.filter((worker) => {
            const { companyName: workerCompanyName } = worker
            return workerCompanyName === companyName
        })

        const filterAndFetchLeaves = async () => {

            const companyLeaves = companyWorkers.map((data) => {
                const filteredData = leaveRequestsData.filter((leaves) => {
                    const { employeeName } = leaves
                    const { firstName, lastName } = data
                    const fullName = `${firstName} ${lastName}`
                    return fullName === employeeName
                })
                return filteredData
            })

            if (companyLeaves.length === 0) {
                pendingLeaveContainer.innerHTML = ` <p class="no-leaves">No any Pending Leave Requests...</p>`
            }

            const fetchLeaves = () => {

                companyLeaves.map((data) => {
                    const [{ employeeName, startDate, endDate, typeOfLeave, leaveDays, reason }] = data
                    let approveState = 'Pending'
                    const dayOrDays = leaveDays > 1 ? 'Days' : 'Day'
                    let ihtml = `
                    <div class="pending-leave-details">
                    
                        <i class="fa-regular fa-user user-icon"></i>
                    
                        <span class="pending-leave-name">${employeeName}</span>
        
                        <div class="pending-leave-date">
        
                            <span>${startDate.slice(0, 10).replaceAll("-", "/")} - ${endDate[0].slice(0, 10).replaceAll("-", "/")}</span>
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

                    if (approveState === 'Pending') {
                        pendingLeaveContainer.insertAdjacentHTML('afterbegin', ihtml)
                    }
                    if (approveState === 'Approved') {
                        // approveLeaveFunc()
                    }
                    if (approveState === 'Rejected') {
                        // rejectLeaveFunc()
                    }
                })
            }
            fetchLeaves()
        }
        filterAndFetchLeaves()

    }

    catch (err) {
        pendingLeaveContainer.innerHTML = ''
        pendingLeaveContainer.innerHTML = `<p class = "fail">Failed to fetch data from the api...</p>`
    }



}

manageLeavesFunc()