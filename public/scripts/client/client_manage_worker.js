const manageWorkersSection = document.querySelector(".manage-workers-leave");
const dashboardSearch = document.querySelector(".dashboard-search");

const fetchWorkers = async () => {
  const workersData = await fetchWorkersApi();

  //-------------------- Confirm delete function ------------------------------//

  const confirmDelete = () => {
    const deleteButtons = document.querySelectorAll(".worker-delete-button");
    const confirmBox = document.querySelector(".confirm-container");
    const cancelButton = document.querySelector(".cancel-button");

    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        confirmBox.style.display = "flex";
      });
      cancelButton.addEventListener("click", () => {
        confirmBox.style.display = "none";
      });
    });
  };

  // ----------------------- search Function ------------------------------------//

  const searchFunc = () => {
    const filtered = workersData.filter((workerInfo) => {
      return workerInfo.firstName.startsWith(dashboardSearch.value);
    });
    manageWorkersSection.innerHTML = "";
    filtered.map((data) => {
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

                    <button class="worker-delete-button">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </div>
            `;
      manageWorkersSection.innerHTML += ihtml;
      confirmDelete();
    });
  };

  dashboardSearch.addEventListener("input", searchFunc);
  manageWorkersSection.innerHTML = "";
  workersData.map((data) => {
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

                <button class="worker-delete-button">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>

        </div>
        `;
    manageWorkersSection.innerHTML += ihtml;
    confirmDelete();
  });
};

fetchWorkers();
