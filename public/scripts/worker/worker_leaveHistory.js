const pastLeavesContainer = document.querySelector(".upcoming-leaves-container")
const filterbutton = document.querySelector(".filter-button")
const filterOptionsContainer = document.querySelector(".filter-options-container")
const rejectedOption = document.querySelector(".rejected-option")
const approvedOption = document.querySelector(".approved-option")
const filterIcon = document.querySelector(".filter-icon")
const filterOption = document.querySelectorAll(".filter-option")
const rejectedTitle = document.querySelector(".rejected-title")



const checkworkersRequest = async () => {
    const allreq = await fetchLeavesUnderWorker()
    const workersLeaveHistory = allreq.leaveHistory
    console.log(workersLeaveHistory)
    if (workersLeaveHistory.length === 0){
        pastLeavesContainer.innerHTML = ""

        let content = `<p class="no-past-record">This worker has no past leaves record</p>`

        pastLeavesContainer.innerHTML += content
    }

    if (workersLeaveHistory.length > 0){

        const allLeaves = workersLeaveHistory.map((data)=>{
            const { typeOfLeave, startDate, endDate, leaveDays, approveState } = data   
            const getApprovedLeaves = () => {
                if (data.approveState ==  "approved"){
                
                    pastLeavesContainer.innerHTML =""
    
                    let content = `

                    <div class="worker-leave-history-details">
    
                        <p class="worker-leave-history-leave-type">${typeOfLeave}</p>
                    
                        <div class="worker-leave-history-leave-date">
                            <span>${startDate.slice(0, 10).replaceAll("-", "/")} - ${endDate.slice(0, 10).replaceAll("-", "/")}</span>
                            <span> ${leaveDays}</span>
                        </div>
                    
                        <div class="worker-leave-history-leave-status">
                            <p class="capitalize-input">
                                <i class="fa-solid fa-circle approved-leave"></i>
                                ${(approveState)}
                            </p>
                        </div>
    
                    </div>
                        `
                    pastLeavesContainer.innerHTML += content
    
            }}
            getApprovedLeaves()
       
            
        rejectedOption.addEventListener("click", ()=> {

            filterOption.forEach(button=> {
                button.classList.remove("active-option")
              })
              rejectedOption.classList.add("active-option")
              filterOptionsContainer.classList.remove("filter-container-active");
              filterIcon.classList.remove("fa-circle-xmark")
              rejectedTitle.setAttribute("style","display:block;")
           
            if (data.approveState ==  "rejected"){
                
                pastLeavesContainer.innerHTML =""

                let content = `
                <div class="worker-leave-history-details">

                    <p class="worker-leave-history-leave-type">${typeOfLeave}</p>
                
                    <div class="worker-leave-history-leave-date">
                        <span>${startDate.slice(0, 10).replaceAll("-", "/")} - ${endDate.slice(0, 10).replaceAll("-", "/")}</span>
                        <span> ${leaveDays}</span>
                    </div>
                
                    <div class="worker-leave-history-leave-status">
                        <p class="capitalize-input">
                            <i class="fa-solid fa-circle rejected-leave"></i>
                            ${(approveState)}
                        </p>
                    </div>

                </div>
                    `
                pastLeavesContainer.innerHTML += content

        }
        })

        approvedOption.addEventListener("click",()=> {
            filterOption.forEach(button=> {
                button.classList.remove("active-option")
              })
              approvedOption.classList.add("active-option")
              filterOptionsContainer.classList.remove("filter-container-active");
              filterIcon.classList.remove("fa-circle-xmark")

              pastLeavesContainer.innerHTML = ""
              getApprovedLeaves()
        })
    })


            // filteredData = workersLeaveHistory.map((data)=> {
            //     EndDate = data.endDate.slice(0,10)                  
            //     })

        }
        // mm = new Date().getMonth()+1
        // dd = new Date().getDate()
        // yyyy = new Date().getFullYear()

        // if (dd < 10) dd = '0' + dd;
        // if (mm < 10) mm = '0' + mm;

        // currentDate = `${yyyy}-${mm}-${dd}`
        
        // console.log(currentDate)
        // pastLeavesContainer.innerHTML = ""

        // pastLeavesContainer.innerHTML += content
        
}

checkworkersRequest()



/// filter active 

filterbutton.addEventListener("click", ()=> {
    filterOptionsContainer.classList.toggle("filter-container-active");
    filterIcon.classList.toggle("fa-circle-xmark")
})