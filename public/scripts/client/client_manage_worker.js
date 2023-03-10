const manageWorkersSection = document.querySelector(".manage-workers-leave");
const dashboardSearch = document.querySelector(".dashboard-search");
const mainBody = document.querySelector(".main-body");
const filterButton = document.querySelector(".filter-button");
const filterContainer = document.querySelector(".filter-container");
const paginationContainer = document.querySelector(".pagination-container");
const paginationNumbers = document.querySelector(".pagination-wrapper");
const leftArrow = document.querySelector(".fa-less-than")
const rightArrow = document.querySelector(".fa-greater-than")
const pendingContainer = document.querySelector(".pending-container")

const fetchWorkers = async () => {
  // Getting the actual workers from the company
  manageWorkersSection.innerHTML = '<img src = "/images/load.gif" alt = "Loading fresh data for you" class = "load-gif"/>'
  
  const workersUnderActiveClient = await workersUnderClient()
  const { workers: companyWorkers } = workersUnderActiveClient
  const workersPerPage = companyWorkers


  // =================Pagination=============================
  // let workersPerPage = []
  // const totalWorkersNum = companyWorkers.length

  // let dataLimit = 9
  // let startPage = 1
  // workersPerPage = await fetchLimitedWorkers(startPage,dataLimit)

  // let quotient = Math.floor(totalWorkersNum/dataLimit)
  // let remainder = totalWorkersNum % dataLimit

  // if (remainder !== 0) {
  //   quotient += 1
  // }

  // for (startPage; startPage <= quotient; startPage+=1) {
   
  //   if (startPage===1) {  
  //   } else {
  //     paginationContainer.style.display = ""
  //     let ihtml = `
  //   <li class="pagination-numbers">${startPage}</li>
  //   `
  //   paginationNumbers.innerHTML += ihtml
  //   }
  // }

  // const allPaginationNumbers = document.querySelectorAll(".pagination-numbers")
  // console.log(allPaginationNumbers)

  // if (allPaginationNumbers) {
  //   allPaginationNumbers.forEach((eachPage) => {
  //     eachPage.addEventListener("click", async () => {

  //       const allPaginationNumbers = document.querySelectorAll(".pagination-numbers");
  //       allPaginationNumbers.forEach((perNum) => {
  //         perNum.classList.remove("active-page")
  //       })
  //       eachPage.classList.add("active-page")

  //       workersPerPage = await fetchLimitedWorkers(parseInt(eachPage.textContent),dataLimit)

  //       manageWorkersSection.innerHTML = ""
  //       addWorkersToDashboard()

  //     })
  //   })
  // } else {
  //   workersPerPage = await fetchLimitedWorkers(startPage,dataLimit)
  // }

  // leftArrow.addEventListener("click", () => {
  //   const activePage = document.querySelector(".active-page")
  //   let num = parseInt(activePage.textContent) - 1
    
  //   if (num !== 0) {
  //     leftArrow.style.display = ""
  //     const allPaginationNumbers = document.querySelectorAll(".pagination-numbers");
  //     allPaginationNumbers.forEach(async(perNum) => {
  //       perNum.classList.remove("active-page")
  //       if (parseInt(perNum.textContent) === num) {
  //         perNum.classList.add("active-page")
  //         workersPerPage = await fetchLimitedWorkers(parseInt(perNum.textContent),dataLimit)
  
  //         manageWorkersSection.innerHTML = ""
  //         addWorkersToDashboard()
  //       }
  //     })
  //   } else {
  //   }

  // })

  // rightArrow.addEventListener("click", () => {
  //   const activePage = document.querySelector(".active-page")
  //   let num = parseInt(activePage.textContent) + 1
    
  //   if (num <= quotient ) {
  //     const allPaginationNumbers = document.querySelectorAll(".pagination-numbers");
  //     allPaginationNumbers.forEach(async(perNum) => {
  //       perNum.classList.remove("active-page")
  //       if (parseInt(perNum.textContent) === num) {
  //         perNum.classList.add("active-page")
  //         workersPerPage = await fetchLimitedWorkers(parseInt(perNum.textContent),dataLimit)
  
  //         manageWorkersSection.innerHTML = ""
  //         addWorkersToDashboard()
  //       }
  //     })
  //   } else {

  //   }

  // })





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
                  <div class="worker-profile">
                    <i class="fa-solid fa-circle-info details-icon" onClick='handleDetails("${workerID}","${fullName}","${gender}","${email}")'></i>
                  </div>

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

  const addWorkersToDashboard = async () => {
    manageWorkersSection.innerHTML = "";

    if (companyWorkers.length == 0) {
      manageWorkersSection.innerHTML =
        '<p class="empty-workers">You have no any workers. Add some to manage...</p>';
    }
    companyWorkers.map((data, index) => {
      const { firstName, lastName, workerID, gender, email, city, country,_id } = data;
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
    });
  }

  addWorkersToDashboard();

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

      filteroptions.forEach(button=> {
        button.classList.remove("active-option")
      })
      nameAsc.classList.add("active-option")

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

                <div class="worker-profile">
                    <i class="fa-solid fa-circle-info details-icon" onClick='handleDetails("${workerID}","${fullName}","${gender}","${email}")'></i>
                </div>

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
      filteroptions.forEach(button=> {
        button.classList.remove("active-option")
      })
      nameDes.classList.add("active-option")

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

                <div class="worker-profile">
                    <i class="fa-solid fa-circle-info details-icon" onClick='handleDetails("${workerID}","${fullName}","${gender}","${email}")'></i>
                </div>

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
      filteroptions.forEach(button=> {
        button.classList.remove("active-option")
      })
      idAsc.classList.add("active-option")
      
      let idAscending = companyWorkers.sort((a, b) => {
        if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
          return -1;
        }
        if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
          return 1;
        }
        return 0;
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

                <div class="worker-profile">
                    <i class="fa-solid fa-circle-info details-icon" onClick='handleDetails("${workerID}","${fullName}","${gender}","${email}")'></i>
                </div>

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

      filteroptions.forEach(button=> {
        button.classList.remove("active-option")
      })
      idDes.classList.add("active-option")
      
      let idDescending = companyWorkers.sort((a, b) => {
        if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
          return 1;
        }
        if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
          return -1;
        }
        return 0;
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

                <div class="worker-profile">
                    <i class="fa-solid fa-circle-info details-icon" onClick='handleDetails("${workerID}","${fullName}","${gender}","${email}")'></i>
                </div>

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

// ---------------------- CONFIRM DELETE ----------------------//

const confirmDelete =  (deleteWorkerID, monID, deleteWorkerName) => {
  const confirmBox = document.querySelector(".confirm-container");
  const cancelButton = document.querySelector(".cancel-button");
  const confirmButton = document.querySelector(".confirm-button");
  const workerDeleteName = document.querySelector(".delete-worker-name")
  const workerDeleteID = document.querySelector(".delete-worker-ID")

  confirmBox.style.display = "flex";
  mainBody.classList.add("main-body-overflow");
  
  workerDeleteName.innerHTML = ""
  workerDeleteID.innerHTML = ``
  
  let deleteworkerIDhtml = `${deleteWorkerID}`
  let deleteworkerNamehtml = `<i class="fa-regular fa-user user-icon"></i>${deleteWorkerName}`
  
  workerDeleteID.innerHTML += deleteworkerIDhtml
  workerDeleteName.innerHTML += deleteworkerNamehtml
  
  
  cancelButton.addEventListener("click", () => {
    confirmBox.style.display = "none";
    mainBody.classList.remove("main-body-overflow");
    deleteWorkerID = null
    monID = null
  }, {once: true});
  
  confirmButton.addEventListener("click", async() => {
    confirmBox.style.display = "none";
    mainBody.classList.remove("main-body-overflow");
    try {
    if (deleteWorkerID !== null){
      const deleteURL = `http://localhost:3000/api/workers/${monID}`
      const deleteWorker = await fetch(deleteURL, {method: "DELETE"})
      
      if (deleteWorker.status === 201){

        const successAlert = document.querySelector("#alert");
        successAlert.style.display = "block";

        manageWorkersSection.innerHTML = ""
        fetchWorkers()
        
        setTimeout(()=>{
          successAlert.style.display = "none";
        },2500)

      }} }
      catch(error){
        console.log(error)
      }

  }, {once: true})
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

const handleDetails = (id,full,gender,email,city,country) => {

  const workerDetailBox = document.querySelector(".more-worker-details")
  workerDetailBox.classList.add("details-active")

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
  `
  workerDetailBox.innerHTML += details 

  const closeDetails = document.querySelector(".details-close-icon")
  
  closeDetails.addEventListener("click", ()=> {
    workerDetailBox.classList.remove("details-active")
  })

}


