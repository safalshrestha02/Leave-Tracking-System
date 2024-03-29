// ------Selectiong DOM elements-------------------------

const totalNumWorkers = document.querySelector(".total-workers");
const leaveWorkers = document.querySelector(".leave-workers");
const activeWorkers = document.querySelector(".active-workers");

const workersOnLeave = document.querySelector(".active-leave-container");

// -------fetching total workers and display----------------
const fetchAllWorkers = async () => {
  const { workers: workers } = await workersUnderClient();
  totalNumWorkers.textContent = workers.length;
  activeWorkers.textContent =
    parseInt(totalNumWorkers.textContent) - parseInt(leaveWorkers.textContent);
};

// -------fetching active workers on leave and adding in dashboard--------
const fetchAllWorkersLeave = async () => {
  try {
    const companyWorkersLeave = await approvedLeaveRequestsUnderClient();
    const { workers: workers } = await workersUnderClient();

    let filteredApprovesLeaves = [];

    workers.forEach((worker) => {
      companyWorkersLeave.forEach((leavesReq) => {
        if (leavesReq.workerDetails._id === worker._id) {
          filteredApprovesLeaves.push(leavesReq);
        }
      });
    });

    // ------getting current date
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();
    currentMonth < 10
      ? (currentMonth = `0${currentMonth}`)
      : (currentMonth = currentMonth);
    currentDay < 10
      ? (currentDay = `0${currentDay}`)
      : (currentDay = currentDay);
    const fullDate = `${currentYear}${currentMonth}${currentDay}`;

    // --filtering workers based on today
    const activeLeaveWorkers = filteredApprovesLeaves.filter((worker) => {
      const startDateLeave = `${worker.startDate.slice(
        0,
        4
      )}${worker.startDate.slice(5, 7)}${worker.startDate.slice(8, 10)}`;
      const endDateLeave = `${worker.endDate.slice(0, 4)}${worker.endDate.slice(
        5,
        7
      )}${worker.endDate.slice(8, 10)}`;

      let startDateCheck = parseInt(fullDate) - parseInt(startDateLeave);
      let endDateCheck = parseInt(fullDate) - parseInt(endDateLeave);

      if (Math.sign(startDateCheck) === 1 && Math.sign(endDateCheck) === -1) {
        return worker;
      } else if (startDateLeave === fullDate) {
        return worker;
      } else if (endDateLeave === fullDate) {
        return worker;
      }
    });

    leaveWorkers.textContent = activeLeaveWorkers.length;

    if (activeLeaveWorkers.length !== 0) {
      // ---mapping filtered workers
      activeLeaveWorkers.forEach((worker) => {
        let ihtml = `
            <div class="active-leave-details">
              <div class="workerid-name-container">
                <p><i class="fa-regular fa-user user-icon"></i>
                <span class="active-leave-name capitalize-input">${
                  worker.workerName
                }</span></p>
                <p class="active-worker-id">${worker.workerID}</p>
              </div>
              
    
              <div class="active-leave-date">
                <span>${worker.startDate
                  .slice(0, 10)
                  .replaceAll("-", "/")} - ${worker.endDate
          .slice(0, 10)
          .replaceAll("-", "/")}</span> <span> ${worker.leaveDays} days</span>
              </div>
    
              <div class="active-leave-date">
                <p>${worker.typeOfLeave}</p>
                <p><i class="fa-solid fa-circle green"></i>Approved</p>
              </div>
            </div>
            `;
        workersOnLeave.innerHTML += ihtml;
      });
    } else {
      workersOnLeave.innerHTML = `<p class="display-none">No workers actively on leave<p>`;
    }
  } catch (error) {
    console.log(error);
  }
};

fetchAllWorkersLeave().then(() => fetchAllWorkers());
