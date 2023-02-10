// ---------------clients-login-page----------------------------



// ------selection dom elements----------------
const clientLoginEmail = document.querySelector(".client-login-email")
const clientLoginPassword = document.querySelector(".client-login-password")



// ------fetching client info----------------
const fetchClients = async () => {
    const res =  await fetch("http://localhost:3000/api/clients");
    const data = await res.json();
    console.log(data)

    data.forEach(client_info => {
        const companyNameAdd = `<option value="${client_info.companyName}">
                                    ${client_info.companyName}
                                </option>`;
        const  companyName = document.querySelector(".client-company-name");

        companyName.innerHTML += companyNameAdd
        console.log(companyName)
    });
}

fetchClients()


