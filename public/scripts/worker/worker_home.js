// selecting dom elements
const totalLeaveDays = document.querySelector(".total-leave-days");
const leavesTaken = document.querySelector(".leaves-taken");
const leavesRemaining = document.querySelector(".leaves-remaining");

const activeLeavesContainer = document.querySelector(".active-leave-container");
const activeLeavesDetails = document.querySelector(".active-leave-details");
const pendingApprovedLeaves = document.querySelector(".pending-and-approved-container");
const pendingAndApproved = document.querySelector(".pending-and-approved");



// Leave days panel 
const fetchTotalLeaves = async () => {
    const totalLeaves = await fetchLeavesUnderWorker();
    const totalLeaveDaysNo = totalLeaves.worker.leavesYearly 
    totalLeaveDays.textContent = totalLeaveDaysNo

    let leavesTakenNo = 0

    // leaves taken 
    const leavesWithoutReject = totalLeaves.leaveHistory.filter((leave) => {
        return leave.approveState !== "rejected"
    })

    leavesWithoutReject.forEach((leave) => {
        if (leave.leaveDays) {
            leavesTakenNo += leave.leaveDays
        }    
    })

    console.log(leavesTakenNo)

    leavesTaken.textContent = leavesTakenNo

    leavesRemaining.textContent = parseInt(totalLeaveDays.textContent) - parseInt(leavesTaken.textContent);}
fetchTotalLeaves()



// setting active leaves
const activeLeavesDisplay = async () => {
    const fetchTotalLeaves = await fetchApprovedWorkerRequest();
    const totalLeaves = fetchTotalLeaves


    // ------getting current date
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();
    currentMonth < 10
    ? (currentMonth = `0${currentMonth}`)
    : (currentMonth = currentMonth);
    currentDay < 10 ? (currentDay = `0${currentDay}`) : (currentDay = currentDay);
    const fullDate = `${currentYear}${currentMonth}${currentDay}`;

    // --filtering workers based on today
    const activeLeaves = totalLeaves.filter((leave) => {
        const startDateLeave = `${leave.startDate.slice(
        0,
        4
        )}${leave.startDate.slice(5, 7)}${leave.startDate.slice(8, 10)}`;
        const endDateLeave = `${leave.endDate.slice(0, 4)}${leave.endDate.slice(5,7)}${leave.endDate.slice(8, 10)}`;

        let startDateCheck = parseInt(fullDate) - parseInt(startDateLeave);
        let endDateCheck = parseInt(fullDate) - parseInt(endDateLeave);

        if (Math.sign(startDateCheck) === 1 && Math.sign(endDateCheck) === -1) {
        return leave;
        } else if (startDateLeave === fullDate) {
        return leave;
        } else if (endDateLeave === fullDate) {
        return leave;
        }
    });

    if (activeLeaves.length !== 0) {
        activeLeaves.forEach((leave) => {
            let ihtml = `
                <p class="leave-type">${leave.typeOfLeave}</p>
                <div class="active-leave-date">
                    <span>${leave.startDate
                    .slice(0, 10)
                    .replaceAll("-", "/")} - ${leave.endDate
                      .slice(0, 10)
                      .replaceAll("-", "/")}</span> <span> ${leave.leaveDays} days</span>
                </div>
                <p class="leave-status">
                  <i class="fa-solid fa-circle green"></i>Approved
                </p>
            `
            activeLeavesDetails.innerHTML += ihtml
        })
    } else {
        // console.log("noactive")
        activeLeavesContainer.innerHTML = `
        <h2>Active Leave</h2>
        <p class="display-none">No active leave<p>
        `;
    }
}

activeLeavesDisplay();



// setting pending/future leaves
const pendingApprovedLeavesDisplay = async () => {

    pendingApprovedLeaves.innerHTML = `
    <div class="loading-class">
        <img src = "/images/load.gif" alt = "Loading fresh data for you" class = "load-gif"/>
    </div> 
    `
    const fetchTotalLeaves = await fetchLeavesUnderWorker();
    const totalLeaves = fetchTotalLeaves.leaveHistory;
    // console.log(totalLeaves)
    
    const pendingLeaves = totalLeaves.filter((pendingLeave) => {
        // console.log(pendingLeave)
        return pendingLeave.approveState === "pending"
    });

    // sorting according to start date
    const totalPendingLeaves = pendingLeaves.sort((req1, req2) => {
        const {startDate: startDate1} = req1 
        const {startDate: startDate2} = req2
        return startDate1.slice(0,10) > startDate2.slice(0,10) ? -1 : startDate1.slice(0,10) < startDate2.slice(0,10) ? 1 : 0; 
    });



    // ------------ mapping pending.approved leaves
    if (totalPendingLeaves.length !== 0) {
        pendingApprovedLeaves.innerHTML= ""
        totalPendingLeaves.forEach((leave) => {
            let ihtml = `
            <div class="worker-leaves">
                <div class="leave-type-container">
                    <p class="leave-type">${leave.typeOfLeave}</p>
                    <div class="delete-leave" id='${leave._id}'>
                        <i class="fa-solid fa-trash" onClick='handleDeleteIcon("${leave._id}")'></i>
                    </div>
                </div>
                <div class="leave-date">
                    <span>${leave.startDate
                    .slice(0, 10)
                    .replaceAll("-", "/")} - ${leave.endDate
                      .slice(0, 10)
                      .replaceAll("-", "/")}</span> <span> ${leave.leaveDays} days</span>
                </div>
                <p><i class="fa-solid fa-circle orange"></i><span class="capitalize-input">${leave.approveState}</span></p>
            </div>
            `
            pendingApprovedLeaves.innerHTML += ihtml
        })
    } else {
        pendingAndApproved.innerHTML = `
        <h2>Pending/Approved Leaves</h2>
        <p class="display-none no-pending-approved">No pending or approved leaves<p>
        `
    };

};

const handleDeleteIcon = (id) => {
    const deleteLeave = document.getElementById(`${id}`);
    deleteLeave.innerHTML = ""
    deleteLeave.innerHTML = `
    <i class="fa-regular fa-circle-xmark" onClick='handleLeaveCancel("${id}")'></i>
    <i class="fa-regular fa-circle-check" onClick='handleLeaveDelete("${id}")'></i>
    `

}

const handleLeaveCancel = (id) => {
    const deleteLeave = document.getElementById(`${id}`);
    deleteLeave.innerHTML = ""
    deleteLeave.innerHTML = `
    <i class="fa-solid fa-trash" onClick='handleDeleteIcon("${id}")'></i>
    `
}

const handleLeaveDelete = async (id) => {

    const deleteLeaveUrl = `http://localhost:3000/api/leaveRequests/${id}`
    const res = await fetch(deleteLeaveUrl,{method: "DELETE"});
    console.log(res)
    if (res.status === 201) {
        const successAlert = document.querySelector(".success-alert");
        successAlert.style.display = "block";
        setTimeout(() => {
            successAlert.style.display = "none";
        }, 2500);
        pendingApprovedLeaves.innerHTML = ""
        pendingApprovedLeavesDisplay();

        totalLeaveDays.textContent ='...'
        leavesTaken.textContent = '...'
        leavesRemaining.textContent = '...'
        fetchTotalLeaves();

    } else {
        console.log("failed to delete")
    }
}

pendingApprovedLeavesDisplay();
