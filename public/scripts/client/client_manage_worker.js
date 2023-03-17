const manageWorkersSection = document.querySelector(".manage-workers-leave");
const dashboardSearch = document.querySelector(".dashboard-search");
const mainBody = document.querySelector(".main-body");
const filterButton = document.querySelector(".filter-button");
const filterContainer = document.querySelector(".filter-container");
const paginationContainer = document.querySelector(".pagination-container");
const paginationNumbers = document.querySelector(".pagination-wrapper");
const leftArrow = document.querySelector(".fa-less-than");
const rightArrow = document.querySelector(".fa-greater-than");
const pendingContainer = document.querySelector(".pending-container");

const fetchWorkers = async () => {
  // Getting the actual workers from the company
  manageWorkersSection.innerHTML =
    '<img src = "/images/load.gif" alt = "Loading fresh data for you" class = "load-gif"/>';

  const fetchactiveClientId = async () => {
    try {
      const res = await fetchActiveClientApi();
      const activeid = res._id;
      return activeid;
    } catch (error) {
      console.log(error);
    }
  };

  const activeClientId = await fetchactiveClientId();

  // --------------------- SEARCH FUNCTION  ---------- //

  const searchWorker = async () => {
    try {
      const userInput = dashboardSearch.value.toLowerCase();

      const search_url = `http://localhost:3000/api/clients_workers/${activeClientId}/?page=1&limit=1000&search=${userInput}`;

      const res = await fetch(search_url, { method: "GET" });
      const data = await res.json();

      const foundWorkers = data.workers;
      if (foundWorkers.length == 0) {
        manageWorkersSection.innerHTML = `<p>No search results found for "${dashboardSearch.value}"</p>`;
      }

      if (foundWorkers.length > 0) {
        manageWorkersSection.innerHTML = "";
        foundWorkers.map((data) => {
          Workermap(data);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  dashboardSearch.addEventListener("input", searchWorker);

  // ------------------------ ADDING WORKERS ON DASHBOARD -----------------------//

  const addWorkersToDashboard = async () => {
    filterContainer.classList.remove("filter-container-active");
    icon.classList.remove("fa-circle-xmark");

    try {
      ASC_URL = `http://localhost:3000/api/clients_workers/${activeClientId}/?page=1&limit=1000&sort=firstName,asc`;

      const res = await fetch(ASC_URL, { method: "GET" });
      const data = await res.json();

      const foundWorkers = data.workers;
      if (foundWorkers.length == 0) {
        manageWorkersSection.innerHTML = `<p class="empty-workers">Add some workers to filter them</p>`;
      }

      if (foundWorkers.length > 0) {
        filteroptions.forEach((button) => {
          button.classList.remove("active-option");
        });
        nameAsc.classList.add("active-option");

        manageWorkersSection.innerHTML = "";
        foundWorkers.map((data) => {
          Workermap(data);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  addWorkersToDashboard();

  // ----------------------------- SORTING ----------------------------------------//

  // ----------------------------- SORTING BY ASCENDING NAME -------------------//

  nameAsc.addEventListener("click", async () => {
    filterContainer.classList.remove("filter-container-active");
    icon.classList.remove("fa-circle-xmark");

    try {
      ASC_URL = `http://localhost:3000/api/clients_workers/${activeClientId}/?page=1&limit=1000&sort=firstName,asc`;

      const res = await fetch(ASC_URL, { method: "GET" });
      const data = await res.json();

      const foundWorkers = data.workers;
      if (foundWorkers.length == 0) {
        manageWorkersSection.innerHTML = `<p class="empty-workers">Add some workers to filter them</p>`;
      }

      if (foundWorkers.length > 0) {
        filteroptions.forEach((button) => {
          button.classList.remove("active-option");
        });
        nameAsc.classList.add("active-option");

        manageWorkersSection.innerHTML = "";
        foundWorkers.map((data) => {
          Workermap(data);
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  // ----------------------------- SORTING BY DESCENDING NAME -------------------//

  nameDes.addEventListener("click", async () => {
    filterContainer.classList.remove("filter-container-active");
    icon.classList.remove("fa-circle-xmark");

    try {
      const DESC_URL = `http://localhost:3000/api/clients_workers/${activeClientId}/?page=1&limit=1000&sort=firstName,desc`;

      const res = await fetch(DESC_URL, { method: "GET" });
      const data = await res.json();

      const foundWorkers = data.workers;
      if (foundWorkers.length == 0) {
        manageWorkersSection.innerHTML = `<p class="empty-workers">Add some workers to filter them</p>`;
      }

      if (foundWorkers.length > 0) {
        filteroptions.forEach((button) => {
          button.classList.remove("active-option");
        });
        nameDes.classList.add("active-option");
        manageWorkersSection.innerHTML = "";
        foundWorkers.map((data) => {
          Workermap(data);
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  // ----------------------------- SORTING BY ASCENDING ID -------------------//

  idAsc.addEventListener("click", async () => {
    filterContainer.classList.remove("filter-container-active");
    icon.classList.remove("fa-circle-xmark");

    try {
      const idASC_URL = `http://localhost:3000/api/clients_workers/${activeClientId}/?page=1&limit=1000&sort=workerID,asc`;

      const res = await fetch(idASC_URL, { method: "GET" });
      const data = await res.json();

      const foundWorkers = data.workers;
      if (foundWorkers.length == 0) {
        manageWorkersSection.innerHTML = `<p class="empty-workers">Add some workers to filter them</p>`;
      }

      if (foundWorkers.length > 0) {
        filteroptions.forEach((button) => {
          button.classList.remove("active-option");
        });
        idAsc.classList.add("active-option");

        manageWorkersSection.innerHTML = "";
        foundWorkers.map((data) => {
          Workermap(data);
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  // ----------------------------- SORTING BY DESCENDING ID -------------------//

  idDes.addEventListener("click", async () => {
    filterContainer.classList.remove("filter-container-active");
    icon.classList.remove("fa-circle-xmark");

    try {
      const idDESC_URL = `http://localhost:3000/api/clients_workers/${activeClientId}/?page=1&limit=1000&sort=workerID,desc`;

      const res = await fetch(idDESC_URL, { method: "GET" });
      const data = await res.json();

      const foundWorkers = data.workers;
      if (foundWorkers.length == 0) {
        manageWorkersSection.innerHTML = `<p class="empty-workers">Add some workers to filter them</p>`;
      }

      if (foundWorkers.length > 0) {
        filteroptions.forEach((button) => {
          button.classList.remove("active-option");
        });
        idDes.classList.add("active-option");

        manageWorkersSection.innerHTML = "";
        foundWorkers.map((data) => {
          Workermap(data);
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

fetchWorkers();

// ---------------------- CONFIRM DELETE ----------------------//

const confirmDelete = (deleteWorkerID, monID, deleteWorkerName) => {
  const confirmBox = document.querySelector(".confirm-container");
  const cancelButton = document.querySelector(".cancel-button");
  const confirmButton = document.querySelector(".confirm-button");
  const workerDeleteName = document.querySelector(".delete-worker-name");
  const workerDeleteID = document.querySelector(".delete-worker-ID");

  confirmBox.style.display = "flex";
  document.body.style.overflow = "hidden";
  workerDeleteName.innerHTML = "";
  workerDeleteID.innerHTML = ``;

  let deleteworkerIDhtml = `${deleteWorkerID}`;
  let deleteworkerNamehtml = `<i class="fa-regular fa-user user-icon"></i>${deleteWorkerName}`;

  workerDeleteID.innerHTML += deleteworkerIDhtml;
  workerDeleteName.innerHTML += deleteworkerNamehtml;

  cancelButton.addEventListener(
    "click",
    () => {
      confirmBox.style.display = "none";
      document.body.style.overflow = "auto";
      deleteWorkerID = null;
      monID = null;
    },
    { once: true }
  );

  confirmButton.addEventListener(
    "click",
    async () => {
      confirmBox.style.display = "none";
      document.body.style.overflow = "auto";
      try {
        if (deleteWorkerID !== null) {
          const deleteURL = `http://localhost:3000/api/workers/${monID}`;
          const deleteWorker = await fetch(deleteURL, { method: "DELETE" });

          if (deleteWorker.status === 201) {
            const successAlert = document.querySelector("#alert");
            successAlert.style.display = "block";

            manageWorkersSection.innerHTML = "";
            fetchWorkers();

            setTimeout(() => {
              successAlert.style.display = "none";
            }, 2500);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    { once: true }
  );
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

// ---------------------- HANDLE DETAILS ------------------------//

const handleDetails = (id, full, gender, email, city, country) => {
  const workerDetailBox = document.querySelector(".more-worker-details");
  workerDetailBox.classList.add("details-active");
  document.body.style.overflow = "hidden";
  workerDetailBox.innerHTML = "";

  let details = `
      <div class="absolute-worker-details">

            <div class="close-icon-container">
                <i class="fa-solid fa-circle-xmark details-close-icon"></i>
            </div>

            <div class="worker-name-container details-container">
                <p class="detail-title">Worker Name</p>
                <p class="capitalize-field">${full}</p>
            </div>
            
            <div class="worker-id-container details-container">
                <p class="detail-title">Worker ID</p>
                <p class="capitalize-field">${id}</p>
            </div>
            
            <div class="worker-gender-container details-container">
                <p class="detail-title">Gender</p>
                <p class="capitalize-field">${gender}</p>
            </div>
            
            <div class="worker-email-container details-container">
                <p class="detail-title">Email</p>
                <p>${email}</p>
            </div>
            
            <div class="worker-country-container details-container">
                <p class="detail-title">Country</p>
                <p class="capitalize-field">${country}</p>
            </div>
            
            <div class="worker-city-container details-container">
                <p class="detail-title">City</p>
                <p class="capitalize-field">${city}</p>
            </div>
      </div>
  `;
  workerDetailBox.innerHTML += details;

  const closeDetails = document.querySelector(".details-close-icon");

  closeDetails.addEventListener("click", () => {
    workerDetailBox.classList.remove("details-active");
    document.body.style.overflow = "auto";
  });
};

// -------------------- Workers mapping -------------------------------------------- //

const Workermap = (data) => {
  const { firstName, lastName, workerID, gender, email, city, country, _id } =
    data;
  const fullName = `${firstName} ${lastName}`;
  let ihtml = `
            <div class="worker-details">
  
                <div class="topsection">
                
                    <span>
                        <i class="fa-regular fa-user user-icon"></i>
                        <span class="worker-name">${fullName}</span>
                    </span>
                    <div class="worker-profile">
                      <i class="fa-solid fa-circle-info details-icon" onClick='handleDetails("${workerID}","${fullName}","${gender}","${email}","${city}", "${country}")'></i>
                    </div>
  
                </div>
  
  
                <div class="worker-id">
                    <span>Worker ID: ${workerID}</span>
                </div>
  
                <div class="worker-gender-delete">
                    <p class="gender">${gender}</p>
  
                    <button class="worker-delete-button" onClick='confirmDelete("${workerID}","${_id}","${fullName}")'>
                        <i class="fa-solid fa-trash"></i>
                    </button>
  
                </div>
  
            </div>
            `;
  manageWorkersSection.innerHTML += ihtml;
};
