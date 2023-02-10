// ---------------------workers-login-page--------------



// -------selecting dom elements--------------
const workerLoginEmail = document.querySelector('.worker-login-email');
const workerLoginPassword = document.querySelector('.worker-login-password');



// -----------fetching worker info-----------
const fetchWorkers = async () => {
    const res =  await fetch("http://localhost:3000/api/workers");
    console.log(res)
    const data = await res.json();
    console.log(data)

    data.forEach(worker_info => {
        const companyNameAdd = `<option value="${worker_info.firstName}">
                                    ${worker_info.firstName}
                                </option>`;
        const  companyName = document.querySelector(".worker-company-name");

        companyName.innerHTML += companyNameAdd
        console.log(companyName)
    });
}

fetchWorkers()