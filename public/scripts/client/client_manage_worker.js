const manageWorkersSection = document.querySelector('.manage-workers-leave')

const fetchWorkers = async () => {
    const workersData = await fetchWorkersApi()
    workersData.map((data) => {
        const { firstName, lastName, workerID, gender, email } = data
        const fullName = `${firstName} ${lastName}`
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
        `
        manageWorkersSection.insertAdjacentHTML('afterbegin', ihtml)
    })
}
fetchWorkers()