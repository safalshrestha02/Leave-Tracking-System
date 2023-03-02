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


const checkworkersRequest = async () => {
  const allreq = await fetchLeavesUnderWorker();
  const workersLeaveHistory = allreq.leaveHistory;
  if (workersLeaveHistory.length === 0) {
    primaryLeaveContainer.innerHTML = "";

    let content = `<p class="no-past-record">This worker has no past leaves record</p>`;

    primaryLeaveContainer.innerHTML += content;
  }
  
  
  // ----------------------------------- DashBoard Mapping -----------------------// 
  
 
  if (workersLeaveHistory.length > 0) {
    
    primaryLeaveContainer.innerHTML = "";
    pastContainer.innerHTML = "";
    approvedOption.classList.add("active-option");
    
    workersLeaveHistory.map((data)=> {
      if (data.approveState != "approved"){
        primaryLeaveContainer.innerHTML = `<p class="no-past-record">No approved Leaves</p>`;

      }
    }) 
    
    workersLeaveHistory.map((data) => {
      const { typeOfLeave, startDate, endDate, leaveDays, approveState } = data;
      parsedendDate = Date.parse(data.endDate)
      parsedStartDate = Date.parse(data.startDate)
      console.log(parsedStartDate)
       
      if (data.approveState == "approved" && parsedStartDate > parsedCurrentDate) {
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
      }
      
      
      if (data.approveState == "approved" && parsedCurrentDate > parsedendDate){
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

      }
    });
    
    
    
    // --------------------------------REJECTED ONLICK -----------------------------// 
    
    
    
    rejectedOption.addEventListener("click", () => {
        filterOption.forEach((button) => {
          button.classList.remove("active-option");
        });
        rejectedOption.classList.add("active-option");
        filterOptionsContainer.classList.remove("filter-container-active");
        filterIcon.classList.remove("fa-circle-xmark");
        rejectedTitle.setAttribute("style", "display:block;");
        upcomingTitle.setAttribute("style", "display:none;");
        pastTitle.setAttribute("style", "display:none;");


        primaryLeaveContainer.innerHTML =""
        pastContainer.innerHTML =""
        workersLeaveHistory.map((data) => {
            const { typeOfLeave, startDate, endDate, leaveDays, approveState } = data;
        if (data.approveState == "rejected") {
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
        }
        else {
          rejectedTitle.setAttribute("style", "display:null;");
          primaryLeaveContainer.innerHTML = `<p class="no-past-record">No rejected leaves</p>`
        }
      })
  })


    // ----------------------------------- APPROVE ONCLICK ---------------------------- //

  approvedOption.addEventListener("click", () => {
    
    filterOption.forEach((button) => {
      button.classList.remove("active-option");
    });
    approvedOption.classList.add("active-option");
    filterOptionsContainer.classList.remove("filter-container-active");
    filterIcon.classList.remove("fa-circle-xmark");
    rejectedTitle.setAttribute("style", "display:none;");

    primaryLeaveContainer.innerHTML =""
    pastContainer.innerHTML =""
    
    workersLeaveHistory.map((data)=> {
      if (data.approveState != "approved"){
        primaryLeaveContainer.innerHTML = `<p class="no-past-record">No approved Leaves</p>`;

      }
    }) 
    
    workersLeaveHistory.map((data) => {
        const { typeOfLeave, startDate, endDate, leaveDays, approveState } = data;
        parsedendDate = Date.parse(data.endDate)
        parsedStartDate = Date.parse(data.startDate)
        console.log(parsedStartDate)
        
        
        
        
        if (data.approveState == "approved" && parsedStartDate > parsedCurrentDate) {
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
        }
        
        
        if (data.approveState == "approved" && parsedCurrentDate > parsedendDate){
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
  
        }
      });

})

}}

checkworkersRequest();





//--------------------------- filter active ----------------------------//



filterbutton.addEventListener("click", () => {
  filterOptionsContainer.classList.toggle("filter-container-active");
  filterIcon.classList.toggle("fa-circle-xmark");
});














