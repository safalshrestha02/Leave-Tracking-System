const form = document.querySelector("#worker-register-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const country = form.country.value;
  const city = form.city.value;
  const email = form.workerEmail.value;
  const workerID = form.workerID.value;
  const gender = document.querySelector("input[name='gender']:checked").value;
  const password = form.workerPassword.value;
  const companyName = form.companyName.value;

  const formData = {
    firstName,
    lastName,
    gender,
    workerID,
    email,
    password,
    country,
    city,
    companyName,
  };

  try {
    const res = await fetch("http://localhost:3000/client_add_worker", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 201) {
      console.log("succesfully registed");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
});
