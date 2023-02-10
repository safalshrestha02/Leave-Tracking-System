



// ---------------clients-login-page----------------------------

// const clientLoginEmail = document.querySelector(".client-login-email")
// const clientLoginPassword = document.querySelector(".client-login-password")

// console.log(clientLoginEmail.value);

// const fetchClients = async () => {
//     const res =  await fetch("http://localhost:3000/api/clients");
//     const data = await res.json();
//     console.log(data)

//     data.forEach(client_info => {
//         const companyNameAdd = `<option value="${client_info.companyName}">
//                                     ${client_info.companyName}
//                                 </option>`;
//         const  companyName = document.querySelector(".client-company-name");

//         companyName.innerHTML += companyNameAdd
//         console.log(companyName)
//     });
// }

// fetchClients()


// ---------------------workers-ogin-page--------------

// const workerLoginEmail = document.querySelector('.worker-login-email');
// const workerLoginPassword = document.querySelector('.worker-login-password');

// console.log(workerLoginEmail.value)

// const fetchWorkers = async () => {
//     const res =  await fetch("http://localhost:3000/api/workers");
//     console.log(res)
//     const data = await res.json();
//     console.log(data)

    // data.forEach(worker_info => {
    //     const companyNameAdd = `<option value="${worker_info.firstName}">
    //                                 ${worker_info.firstName}
    //                             </option>`;
    //     const  companyName = document.querySelector(".worker-company-name");

    //     companyName.innerHTML += companyNameAdd
    //     console.log(companyName)
    // });
// }

// fetchWorkers()