const manageWorkersSection = document.querySelector(".manage-workers-leave");
const dashboardSearch = document.querySelector(".dashboard-search");
const mainBody = document.querySelector(".main-body");

const fetchWorkers = async () => {
  // Getting the actual workers from the company
  const workers = await fetchWorkersApi();
  const { companyName } = await fetchClientsApi();

  const companyWorkers = workers.filter((worker) => {
    const { companyName: workerCompanyName } = worker;
    return workerCompanyName.toLowerCase() === companyName.toLowerCase();
  });

  // ----------------------- search Function ------------------------------------//

  const searchFunc = () => {
    const filtered = companyWorkers.filter((workerInfo) => {
      const userInput = dashboardSearch.value.toLowerCase();
      const { firstName } = workerInfo;
      return firstName.toLowerCase().startsWith(userInput);
    });
    if (filtered.length == 0) {
      manageWorkersSection.innerHTML = `No search results found for ${dashboardSearch.value}`;
    } else {
      manageWorkersSection.innerHTML = "";
      filtered.map((data, index) => {
        const { firstName, lastName, workerID, gender, email } = data;
        const fullName = `${firstName} ${lastName}`;
        let ihtml = `
          <div class="worker-details">

              <div class="topsection">
              
                  <span>
                      <i class="fa-regular fa-user user-icon"></i>
                      <span class="worker-name">${fullName}</span>
                  </span>
                  <a href="#" class="worker-profile">
                      <i class="fa-solid fa-ellipsis"></i>
                  </a>

              </div>


              <div class="worker-id">
                  <span>Worker ID: ${workerID}</span>
              </div>

              <div class="worker-gender-delete">
                  <p class="gender">${gender}</p>

                  <button class="worker-delete-button" onClick='confirmDelete(${workerID},${index})'>
                      <i class="fa-solid fa-trash"></i>
                  </button>

              </div>

          </div>
          `;
        manageWorkersSection.innerHTML += ihtml;
      });
    }
  };

  dashboardSearch.addEventListener("input", searchFunc);
  manageWorkersSection.innerHTML = "";

  if (companyWorkers.length == 0) {
    manageWorkersSection.innerHTML =
      '<p class="empty-workers">You have no any workers. Add some to manage...</p>';
  }
  companyWorkers.map((data, index) => {
    const { firstName, lastName, workerID, gender, email } = data;
    const fullName = `${firstName} ${lastName}`;
    let ihtml = `
        <div class="worker-details">

            <div class="topsection">
            
                <span>
                    <i class="fa-regular fa-user user-icon"></i>
                    <span class="worker-name">${fullName}</span>
                </span>

                <a href="#" class="worker-profile">
                    <i class="fa-solid fa-ellipsis"></i>
                </a>

            </div>


            <div class="worker-id">
                <span>Worker ID: ${workerID}</span>
            </div>

            <div class="worker-gender-delete">
                <p class="gender">${gender}</p>

                <button class="worker-delete-button" onClick='confirmDelete(${workerID},${index})'>
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>

        </div>
        `;
    manageWorkersSection.innerHTML += ihtml;
  });
};

fetchWorkers();

const confirmDelete = (deleteWorkerID, index) => {
  const deleteButtons = document.querySelectorAll(".worker-delete-button");
  const confirmBox = document.querySelector(".confirm-container");
  const cancelButton = document.querySelector(".cancel-button");
  const confirmButton = document.querySelector(".confirm-button");

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      confirmBox.style.display = "flex";
      mainBody.classList.add("main-body-overflow");
    });
  });
  cancelButton.addEventListener("click", () => {
    confirmBox.style.display = "none";
    mainBody.classList.remove("main-body-overflow");
    console.log("you cancelled");
  });
  confirmButton.addEventListener("click", () => {
    console.log(`deleted worker ID ${deleteWorkerID}`);
    deleteWorkerID = null;
    confirmBox.style.display = "none";
    mainBody.classList.remove("main-body-overflow");
  });
};
