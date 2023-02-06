let addWorker  = document.getElementById("button-add-worker")
let formContainer = document.querySelector(".register-container")
let formClose = document.getElementById("close-form")

addWorker.addEventListener("click", () => {
    console.log("hello")
    formContainer.classList.add("form-active");
    console.log("hello")
    
})

formClose.addEventListener("click",() => {
    formContainer.classList.remove("form-active");
})



