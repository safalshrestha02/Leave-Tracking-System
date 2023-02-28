const filterDropDown = document.querySelector('.filter-leaveRequests')
const pendingLeaveContainer = document.querySelector('.pending-leave-container')

window.addEventListener('load', () => {
    filterDropDown.value = 'all'
})

const manageLeavesFunc = async () => {

    try {
        const companyPendingLeaveRequests = await pendingLeaveRequestsUnderClient()

        const fetchLeaveRequests = () => {

            if (companyPendingLeaveRequests.length === 0) {
                pendingLeaveContainer.innerHTML = ` <p class="no-leaves">No any Pending Leave Requests...</p>`
            }

            const filterLeavesWithType = () => {
                pendingLeaveContainer.innerHTML = ''
                const clientChoiceLeaveType = filterDropDown.value

                if (clientChoiceLeaveType === 'all') {
                    fetchLeaveRequests()
                }

                else {
                    const clientChoiceLeaves = companyPendingLeaveRequests.filter((leaveReq) => {
                        const { typeOfLeave } = leaveReq
                        return typeOfLeave === clientChoiceLeaveType
                    })
                    fetchLeavesHtml(clientChoiceLeaves)

                    if (pendingLeaveContainer.innerHTML == '') {
                        pendingLeaveContainer.innerHTML = ` <p class="no-leaves">No any ${filterDropDown.value} Requests...</p>`
                    }
                }
            }
            filterDropDown.addEventListener('change', filterLeavesWithType)


            const fetchLeavesHtml = (leaveType) => {
                if (leaveType.length === 0) {
                    pendingLeaveContainer.innerHTML = ` <p class="no-leaves">No any ${filterDropDown.value} Requests...</p>`
                }

                else {
                    leaveType.forEach((leaves) => {

                        const { workerName, startDate, endDate, typeOfLeave, leaveDays, reason, _id } = leaves
                        const dayOrDays = leaveDays > 1 ? 'Days' : 'Day'
                        let ihtml = `
                                <div class="pending-leave-details">
                                
                                    <i class="fa-regular fa-user user-icon"></i>
                                
                                    <span class="pending-leave-name">${workerName}</span>
                    
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
                                            <button value = ${_id} class="pending-leave-buttons approve-button">
                                                Approve
                                            </button>
                    
                                            <button value = ${_id} class="pending-leave-buttons reject-button">
                                                Reject
                                            </button>
                                        </div>
                    
                                    </div>
                    
                                </div>`

                        pendingLeaveContainer.insertAdjacentHTML('afterbegin', ihtml)
                    })

                    // Approve Leaves
                    const approveButtons = document.querySelectorAll('.approve-button')

                    const approveLeaves = async (btn) => {
                        filterDropDown.value = 'all'
                        pendingLeaveContainer.innerHTML = ''
                        manageLeavesFunc()

                        const leaveID = btn.value
                        console.log(leaveID, 'is approved')

                        const approveLeaveApiUrl = `http://localhost:3000/api/approveLeave/${leaveID}`
                        const response = await fetch(approveLeaveApiUrl, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' }
                        })
                    }
                    approveButtons.forEach((btn) => {
                        btn.addEventListener('click', () => { approveLeaves(btn) })
                    })


                    // Reject leaves
                    const rejectButtons = document.querySelectorAll('.reject-button')

                    const rejectLeaves = async (btn) => {
                        filterDropDown.value = 'all'
                        pendingLeaveContainer.innerHTML = ''
                        manageLeavesFunc()

                        const leaveID = btn.value
                        console.log(leaveID, 'is rejected')

                        const rejectLeaveApiUrl = `http://localhost:3000/api/denyLeave/${leaveID}`
                        const response = await fetch(rejectLeaveApiUrl, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' }
                        })
                    }
                    rejectButtons.forEach((btn) => {
                        btn.addEventListener('click', () => { rejectLeaves(btn) })
                    })

                }

            }

            if (companyPendingLeaveRequests.length > 0) {
                fetchLeavesHtml(companyPendingLeaveRequests)
            }
        }

        fetchLeaveRequests()

    }

    catch (err) {
        pendingLeaveContainer.innerHTML = ''
        pendingLeaveContainer.innerHTML = `<p class = "fail">Some error occured at the moment. Please try again in a while...</p>`
    }

}

manageLeavesFunc()