const addWorker = document.querySelector("#button-add-worker")
const formContainer = document.querySelector(".register-container")
const formClose = document.querySelector("#close-form")
const companyNameField = document.querySelector('.company-name-value')

addWorker.addEventListener("click", () => {
    formContainer.classList.add("form-active");
})

formClose.addEventListener("click", () => {
    formContainer.classList.remove("form-active");
})

window.addEventListener('click', (event) => {
    if (event.target === formContainer) {
        formContainer.classList.remove("form-active");
    }
})

const fetchCompanyName = async () => {
    try {
        const { companyName } = await fetchClientsApi()
        companyNameField.value = companyName
    }

    catch (err) {
        console.log(err.message)
    }

}
fetchCompanyName()

const reset = document.querySelector('.form-button-reset')
reset.addEventListener('click', () => {
    fetchCompanyName()
})