const pendingLeaveContainer = document.querySelector('.pending-leave-container')


const fetchLeaveRequests = async () => {
    const leaveRequestsData = await fetchLeaveRequestsApi()
    leaveRequestsData.map((data) => {
        const { employeeName, startDate, endDate, typeOfLeave, leaveDays, reason } = data
        let approveState = 'Pending'
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

            </div>
        `
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

fetchLeaveRequests()