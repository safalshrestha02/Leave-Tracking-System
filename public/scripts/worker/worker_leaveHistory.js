const primaryLeaveContainer = document.querySelector(
  ".upcoming-leaves-container"
);
const filterbutton = document.querySelector(".filter-button");
const filterOptionsContainer = document.querySelector(
  ".filter-options-container"
);
const rejectedOption = document.querySelector(".rejected-option");
const approvedOption = document.querySelector(".approved-option");
const filterIcon = document.querySelector(".filter-icon");
const filterOption = document.querySelectorAll(".filter-option");
const rejectedTitle = document.querySelector(".rejected-title");
const pastContainer = document.querySelector(".past-leaves-container")
const upcomingTitle = document.querySelector(".upcoming-title")
const pastTitle = document.querySelector(".past-title")



// --------------------- GETTING CURRENT DATE -------------------------- //

mm = new Date().getMonth()+1
dd = new Date().getDate()
yyyy = new Date().getFullYear()

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

currentDate = `${yyyy}-${mm}-${dd}`
parsedCurrentDate = Date.parse(currentDate)


// ----------------------- FETCHING REQUESTS ----------------------------- //

const checkworkersRequest = async () => {
  const allreq = await fetchLeavesUnderWorker();
  const workersLeaveHistory = allreq.leaveHistory;
  workersLeaveHistory.forEach(gg=> {
    console.log(gg.approveState)
  })
  
  if (workersLeaveHistory.length === 0) {
    primaryLeaveContainer.innerHTML = "";

    let content = `<p class="no-past-record">This worker has no past leaves record</p>`;

    primaryLeaveContainer.innerHTML += content;
  }


  
  // ---------------------- DashBoard Mapping -----------------------// 
  
 
  if (workersLeaveHistory.length > 0) {

    pastArray=[]
    rejectedArray = []
    upcomingArray = []
    workersLeaveHistory.map((data) => {
    
      parsedendDate = Date.parse(data.endDate.slice(0, 10))
    parsedStartDate = Date.parse(data.startDate.slice(0, 10))

    if (data.approveState == "approved" && parsedCurrentDate > parsedendDate){
      pastArray.push(data)
    }
    if (data.approveState == "rejected"){
      rejectedArray.push(data)
    }
    if (data.approveState == "approved" && parsedStartDate > parsedCurrentDate)
    upcomingArray.push(data)
  })

  let sortedUpcoming = () => {
    let sortedUpcomingArray = upcomingArray.sort((a,b)=> {
      return Date.parse(a.startDate.slice(0, 10)) - Date.parse(b.startDate.slice(0, 10))
    })
    return sortedUpcomingArray
  } 

  let sortedPast = () => {
    let sortedPastArray = pastArray.sort((a,b)=> {
      return Date.parse(a.endDate.slice(0, 10)) - Date.parse(b.endDate.slice(0, 10))
    })
    return sortedPastArray
  }

  let sortedRejected = () => {
    let sortedRejectedArray = rejectedArray.sort((a,b)=> {
      return Date.parse(a.startDate.slice(0, 10)) - Date.parse(b.startDate.slice(0, 10))
    })
    return sortedRejectedArray
  }

    
  // --------------------- MAPPING APPROVED LEAVES ----------------------------------// 

    const getAllApprovedLeaves = () => {    
      primaryLeaveContainer.innerHTML = "";
      pastContainer.innerHTML = "";
      approvedOption.classList.add("active-option");

        if (pastArray.length == 0 && upcomingArray.length == 0){
          primaryLeaveContainer.innerHTML = `
          <p class="no-past-record">No approved Leave History</p>
          `;
        }
      
        // ----------------------- UPCOMING APPROVED LEAVES ------------------ //
        
        if (upcomingArray.length > 0){
          sortedUpcoming().map(data => {
            const { typeOfLeave, startDate, endDate, leaveDays, approveState } = data;
              upcomingTitle.setAttribute("style", "display:block;");
              let content = `

                          <div class="worker-leave-history-details">
          
                              <p class="worker-leave-history-leave-type">${typeOfLeave}</p>
                          
                              <div class="worker-leave-history-leave-date">
                                  <span>${startDate
                                    .slice(0, 10)
                                    .replaceAll("-", "/")} - ${endDate
                .slice(0, 10)
                .replaceAll("-", "/")}</span>
                                  <span> ${leaveDays}</span>
                              </div>
                          
                              <div class="worker-leave-history-leave-status">
                                  <p class="capitalize-input">
                                      <i class="fa-solid fa-circle approved-leave"></i>
                                      ${approveState}
                                  </p>
                              </div>
          
                          </div>
                              `;
              primaryLeaveContainer.innerHTML += content;

          })
        }
        
        // --------------------------- PAST APPROVED LEAVES ------------------// 

        if (pastArray.length > 0){
          sortedPast().map(data => {
            const { typeOfLeave, startDate, endDate, leaveDays, approveState } = data;
              pastTitle.setAttribute("style", "display:block;");
              let content = `

                          <div class="worker-leave-history-details">
          
                              <p class="worker-leave-history-leave-type">${typeOfLeave}</p>
                          
                              <div class="worker-leave-history-leave-date">
                                  <span>${startDate
                                    .slice(0, 10)
                                    .replaceAll("-", "/")} - ${endDate
                .slice(0, 10)
                .replaceAll("-", "/")}</span>
                                  <span> ${leaveDays}</span>
                              </div>
                          
                              <div class="worker-leave-history-leave-status">
                                  <p class="capitalize-input">
                                      <i class="fa-solid fa-circle approved-leave"></i>
                                      ${approveState}
                                  </p>
                              </div>
          
                          </div>
                              `;
                  pastContainer.innerHTML += content;

          })
        }
    }
    
    getAllApprovedLeaves()
  
     // --------------------------------REJECTED ONLICK -----------------------------// 
    
     rejectedOption.addEventListener("click", () => {
      primaryLeaveContainer.innerHTML =""
      pastContainer.innerHTML =""
      
      filterOption.forEach((button) => {
          button.classList.remove("active-option");
        });
        rejectedOption.classList.add("active-option");
        filterOptionsContainer.classList.remove("filter-container-active");
        filterIcon.classList.remove("fa-circle-xmark");
        upcomingTitle.setAttribute("style", "display:none;");
        pastTitle.setAttribute("style", "display:none;");


        if (rejectedArray.length == 0){
          primaryLeaveContainer.innerHTML = `<p class="no-past-record">No rejected leave History</p>`;
          rejectedTitle.setAttribute("style", "display:none;");

        }
        
        // -------------------------- REJECTED LEAVE MAPPING -------------------- //

        if (rejectedArray.length > 0) {
          rejectedTitle.setAttribute("style", "display:block;");
          sortedRejected().map(data => {
            const { typeOfLeave, startDate, endDate, leaveDays, approveState } = data;
            

          let content = `
                <div class="worker-leave-history-details">

                    <p class="worker-leave-history-leave-type">${typeOfLeave}</p>
                
                    <div class="worker-leave-history-leave-date">
                        <span>${startDate
                          .slice(0, 10)
                          .replaceAll("-", "/")} - ${endDate.slice(0, 10).replaceAll("-", "/")}</span>
                        <span> ${leaveDays}</span>
                    </div>
                
                    <div class="worker-leave-history-leave-status">
                        <p class="capitalize-input">
                            <i class="fa-solid fa-circle rejected-leave"></i>
                            ${approveState}
                        </p>
                    </div>

                </div>
                    `;
          primaryLeaveContainer.innerHTML += content;
        })
        }})
      
      // ----------------------------------- APPROVE ONCLICK ----------------------------//

      approvedOption.addEventListener("click",()=> {
        
        filterOption.forEach((button) => {
          button.classList.remove("active-option");
        });
        approvedOption.classList.add("active-option");
        filterOptionsContainer.classList.remove("filter-container-active");
        filterIcon.classList.remove("fa-circle-xmark");
        rejectedTitle.setAttribute("style", "display:none;");
        
        getAllApprovedLeaves()

      })
  }
}
    

checkworkersRequest();

//--------------------------- filter active ----------------------------//



filterbutton.addEventListener("click", () => {
  filterOptionsContainer.classList.toggle("filter-container-active");
  filterIcon.classList.toggle("fa-circle-xmark");
});














