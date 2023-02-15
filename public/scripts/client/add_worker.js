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

    const formData =

    {
        "firstName": "dsadasd",
        "lastName": "dsadasda",
        "gender": "Male",
        "workerID": "00123",
        "email": "safal22@gmail.com",
        "password": "safalsafl",
        "country": "Nepal",
        "city": "random",
        "companyName": "ecobee"
    }

    try {

        const res = await fetch("/client_home", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" },
        });

        console.log(res)
        // const data = await res.json();
        // console.log(data)

    }

    catch (err) {
        console.log(err)
    }

})





