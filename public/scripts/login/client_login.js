// ---------------clients-login-page----------------------------



// ------selection dom elements----------------
const clientLoginEmail = document.querySelector(".client-login-email")
const clientLoginPassword = document.querySelector(".client-login-password")
const form = document.querySelector("form")

const login_error = document.querySelector(".login_error");


// ------fetching client info----------------
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



// ----------fetch and send data for validation------------

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const clientEmail = form.cEmail.value;
  const clientPassword = form.cPassword.value;

  login_error.textContent = " ";

  console.log(clientEmail, clientPassword);

  try {

    const res = await fetch("/client_login" , {
        method: "POST",
        body: JSON.stringify({
            email: clientEmail,
            password: clientPassword
        }),
        headers: {"Content-Type": "application/json"}
    });
    const data = await res.json();
    console.log(data)  

    if (data.errors) {

        console.log(data.errors)
        login_error.textContent = data.errors.email;
    
    } else {
      const successAlert = document.querySelector(".success-alert");
      successAlert.style.display = "block";
  
      setTimeout(()=> {
        console.log("redirection")
        location.assign("/client_home");
      }, 1000)
  
    }

  } catch (err) {
    console.log(err)
  }
});