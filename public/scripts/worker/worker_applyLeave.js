//----------------selecting dom elements
const form = document.querySelector(".form-container");

const empNameField = document.querySelector(".employee-name-field");
const empIDField = document.querySelector(".employee-id-field");

const startDateField = document.querySelector("#start-date");
const endDateField = document.querySelector("#end-date");
const leaveDaysField = document.querySelector("#days-number");

const leaveTypeField = document.querySelector(".type-of-leave");
const reasonField = document.querySelector(".reason-of-leave");

// ------------------------------------------------------------------

const fetchEmpNameAndID = async () => {
  const { fullName, workerID } = await fetchWorkerApi();
  empNameField.value = fullName;
  empIDField.value = workerID;
};
fetchEmpNameAndID();

// <========== Generating Leave Days ==========>

// leaveDaysField.style.cursor = "not-allowed"

const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 1;
let currentDay = currentDate.getDate();
currentMonth < 10
  ? (currentMonth = `0${currentMonth}`)
  : (currentMonth = currentMonth);
currentDay < 10 ? (currentDay = `0${currentDay}`) : (currentDay = currentDay);
const currentFullDate = `${currentYear}-${currentMonth}-${currentDay}`;
startDateField.setAttribute("min", currentFullDate);
endDateField.setAttribute("min", currentFullDate);

const generateLeaveDays = () => {
  if (startDateField.value) {
    endDateField.removeAttribute("min");
    endDateField.setAttribute("min", startDateField.value);
    const userInputStartDate = startDateField.value;
    const userInputEndDate = endDateField.value;
    const userInputStartDateObj = new Date(userInputStartDate);
    const userInputEndDateObj = new Date(userInputEndDate);
    const leaveDays =
      (userInputEndDateObj - userInputStartDateObj) / (1000 * 60 * 60 * 24) + 1;
    if (leaveDays > 0) {
      leaveDaysField.value = leaveDays;
      leaveDaysField.style.border = "none";
    } else {
      endDateField.value = startDateField.value;
      generateLeaveDays();
    }
    if (leaveDays > 30) {
      leaveDaysField.value = `You exceeded the alloted no. of leave days! Max Leave Days: 30`;
      leaveDaysField.style.border = "1px solid red";
    }
  }
};

startDateField.addEventListener("change", generateLeaveDays);
endDateField.addEventListener("change", generateLeaveDays);

// <=============================================>

// --------------fetch and send leave request----------------

// ------------------getting input values

const empName = empNameField.value;
const empID = empIDField.value;
const startDate = startDateField.value;
const endDate = endDateField.value;
const leaveDays = leaveDaysField.value;
const reason = reasonField.value;

// getting leave type value
let leaveType = leaveTypeField.value;
leaveTypeField.addEventListener("change", () => {
  leaveType = leaveTypeField.value;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();


  // ------------------getting input values

  const employeeName = empNameField.value;
  const employeeID = empIDField.value;
  const startDate = startDateField.value;
  const endDate = endDateField.value;
  const leaveDays = leaveDaysField.value;
  const reason = reasonField.value;

  // getting leave type value
  let typeOfLeave = leaveTypeField.value;
  leaveTypeField.addEventListener("change", () => {
    typeOfLeave = leaveTypeField.value;
  });

    const formData = {
      employeeName,
      employeeID,
      startDate,
      endDate,
      typeOfLeave,
      leaveDays,
      reason,
    };
    // console.log(formData)

    // submitFormData(formData)

  try {
    const res = await fetch("http://localhost:3000/worker_applyLeave", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res);

    if (res.status === 201){
        const data = await res.json();
        console.log(data, "datadata")
        return data;
    }
    
  } catch (err) {
    console.log(err);
  }

});

const submitFormData = async (formData) => {

    const res = await fetch("http://localhost:3000/worker_applyLeave", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
        "Content-Type": "application/json",
    },
    });
    console.log(res)
};
