// ------------selecting DOM elements---------------------
const emailLabel = document.querySelector(".labels")
const emailField = document.querySelector("#email-input-field");
const form = document.querySelector(".forgot-password-form");
const errorField = document.querySelector(".error-field");
const successAlert = document.querySelector(".success-alert");
const continueButton = document.querySelector(".submit-button")
console.log(successAlert)


// ----------sending email for verification-----------------

emailField.addEventListener("input", () => {
    errorField.textContent=""
})

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    
    try{
        const email = emailField.value
        const formData = { email: email }

        const response = await sendingEmailInfo(formData);
        const data = await response.json()
        console.log(data,response)

        if (!email){
            errorField.textContent = ""
        } else if (response.status === 404) {
            errorField.textContent = ""
            errorField.textContent = data.message
        } else {
            // errorField.innerHTML=`<img src ="/images/load.gif" alt = "Loading fresh data for you" class = "load-gif"/>`
            // continueButton.style.display = "none"
        }
        


        if (response.status === 200) {

            form.innerHTML = `<p class="reset-link-sent">Reset link has been sent your email</p>`
            successAlert.style.display = "block";

            setTimeout(() => {
                successAlert.style.display = "none";
              }, 2000);
        }

    } catch (error) {
        console.log(error.message)
    }
})


const sendingEmailInfo = async (formData) => {
    const emailCheckUrl = "http://localhost:3000/api/forgotPassword"
    const res = await fetch(emailCheckUrl, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type" : "application/json"},
    });
    return res;
} 

