//------selecting DOM elements-----------
const leavesYearly = document.querySelector(".leaves-yearly");
const leavesYearlyInput = document.querySelector("#no-of-days");

const typesOfLeaves = document.querySelector(".leave-types");

const settingsIcon = document.querySelector(".settings-icon");
const doneButton = document.querySelector(".done-button");

const editLeaveSettings = async () => {
    try {
        // ----adding current leaves in a year----------
        const activeClient = await fetchActiveClientApi();
        console.log(activeClient.leavesYearly)
        leavesYearlyInput.setAttribute("placeholder", `${activeClient.leavesYearly}`)

        const settingsFunction = () => {
            console.log("settings")
            settingsIcon.style.display = "none";
            doneButton.style.display = "block";
            leavesYearlyInput.style.border = "2px solid #03c988"
            leavesYearlyInput.removeAttribute("disabled");

        };

        const doneFunction = async () => {
            console.log("done")
            doneButton.style.display = "none";
            settingsIcon.style.display = "block";
            leavesYearlyInput.style.border = "initial"

            const updatedLeaveYearly = parseInt(leavesYearlyInput.value);
            leavesYearlyInput.setAttribute("disabled","disabled");

            const leaveSuccessAlert = document.querySelector(".leave-success");
            leaveSuccessAlert.style.display = "block";
            setTimeout(() => {
              leaveSuccessAlert.style.display = "none";
            }, 2500);

            const updateLeaveYearlyUrl = `http://localhost:3000/api/changeLeaveDays/${activeClient._id}/${updatedLeaveYearly}`
            const response = await fetch(updateLeaveYearlyUrl, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }
            });

        };

        settingsIcon.addEventListener("click", settingsFunction);
        doneButton.addEventListener("click", doneFunction)

    } catch (err) {
        console.log(err.messge)
    };
};

editLeaveSettings();