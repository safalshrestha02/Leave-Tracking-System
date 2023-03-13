
const filterDropDown = document.querySelector('.filter-leaveRequests')
const pendingLeaveContainer = document.querySelector('.pending-leave-container')

const confirmModal = document.querySelector('.confirm-container')
const confirmButton = document.querySelector('.modal-confirm');
const cancelButton = document.querySelector('.modal-cancel');
const confirmStatus = document.querySelector('.status')
const workerNameField = document.querySelector('.worker-name')
const leaveTypeField = document.querySelector('.leave-type')

window.addEventListener('load', () => {
    filterDropDown.value = 'all'
})

const manageLeavesFunc = async () => {
    pendingLeaveContainer.innerHTML = '<img src = "/images/load.gif" alt = "Loading fresh data for you" class = "load-gif"/>'
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
                pendingLeaveContainer.innerHTML = ''
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
                                            <button value = "${_id}" data-name = "${workerName}" data-leavetype = "${typeOfLeave}" class="pending-leave-buttons approve-button" id="leave-approve-button">
                                                Approve
                                            </button>
                    
                                            <button value = "${_id}" data-name = "${workerName}" data-leavetype = "${typeOfLeave}" class="pending-leave-buttons reject-button" id="leave-approve-button">
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

                        const leaveID = btn.value
                        const workerName = btn.dataset.name
                        const leaveType = btn.dataset.leavetype

                        confirmModal.style.display = 'flex'
                        confirmStatus.innerHTML = 'approve'
                        confirmButton.innerHTML = 'Approve'

                        confirmButton.classList.remove('reject-button-confirm')
                        confirmButton.classList.add('approve-button-confirm')
                        cancelButton.classList.remove('cancel-button-reject')
                        cancelButton.classList.add('cancel-button-confirm')

                        workerNameField.innerHTML = `${workerName}`
                        leaveTypeField.innerHTML = `${leaveType}`

                        confirmButton.addEventListener('click', async () => {
                            filterDropDown.value = 'all'
                            pendingLeaveContainer.innerHTML = ''
                            manageLeavesFunc()
                            confirmModal.style.display = 'none'

                            const approveLeaveApiUrl = `http://localhost:3000/api/approveLeave/${leaveID}`
                            const response = await fetch(approveLeaveApiUrl, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    approveState: 'approved'
                                })
                            })
                        }, { once: true })

                        cancelButton.addEventListener('click', () => {
                            confirmModal.style.display = 'none'
                        })

                    }
                    approveButtons.forEach((btn) => {
                        btn.addEventListener('click', () => { approveLeaves(btn) })
                    })


                    // Reject leaves
                    const rejectButtons = document.querySelectorAll('.reject-button')
                    const rejectLeaves = async (btn) => {
                        const leaveID = btn.value
                        const workerName = btn.dataset.name
                        const leaveType = btn.dataset.leavetype

                        confirmModal.style.display = 'flex'
                        confirmStatus.innerHTML = 'reject'
                        confirmButton.innerHTML = 'Reject'
                        confirmButton.classList.remove('approve-button-confirm')
                        confirmButton.classList.add('reject-button-confirm')
                        cancelButton.classList.remove('cancel-button-confirm')
                        cancelButton.classList.add('cancel-button-reject')
                        workerNameField.innerHTML = `${workerName}`
                        leaveTypeField.innerHTML = `${leaveType}`

                        confirmButton.addEventListener('click', async () => {
                            filterDropDown.value = 'all'
                            pendingLeaveContainer.innerHTML = ''
                            manageLeavesFunc()
                            confirmModal.style.display = 'none'

                            const rejectLeaveApiUrl = `http://localhost:3000/api/approveLeave/${leaveID}`
                            const response = await fetch(rejectLeaveApiUrl, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    approveState: 'rejected'
                                })
                            })
                        }, { once: true })

                        cancelButton.addEventListener('click', () => {
                            confirmModal.style.display = 'none'
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
        pendingLeaveContainer.innerHTML = `<p class = "fail">Some error occured at the moment. Please try again in a while...</p>`
    }

}

manageLeavesFunc()