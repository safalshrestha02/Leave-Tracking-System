const pastLeavesContainer = document.querySelector(".past-leaves-container")



const checkworkersRequest = async () => {
    const allreq = await fetchLeavesUnderWorker()
    const workersLeaveHistory = allreq.leaveHistory

    if (workersLeaveHistory.length === 0){
        pastLeavesContainer.innerHTML = ""

        let content = `<p class="no-past-record">This worker has no past leaves record</p>`

        pastLeavesContainer.innerHTML += content
    }

    if (workersLeaveHistory.length > 0){
        mm = new Date().getMonth()
        dd = new Date().getDate()
        yyyy = new Date().getFullYear()

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        currentDate = `${yyyy}-${mm}-${dd}`
        
        console.log(currentDate)
        pastLeavesContainer.innerHTML = ""

        let content = `<p class="no-past-record">udiawhij</p>`

        pastLeavesContainer.innerHTML += content
        filteredData = workersLeaveHistory.map((data,index)=> {
            reqEndDate = data.endDate
            console.log(reqEndDate.slice(0,10))
        })
        
    }
}

checkworkersRequest()

