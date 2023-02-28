const chooseWorker = document.querySelector('.select-worker')
const leaveHistoryContainer = document.querySelector('.client-leave-history-container')
const options = document.querySelector('.client-leave-history--options')


const checkWorkers = async () => {
    const totalWorkersResult = await workersUnderClient()
    const { workers: totalCompanyWorkers } = totalWorkersResult

    if (totalCompanyWorkers.length === 0) {
        options.innerHTML = ''
        leaveHistoryContainer.innerHTML = '<p class="empty-workers">You have no any workers. Add some to see their past leaves...</p>';
    }
}
checkWorkers()


const leaveHistory = async () => {

    const fetchWorkersDropdown = async () => {
        const workersResult = await workersUnderClient()
        const { workers: companyWorkers } = workersResult

        companyWorkers.forEach((worker) => {
            const { firstName, lastName, workerID } = worker
            const fullName = `${capitalize(firstName)} ${capitalize(lastName)}`
            let ihtml = `
            <option value="${workerID}">${fullName}</option>
            `
            chooseWorker.innerHTML += ihtml
        })
    }
    fetchWorkersDropdown()


    const getPastLeaves = async () => {
        leaveHistoryContainer.innerHTML = '<p class = "loader">Loading Past Leaves. Please Wait...</p>'
        const approvedLeaves = await approvedLeaveRequestsUnderClient()
        const rejectedLeaves = await rejectedLeaveRequestsUnderClient()
        const pastLeaves = [...approvedLeaves, ...rejectedLeaves]

        const sortedPastLeaveRequests = pastLeaves.sort((leaves1, leaves2) => {
            const { startDate: startDate1 } = leaves1
            const { startDate: startDate2 } = leaves2
            return startDate1.slice(0, 10) > startDate2.slice(0, 10) ? 1 : startDate1.slice(0, 10) < startDate2.slice(0, 10) ? -1 : 0
        })

        const userChoiceWorker = chooseWorker.value
        const specificPastLeaves = sortedPastLeaveRequests.filter((leave) => {
            const { workerID } = leave
            return userChoiceWorker == workerID
        })
        fetchPastLeaves(specificPastLeaves)
    }
    chooseWorker.addEventListener('change', getPastLeaves)
    window.addEventListener('load', getPastLeaves)


    const fetchPastLeaves = async (specificPastLeaves) => {
        specificPastLeaves.forEach((leave) => {
            const { typeOfLeave, startDate, endDate, leaveDays, approveState } = leave
            const dayOrDays = leaveDays > 1 ? 'Days' : 'Day'

            let ihtml = `
                <div class="client-leave-history-details">

                    <p class="client-leave-history-leave-type">${typeOfLeave}</p>
                
                    <div class="client-leave-history-leave-date">
                        <span>${startDate.slice(0, 10).replaceAll("-", "/")} - ${endDate.slice(0, 10).replaceAll("-", "/")}</span>
                        <span> ${leaveDays} ${dayOrDays}</span>
                    </div>
                
                    <div class="client-leave-history-leave-status">
                        <p>
                            <i class="fa-solid fa-circle ${approveState}-leave"></i>
                            ${capitalize(approveState)}
                        </p>
                    </div>

                </div>
                        `
            leaveHistoryContainer.innerHTML = ''
            setTimeout(() => {
                leaveHistoryContainer.insertAdjacentHTML('afterbegin', ihtml)
            })
        })
    }


}
leaveHistory()
