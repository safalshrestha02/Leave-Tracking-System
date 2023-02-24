const filterDropDown = document.querySelector('.filter-leaveRequests')
const pendingLeaveContainer = document.querySelector('.pending-leave-container')

const manageLeavesFunc = async () => {

    try {
        const companyLeaveRequests = await leaveRequestsUnderClient()
        const fetchLeaveRequests = () => {

            const filteredLeaveRequests = companyLeaveRequests.sort((leaves1, leaves2) => {
                const { startDate: startDate1 } = leaves1
                const { startDate: startDate2 } = leaves2
                return startDate1.slice(0, 10) > startDate2.slice(0, 10) ? -1 : startDate1.slice(0, 10) < startDate2.slice(0, 10) ? 1 : 0
            })

            if (filteredLeaveRequests.length === 0) {
                pendingLeaveContainer.innerHTML = ` <p class="no-leaves">No any Pending Leave Requests...</p>`
            }

            const filterLeavesWithType = () => {
                pendingLeaveContainer.innerHTML = ''
                const clientChoiceLeaveType = filterDropDown.value

                if (clientChoiceLeaveType === 'all') {
                    fetchLeaveRequests()
                }

                else {
                    const clientChoiceLeaves = companyLeaveRequests.filter((leaveReq) => {
                        const { typeOfLeave } = leaveReq
                        return typeOfLeave === clientChoiceLeaveType
                    })
                    fetchLeavesHtml(clientChoiceLeaves)
                }
            }
            filterDropDown.addEventListener('change', filterLeavesWithType)


            const fetchLeavesHtml = (leaveType) => {
                if (leaveType.length === 0) {
                    pendingLeaveContainer.innerHTML = ` <p class="no-leaves">No any ${filterDropDown.value} Requests...</p>`
                }

                else {
                    leaveType.forEach((leaves) => {

                        const { workerName, startDate, endDate, typeOfLeave, leaveDays, reason, approveState } = leaves
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

                        // if (approveState === 'approved') {
                        //     approveLeaveFunc()
                        // }

                        // if (approveState === 'rejected') {
                        //     rejectLeaveFunc()
                        // }
                    })
                }

            }

            if (filteredLeaveRequests.length > 0) {
                fetchLeavesHtml(filteredLeaveRequests)
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

