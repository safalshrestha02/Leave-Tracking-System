const manageWorkersSection = document.querySelector(".manage-workers-leave");
const dashboardSearch = document.querySelector(".dashboard-search");
const mainBody = document.querySelector(".main-body");
const filterButton = document.querySelector(".filter-button");
const filterContainer = document.querySelector(".filter-container");

const fetchWorkers = async () => {
  // Getting the actual workers from the company
  const workersUnderActiveClient = await workersUnderClient()
  const { workers: companyWorkers } = workersUnderActiveClient


  // ----------------------- search Function ------------------------------------//

  const searchFunc = () => {
    const filtered = companyWorkers.filter((workerInfo) => {
      const userInput = dashboardSearch.value.toLowerCase();
      const { firstName } = workerInfo;
      return firstName.toLowerCase().startsWith(userInput);
    });
    if (filtered.length == 0) {
      manageWorkersSection.innerHTML = `No search results found for "${dashboardSearch.value}"`;
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

  // ------------------------ ADDING WORKERS ON DASHBOARD -----------------------//

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

                <button class="worker-delete-button" onClick='confirmDelete(${workerID})'>
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>

        </div>
        `;
    manageWorkersSection.innerHTML += ihtml;
  });

  // ----------------------------- SORTING ----------------------------------------//

  // ----------------------------- SORTING BY ASCENDING NAME -------------------//

  nameAsc.addEventListener("click", () => {

    filterContainer.classList.remove("filter-container-active");
    icon.classList.remove("fa-circle-xmark");

    if (companyWorkers.length == 0) {
      manageWorkersSection.innerHTML =
        '<p class="empty-workers">You have no any workers to filter. Add workers to filter out</p>';
    }
    if (companyWorkers.length > 0) {
      let nameAscending = companyWorkers.sort((a, b) => {
        if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
          return -1;
        }
        if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      manageWorkersSection.innerHTML = "";
      nameAscending.map((data) => {
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

                <button class="worker-delete-button" onClick='confirmDelete(${workerID})'>
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>

        </div>
        `;
        manageWorkersSection.innerHTML += ihtml;
      });
    }
  });

  // ----------------------------- SORTING BY DESCENDING NAME -------------------//

  nameDes.addEventListener("click", () => {

    filterContainer.classList.remove("filter-container-active");
    icon.classList.remove("fa-circle-xmark");

    if (companyWorkers.length == 0) {
      manageWorkersSection.innerHTML =
        '<p class="empty-workers">You have no any workers to filter. Add workers to filter out</p>';
    }

    if (companyWorkers.length > 0) {
      let nameDescending = companyWorkers.sort((a, b) => {
        if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
          return 1;
        }
        if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
          return -1;
        }
        return 0;
      });
      manageWorkersSection.innerHTML = "";
      nameDescending.map((data) => {
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

                <button class="worker-delete-button" onClick='confirmDelete(${workerID})'>
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>

        </div>
        `;
        manageWorkersSection.innerHTML += ihtml;
      });
    }
  });

  // ----------------------------- SORTING BY ASCENDING ID -------------------//

  idAsc.addEventListener("click", () => {

    filterContainer.classList.remove("filter-container-active");
    icon.classList.remove("fa-circle-xmark");

    if (companyWorkers.length == 0) {
      manageWorkersSection.innerHTML =
        '<p class="empty-workers">You have no any workers to filter. Add workers to filter out</p>';
    }
    if (companyWorkers.length > 0) {
      let idAscending = companyWorkers.sort((a, b) => {
        return a.workerID - b.workerID;
      });
      manageWorkersSection.innerHTML = "";
      idAscending.map((data) => {
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

                <button class="worker-delete-button" onClick='confirmDelete(${workerID})'>
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>

        </div>
        `;
        manageWorkersSection.innerHTML += ihtml;
      });
    }
  });

  // ----------------------------- SORTING BY DESCENDING ID -------------------//

  idDes.addEventListener("click", () => {

    filterContainer.classList.remove("filter-container-active");
    icon.classList.remove("fa-circle-xmark");

    if (companyWorkers.length == 0) {
      manageWorkersSection.innerHTML =
        '<p class="empty-workers">You have no any workers to filter. Add workers to filter out</p>';
    }

    if (companyWorkers.length > 0) {
      let idDescending = companyWorkers.sort((a, b) => {
        return b.workerID - a.workerID;
      });
      manageWorkersSection.innerHTML = "";
      idDescending.map((data) => {
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

                <button class="worker-delete-button" onClick='confirmDelete(${workerID})'>
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>

        </div>
        `;
        manageWorkersSection.innerHTML += ihtml;
      });
    }
  });
};

fetchWorkers();

const confirmDelete = (deleteWorkerID) => {
  const confirmBox = document.querySelector(".confirm-container");
  const cancelButton = document.querySelector(".cancel-button");
  const confirmButton = document.querySelector(".confirm-button");

  confirmBox.style.display = "flex";
  mainBody.classList.add("main-body-overflow");

  cancelButton.addEventListener("click", () => {
    confirmBox.style.display = "none";
    mainBody.classList.remove("main-body-overflow");
    console.log("you cancelled");
  });
  confirmButton.addEventListener("click", () => {
    const parsedID = `"${deleteWorkerID}"`;
    console.log(`deleted worker ID ${parsedID}`);
    deleteWorkerID = null;
    confirmBox.style.display = "none";
    mainBody.classList.remove("main-body-overflow");
  });
};

// ---------- filter ------- //

const filteroptions = document.querySelectorAll(".filter-buttons");
const nameAsc = document.querySelector(".asc-name");
const nameDes = document.querySelector(".des-name");
const idAsc = document.querySelector(".asc-id");
const idDes = document.querySelector(".des-id");
const icon = document.querySelector(".filter-icon");

filterButton.addEventListener("click", () => {
  filterContainer.classList.toggle("filter-container-active");
  icon.classList.toggle("fa-circle-xmark");
});
