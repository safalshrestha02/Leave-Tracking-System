// WORK REMAINING
// * Filtering with company name to display active workers on leave




// ------Selectiong DOM elements-------------------------

const totalNumWorkers = document.querySelector(".total-workers");
const leaveWorkers = document.querySelector(".leave-workers");
const activeWorkers = document.querySelector(".active-workers");

const workersOnLeave = document.querySelector(".active-leave-container");
console.log(workersOnLeave)


// -------fetching total workers and display----------------
const fetchAllWorkers = async () => {
    const allWorkers = await fetchWorkersApi();
    totalNumWorkers.textContent = allWorkers.length
    activeWorkers.textContent = (parseInt(totalNumWorkers.textContent) - parseInt(leaveWorkers.textContent));
    // console.log(leaveWorkers)
    // console.log(workersOnLeave)
    // workersOnLeave.innerHTML = ""

    if (workersOnLeave.innerHTML === "") {
        workersOnLeave.innerHTML = "<p> No Workers on Leave. </p>"
        console.log("hello im empty")
    }

;}



// -------fetching active workers on leave and adding in dashboard--------
const fetchAllWorkersLeave = async () => {
  const allWorkersLeave = await fetchLeaveRequestsApi();

  leaveWorkers.textContent = allWorkersLeave.length;

  allWorkersLeave.forEach((worker) => {
    console.log(worker);
    let ihtml = `
        <div class="active-leave-details">
        <i class="fa-regular fa-user user-icon"></i
        ><span class="active-leave-name">${worker.employeeName}</span>

        <div class="active-leave-date">
          <span>${worker.startDate.slice(0, 10).replaceAll("-", "/")} - ${worker.endDate.slice(0, 10).replaceAll("-", "/")}</span> <span> ${worker.leaveDays} days</span>
        </div>

        <div class="active-leave-date">
          <p>${worker.typeOfLeave}</p>
          <p><i class="fa-solid fa-circle green"></i>Approved</p>
        </div>
        `;
    workersOnLeave.innerHTML += ihtml
  });
  
};

fetchAllWorkersLeave()
    .then(() => fetchAllWorkers());




