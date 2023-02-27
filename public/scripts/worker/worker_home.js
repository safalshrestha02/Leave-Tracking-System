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
    console.log(totalLeaves)
    leavesTaken.textContent = totalLeaves.leaveHistory.length
    leavesRemaining.textContent = parseInt(totalLeaveDays.textContent) - parseInt(leavesTaken.textContent);}
fetchTotalLeaves()



// setting ative leaves
const activeLeavesDisplay = async () => {
    const fetchTotalLeaves = await fetchLeavesUnderWorker();
    const totalLeaves = fetchTotalLeaves.leaveHistory;

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
    const fetchTotalLeaves = await fetchLeavesUnderWorker();
    const totalLeaves = fetchTotalLeaves.leaveHistory;
    // console.log(totalLeaves)
    
    const pendingLeaves = totalLeaves.filter((pendingLeave) => {
        // console.log(pendingLeave)
        return pendingLeave.approveState === "pending"
    });
    
    const approvedLeaves = totalLeaves.filter((approvedLeave) => {
        return approvedLeave.approveState === "approved"
    });

    // sorting according to start date
    const totalPendingLeaves = pendingLeaves.sort((req1, req2) => {
        const {startDate: startDate1} = req1 
        const {startDate: startDate2} = req2
        return startDate1.slice(0,10) > startDate2.slice(0,10) ? -1 : startDate1.slice(0,10) < startDate2.slice(0,10) ? 1 : 0; 
    });
    const totalApprovedLeaves = approvedLeaves.sort((req1, req2) => {
        const {startDate: startDate1} = req1 
        const {startDate: startDate2} = req2
        return startDate1.slice(0,10) > startDate2.slice(0,10) ? -1 : startDate1.slice(0,10) < startDate2.slice(0,10) ? 1 : 0; 
    });

    const totalPendingApprovedLeaves = [...totalPendingLeaves,...totalApprovedLeaves];


    // ------------ mapping pending.approved leaves
    if (totalPendingApprovedLeaves !== 0) {
        totalPendingApprovedLeaves.forEach((leave) => {
            let ihtml = `
            <div class="worker-leaves">
                <p class="leave-type">${leave.typeOfLeave}</p>
                <div class="leave-date">
                    <span>${leave.startDate
                    .slice(0, 10)
                    .replaceAll("-", "/")} - ${leave.endDate
                      .slice(0, 10)
                      .replaceAll("-", "/")}</span> <span> ${leave.leaveDays} days</span>
                </div>
                <p><i class="fa-solid fa-circle orange"></i>${leave.approveState}</p>
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

pendingApprovedLeavesDisplay();
