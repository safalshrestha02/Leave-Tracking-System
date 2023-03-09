const chooseWorker = document.querySelector('.select-worker')
const leaveHistoryContainer = document.querySelector('.client-leave-history-container')

const upcomingLeaves = document.querySelector('.upcoming-leave-history')
const pastLeaves = document.querySelector('.past-leave-history')
const rejectedLeavesMain = document.querySelector('.rejected-leave-history')

const rejectedLeaveContainer = document.querySelector('.rejected-leave-history-container')
const upcomingLeaveContainer = document.querySelector('.upcoming-leave-history-container')
const pastLeaveContainer = document.querySelector('.past-leave-history-container')

const filterButton = document.querySelector('.filter-button')
const filterContainer = document.querySelector('.filter-container')
let fetchLeaveHistory

const filterOptions = document.querySelectorAll('.filter-options')
const approvedLeavesFilter = document.querySelector('.approved-past-leaves')
const rejectedLeavesFilter = document.querySelector('.rejected-past-leaves')
const icon = document.querySelector('.filter-icon')


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
        filterOptions.forEach((btn) => {
            btn.classList.remove("active-option")
        })
        approvedLeavesFilter.classList.add("active-option")

        upcomingLeaves.classList.remove('show-div')
        pastLeaves.classList.remove('show-div')
        rejectedLeavesMain.classList.remove('show-div')

        leaveHistoryContainer.innerHTML = '<img src = "/images/load.gif" alt = "Loading fresh data for you" class = "load-gif"/>'
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

        const userChoiceRejectedLeaves = userChoiceLeaveHistory.filter((leave) => {
            const { approveState } = leave
            return approveState == 'rejected'
        })

        const userChoiceApprovedLeaves = userChoiceLeaveHistory.filter((leave) => {
            const { approveState } = leave
            return approveState == 'approved'
        })

        const upcomingApprovedLeaves = userChoiceApprovedLeaves.filter((leave) => {
            const { endDate } = leave
            const endDateObj = new Date(endDate)

            const currentDate = new Date()
            const difference = (endDateObj - currentDate) / (1000 * 60 * 60 * 24) + 1

            return difference > 0
        })


        const pastApprovedLeaves = userChoiceApprovedLeaves.filter((leave) => {
            const { endDate } = leave
            const endDateObj = new Date(endDate)

            const currentDate = new Date()
            const difference = (endDateObj - currentDate) / (1000 * 60 * 60 * 24) + 1


            return difference < 0

        })

        // fetching leave history by mapping the data
        fetchLeaveHistory = async () => {
            upcomingLeaves.classList.remove('show-div')
            pastLeaves.classList.remove('show-div')
            rejectedLeavesMain.classList.remove('show-div')

            if (userChoiceApprovedLeaves.length == 0 && userChoiceRejectedLeaves.length > 0) {
                leaveHistoryContainer.innerHTML = '<p class = "no-past-leaves">The requested user has no any approved leaves records but has rejected leaves records.</p>'
            }

            if (upcomingApprovedLeaves.length > 0) {
                upcomingLeaves.classList.add('show-div')
                upcomingApprovedLeaves.forEach((leave) => {
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
                    upcomingLeaveContainer.innerHTML = ''
                    setTimeout(() => {
                        upcomingLeaveContainer.insertAdjacentHTML('afterbegin', ihtml)
                    })
                })
            }

            if (pastApprovedLeaves.length > 0) {
                pastLeaves.classList.add('show-div')
                pastApprovedLeaves.forEach((leave) => {
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
                    pastLeaveContainer.innerHTML = ''
                    setTimeout(() => {
                        pastLeaveContainer.insertAdjacentHTML('afterbegin', ihtml)
                    })
                })
            }
        }
        if (userChoiceLeaveHistory.length == 0) {
            checkWorkers()
            const blankArr = []
            leaveHistoryContainer.innerHTML = '<p class = "no-past-leaves">The requested user has no any leaves records.</p>'
            return blankArr
        }

        else {
            fetchLeaveHistory()
        }
    }
    chooseWorker.addEventListener('change', getLeaveHistory)
    window.addEventListener('load', getLeaveHistory)


    // filter function
    filterButton.addEventListener('click', () => {
        filterContainer.classList.toggle('filter-container-active')
        icon.classList.toggle('fa-circle-xmark')
    })

    // getting approved leaves (filter)
    approvedLeavesFilter.addEventListener('click', async () => {
        try {
            filterContainer.classList.remove('filter-container-active')
            icon.classList.remove('fa-circle-xmark')

            filterOptions.forEach((btn) => {
                btn.classList.remove("active-option")
            })
            approvedLeavesFilter.classList.add("active-option")
            fetchLeaveHistory()

        }

        catch (err) {
            leaveHistoryContainer.innerHTML = '<p class = "no-past-leaves">The requested user has no any approved leaves records.</p>'
        }

    })


    // getting rejected leaves (filter)
    rejectedLeavesFilter.addEventListener('click', async () => {
        leaveHistoryContainer.innerHTML = '<img src = "/images/load.gif" alt = "Loading fresh data for you" class = "load-gif"/>'


        filterContainer.classList.remove('filter-container-active')
        icon.classList.remove('fa-circle-xmark')

        filterOptions.forEach((btn) => {
            btn.classList.remove("active-option")
        })
        rejectedLeavesFilter.classList.add("active-option")

        upcomingLeaves.classList.remove('show-div')
        pastLeaves.classList.remove('show-div')

        const rejectedLeaves = await rejectedLeaveRequestsUnderClient()

        const sortedRejectedLeaves = rejectedLeaves.sort((leaves1, leaves2) => {
            const { startDate: startDate1 } = leaves1
            const { startDate: startDate2 } = leaves2
            return startDate1.slice(0, 10) > startDate2.slice(0, 10) ? 1 : startDate1.slice(0, 10) < startDate2.slice(0, 10) ? -1 : 0
        })

        const userChoiceWorker = chooseWorker.value
        const userChoiceRejectedLeaves = sortedRejectedLeaves.filter((leave) => {
            const { workerID } = leave
            return userChoiceWorker == workerID
        })

        if (userChoiceRejectedLeaves.length == 0) {
            leaveHistoryContainer.innerHTML = '<p class = "no-past-leaves">The requested user has no any rejected leaves records.</p>'
        }

        if (userChoiceRejectedLeaves.length > 0) {
            rejectedLeavesMain.classList.add('show-div')
            userChoiceRejectedLeaves.forEach((leave) => {
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
                rejectedLeaveContainer.innerHTML = ''
                setTimeout(() => {
                    rejectedLeaveContainer.insertAdjacentHTML('afterbegin', ihtml)
                })
            })
        }


    })

}
leaveHistory()