const form = document.querySelector("#worker-register-form")


form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const firstName = form.firstName.value
    const lastName = form.lastName.value
    const country = form.country.value
    const city = form.city.value
    const workerEmail = form.workerEmail.value
    const workerID = form.workerID.value
    const gender = document.querySelector("input[name='gender']:checked").value
    const workerPassword = form.workerPassword.value
    const companyName = form.companyName.value

    try {

        // console.log(firstName)
        // console.log(lastName)
        // console.log(country)
        // console.log(city)
        // console.log(workerEmail)
        // console.log(workerID)
        // console.log(gender)
        // console.log(workerPassword)
        // console.log(companyName)
        const res = await fetch("/client_home", {
            method: "POST",
            body: JSON.stringify({

                firstName,
                lastName,
                gender,
                workerID,
                email:workerEmail,
                password:workerPassword,
                country,
                city,
                companyName,
            }),
            headers: { "Content-Type": "application/json" },
        });
        console.log(res)
        
        const data = await res.json();
        console.log(data)

    }

    catch (err) {
        console.log(err)
    }

})

