const chooseWorker = document.querySelector('.select-worker')
const leaveHistoryContainer = document.querySelector('.client-leave-history-container')
const filterButton = document.querySelector('.filter-button')
const filterContainer = document.querySelector('.filter-container')


// Checking if client have any workers or not
const checkWorkers = async () => {
    const totalWorkersResult = await workersUnderClient()
    const { workers: totalCompanyWorkers } = totalWorkersResult

    if (totalCompanyWorkers.length === 0) {
        leaveHistoryContainer.innerHTML = '<p class="empty-workers">You have no any workers. Add some to see their past leaves...</p>';
    }
}
checkWorkers()


// Our main function
const leaveHistory = async () => {

    // Fetching workers on dropdown
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


    // getting approved, rejected leaves of the worker selected by the client
    const getLeaveHistory = async () => {
        leaveHistoryContainer.innerHTML = '<p class = "loader">Loading Leave History. Please Wait...</p>'
        const approvedLeaves = await approvedLeaveRequestsUnderClient()
        const rejectedLeaves = await rejectedLeaveRequestsUnderClient()
        const approvedAndRejectedLeaves = [...approvedLeaves, ...rejectedLeaves]

        const sortedLeaveHistory = approvedAndRejectedLeaves.sort((leaves1, leaves2) => {
            const { startDate: startDate1 } = leaves1
            const { startDate: startDate2 } = leaves2
            return startDate1.slice(0, 10) > startDate2.slice(0, 10) ? 1 : startDate1.slice(0, 10) < startDate2.slice(0, 10) ? -1 : 0
        })

        const userChoiceWorker = chooseWorker.value
        const userChoiceLeaveHistory = sortedLeaveHistory.filter((leave) => {
            const { workerID } = leave
            return userChoiceWorker == workerID
        })

        const userChoiceApprovedLeaves = userChoiceLeaveHistory.filter((leave) => {
            const { approveState } = leave
            return approveState == 'approved'
        })

        const userChoiceRejectedLeaves = userChoiceLeaveHistory.filter((leave) => {
            const { approveState } = leave
            return approveState == 'rejected'
        })

        if (userChoiceLeaveHistory.length == 0) {
            const blankArr = []
            leaveHistoryContainer.innerHTML = '<p class = "no-past-leaves">The requested user has no any leaves records.</p>'
            return blankArr
        }

        else {
            fetchLeaveHistory(userChoiceApprovedLeaves)
            return { userChoiceLeaveHistory, userChoiceApprovedLeaves, userChoiceRejectedLeaves }
        }
    }
    chooseWorker.addEventListener('change', getLeaveHistory)
    window.addEventListener('load', getLeaveHistory)


    // fetching leave history by mapping the data
    const fetchLeaveHistory = async (data) => {
        data.forEach((leave) => {
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


    // filter function
    const filterButtons = document.querySelectorAll('.filter-buttons')
    const approvedLeaves = document.querySelector('.approved-past-leaves')
    const rejectedLeaves = document.querySelector('.rejected-past-leaves')
    const icon = document.querySelector('.filter-icon')

    filterButton.addEventListener('click', () => {
        filterContainer.classList.toggle('filter-container-active')
        icon.classList.toggle('fa-circle-xmark')
    })

    // getting approved leaves (filter)
    approvedLeaves.addEventListener('click', async () => {
        try {
            filterContainer.classList.remove('filter-container-active')
            icon.classList.remove('fa-circle-xmark')

            filterButtons.forEach((btn) => {
                btn.classList.remove("active-option")
            })
            approvedLeaves.classList.add("active-option")

            const allLeaves = await getLeaveHistory()

            if (allLeaves.length == 0) {
                leaveHistoryContainer.innerHTML = '<p class = "no-past-leaves">The requested user has no any leaves records.</p>'
            }

            else {
                const { userChoiceApprovedLeaves } = allLeaves
                leaveHistoryContainer.innerHTML = ''
                setTimeout(() => {
                    if (userChoiceApprovedLeaves.length > 0) {
                        fetchLeaveHistory(userChoiceApprovedLeaves)
                    }

                    else if (userChoiceApprovedLeaves.length == 0) {
                        leaveHistoryContainer.innerHTML = '<p class = "no-past-leaves">The requested user has no any approved leaves records.</p>'
                    }
                })
            }

        }

        catch (err) {
            leaveHistoryContainer.innerHTML = '<p class = "no-past-leaves">The requested user has no any leaves records.</p>'
        }

    })


    // getting rejected leaves (filter)
    rejectedLeaves.addEventListener('click', async () => {
        try {
            filterContainer.classList.remove('filter-container-active')
            icon.classList.remove('fa-circle-xmark')

            filterButtons.forEach((btn) => {
                btn.classList.remove("active-option")
            })
            rejectedLeaves.classList.add("active-option")

            const allLeaves = await getLeaveHistory()

            if (allLeaves.length == 0) {
                leaveHistoryContainer.innerHTML = '<p class = "no-past-leaves">The requested user has no any leaves records.</p>'
            }

            else {
                const { userChoiceRejectedLeaves } = allLeaves
                leaveHistoryContainer.innerHTML = ''
                setTimeout(() => {
                    if (userChoiceRejectedLeaves.length > 0) {
                        fetchLeaveHistory(userChoiceRejectedLeaves)
                    }

                    else if (userChoiceRejectedLeaves.length == 0) {
                        leaveHistoryContainer.innerHTML = '<p class = "no-past-leaves">The requested user has no any rejected leaves records.</p>'
                    }
                })
            }

        }

        catch (err) {
            leaveHistoryContainer.innerHTML = '<p class = "no-past-leaves">The requested user has no any leaves records.</p>'
        }

    })

}
leaveHistory()
