
const noPassword = document.querySelector(".fa-eye-slash");

noPassword.addEventListener("click", () => {
  noPassword.classList.toggle("fa-eye");
});

const form = document.querySelector("form");
const cname_error = document.querySelector(".cname_error");
const email_error = document.querySelector(".email_error");
const password_error = document.querySelector(".password_error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  cname_error.textContent = " ";
  email_error.textContent = " ";
  password_error.textContent = " ";

  const cName = form.cName.value;
  const cAddress = form.cAddress.value;
  const cCName = form.cCName.value;
  const cEmail = form.cEmail.value;
  const cPassword = form.cPassword.value;

  try {
    const res = await fetch("/client_registration", {
      method: "POST",
      body: JSON.stringify({
        companyName: cName,
        companyAddress: cAddress,
        name: cCName,
        email: cEmail,
        password: cPassword,
      }),
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      cname_error.textContent = data.errors.companyName;
      email_error.textContent = data.errors.email;
      password_error.textContent = data.errors.password;
    }
    if (data.client) {
      location.assign("/client_login");
    }
  } catch (err) {
    console.log(err);
  }
});
