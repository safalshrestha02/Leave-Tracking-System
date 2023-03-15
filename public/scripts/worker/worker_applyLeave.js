//----------------selecting dom elements
const form = document.querySelector(".form-container");

const empNameField = document.querySelector(".employee-name-field");
const empIDField = document.querySelector(".employee-id-field");

const startDateField = document.querySelector("#start-date");
const endDateField = document.querySelector("#end-date");
const leaveDaysField = document.querySelector("#days-number");
const startDateErrorMessage = document.querySelector('.start-date-error-div')
const endDateErrorMessage = document.querySelector('.end-date-error-div')

const leaveTypeField = document.querySelector(".type-of-leave");
const reasonField = document.querySelector(".reason-of-leave");

// ------------------------------------------------------------------

const fetchEmpNameAndID = async () => {
  const { fullName, workerID } = await fetchActiveWorkerApi();
  empNameField.value = fullName;
  empIDField.value = workerID;
};
fetchEmpNameAndID();

// <========== Generating Leave Days ==========>

const disablePastDate = () => {
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;
  let currentDay = currentDate.getDate();
  currentMonth < 10
    ? (currentMonth = `0${currentMonth}`)
    : (currentMonth = currentMonth);
  currentDay < 10 ? (currentDay = `0${currentDay}`) : (currentDay = currentDay);
  const currentFullDate = `${currentYear}-${currentMonth}-${currentDay + 1}`;
  startDateField.setAttribute("min", currentFullDate);
  endDateField.setAttribute("min", currentFullDate);
}
disablePastDate()

const validateForm = async () => {
  const leavesResult = await fetchLeavesUnderWorker()
  const filteredLeaves = leavesResult.filter((leave) => {
    const { approveState } = leave
    return approveState === 'pending' || approveState === 'approved'
  })

  if (startDateField.value) {
    startDateErrorMessage.innerHTML = ''
    leaveTypeField.value = 'Sick Leave'

    const generateLeaveDays = async () => {
      endDateField.removeAttribute("min");
      endDateField.setAttribute("min", startDateField.value);

      const userInputStartDate = startDateField.value;
      const userInputEndDate = endDateField.value;

      const userInputStartDateObj = new Date(userInputStartDate);
      const userInputEndDateObj = new Date(userInputEndDate);

      const leaveDays = (userInputEndDateObj - userInputStartDateObj) / (1000 * 60 * 60 * 24) + 1;
      if (leaveDays > 0) {
        leaveDaysField.value = leaveDays;
        leaveDaysField.style.border = "none";
      }

      else {
        endDateField.value = startDateField.value;
        generateLeaveDays();
      }

      const leavesYearly = await fetchLeavesYearly()
      const leavesTakenNo = filteredLeaves.length
      const leavesRemaining = parseInt(leavesYearly) - parseInt(leavesTakenNo);

      if (leaveDays > leavesRemaining) {
        leaveDaysField.value = `Applying for: ${leaveDays}   Remaining Leaves: ${leavesRemaining}`;
        leaveDaysField.style.border = "1px solid red";
      }
    }
    generateLeaveDays()
  }




  const checkLeaveRequests = async () => {
    const takenLeaves = []
    const selectedLeaves = []

    const checkSelectedLeaves = () => {
      const selectedStartDate = new Date(startDateField.value)
      const selectedEndDate = new Date(endDateField.value)
      for (let date = new Date(selectedStartDate); date <= selectedEndDate; date.setDate(date.getDate() + 1)) {
        const selectedLeavesObj = new Date(date)
        let year = selectedLeavesObj.getFullYear();
        let month = selectedLeavesObj.getMonth() + 1;
        let day = selectedLeavesObj.getDate();

        month < 10
          ? (month = `0${month}`)
          : (month = month);
        day < 10 ? (day = `0${day}`) : (day = day);

        const selectedLeavesFullDate = `${year}-${month}-${day}`;
        selectedLeaves.push(selectedLeavesFullDate)
      }
    }
    checkSelectedLeaves()

    if (filteredLeaves.length > 0) {
      filteredLeaves.forEach((leave) => {
        const startDateObj = new Date(leave.startDate)
        const endDateObj = new Date(leave.endDate)

        for (let date = new Date(startDateObj); date <= endDateObj; date.setDate(date.getDate() + 1)) {
          const takenLeavesObj = new Date(date)
          let year = takenLeavesObj.getFullYear();
          let month = takenLeavesObj.getMonth() + 1;
          let day = takenLeavesObj.getDate();

          month < 10
            ? (month = `0${month}`)
            : (month = month);
          day < 10 ? (day = `0${day}`) : (day = day);

          const leavesTakenFullDate = `${year}-${month}-${day}`;
          takenLeaves.push(leavesTakenFullDate)
        }
      })

      const disableDate = () => {
        selectedLeaves.forEach((selectedLeave) => {
          takenLeaves.forEach((takenLeave) => {
            if (selectedLeave == takenLeave) {
              leaveDaysField.value = '-'
              leaveTypeField.value = ''
              reasonField.value = ''
              startDateErrorMessage.classList.remove('eligible-leave')
              startDateErrorMessage.innerHTML = `*Try again!!! You have already taken leave between selected days.`
            }
          })
        })
      }
      disableDate()
    }
  }
  checkLeaveRequests()

}

startDateField.addEventListener("change", validateForm);
endDateField.addEventListener("change", validateForm);


// <=============================================>

// --------------fetch and send leave request----------------

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  startDateErrorMessage.innerHTML = ''
  // ------------------getting input values

  const workerName = empNameField.value;
  const workerID = empIDField.value;
  const startDate = startDateField.value;
  const endDate = endDateField.value;
  const leaveDays = leaveDaysField.value;
  const reason = reasonField.value;

  // getting leave type value
  let typeOfLeave = leaveTypeField.value;
  leaveTypeField.addEventListener("change", () => {
    typeOfLeave = leaveTypeField.value;
  });
  let approveState = "pending";
  const formData = {
    workerName,
    workerID,
    startDate,
    endDate,
    typeOfLeave,
    leaveDays,
    reason,
    approveState,
  };
  try {
    // -----------error handling-----------
    const errorField = document.querySelector(".error-field");

    if (
      workerName === null ||
      workerID === null ||
      startDate === null ||
      endDate === null ||
      typeOfLeave === null ||
      leaveDays === null ||
      reason === null
    ) {
      errorField.style.color = "red";
      errorField.textContent = "*all fields are required";
    } else {
      errorField.textContent = "";
    }

    // ---submitting form data------------
    const res2 = await submitFormData(formData);

    if (res2.status === 201) {
      errorField.textContent = "";
      form.reset();

      const successAlert = document.querySelector(".success-alert");
      successAlert.style.display = "block";

      setTimeout(() => {
        successAlert.style.display = "none";
      }, 2500);

      const data = await res2.json();
      return data;
    }
  } catch (err) {

    return err;
  }
});

// -------SUBMIT FORM DATA-------------
const submitFormData = async (formData) => {
  const res = await fetch("http://localhost:3000/api/applyForLeave", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

// ---------------RESETTING FORM INPUTS---------------
form.addEventListener("reset", () => {
  startDateErrorMessage.innerHTML = ' ';
  leaveDaysField.style.border = 'none';
  fetchEmpNameAndID();
})

