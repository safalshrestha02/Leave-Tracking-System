// ------------selecting DOM elements------------
const form = document.querySelector(".reset-password-form");
const newPassword = document.querySelector("#password-input-field");
const confirmPassword = document.querySelector("#password-confirm-input-field");

const submitButton = document.querySelector(".submit-button");

const newPasswordError = document.querySelector(".new-password-error");
const confirmPasswordError = document.querySelector(".confirm-password-error");


// ----------------Handling Form--------------------

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    newPasswordError.textContent = ""
    confirmPasswordError.textContent = ""

    try{
        if (newPassword.value.length < 8) {
            newPasswordError.textContent = ""
            confirmPasswordError.textContent = ""
            newPasswordError.textContent = "*password must be 8 characters or above"
        } else if (confirmPassword.value !== newPassword.value) {
            newPasswordError.textContent = ""
            confirmPasswordError.textContent = ""
            confirmPasswordError.textContent = "*passwords do not match"
        } else {
            const password = confirmPassword.value
            console.log(password)

            // const response = await submitFormData()
        }

    } catch (error) {
        console.log(error.message)
    }

});

const submitFormData = async (formData) => {
    const resetPasswordUrl = "http://locahost:3000/"
    const res = await fetch(resetPasswordUrl, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: { "Content-Type" : "application/json"},
    });
    return res;
};