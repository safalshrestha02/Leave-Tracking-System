// ------------selecting DOM elements------------
const form = document.querySelector(".reset-password-form");
const newPassword = document.querySelector("#password-input-field");
const confirmPassword = document.querySelector("#password-confirm-input-field");

const submitButton = document.querySelector(".submit-button");

const newPasswordError = document.querySelector(".new-password-error");
const confirmPasswordError = document.querySelector(".confirm-password-error");

const noPassword = document.querySelector(".fa-eye-slash");

// ----------showing and hiding password------------------

noPassword.addEventListener("click", () => {
  noPassword.classList.toggle("fa-eye");

  if (noPassword.classList[2] === "fa-eye") {
    newPassword.setAttribute("type", "text");
  } else {
    newPassword.setAttribute("type", "password");
  }
});

// -----------handling input fields--------------
newPassword.addEventListener("input", () => {
  newPasswordError.textContent = "";
  confirmPasswordError.textContent = "";
});
confirmPassword.addEventListener("input", () => {
  confirmPasswordError.textContent = "";
});

// ----------Getting Token---------------
const url_string = window.location.href.toLowerCase();
const url = new URL(url_string);
const token = url.searchParams.get("token");

// ----------------Handling Form--------------------

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  newPasswordError.textContent = "";
  confirmPasswordError.textContent = "";

  try {
    if (newPassword.value.length < 8) {
      newPasswordError.textContent = "";
      confirmPasswordError.textContent = "";
      newPasswordError.textContent = "*password must be 8 characters or above";
    } else if (confirmPassword.value !== newPassword.value) {
      newPasswordError.textContent = "";
      confirmPasswordError.textContent = "";
      confirmPasswordError.textContent = "*passwords do not match";
    } else {
      const password = confirmPassword.value;
      console.log(password);

      const formData = {
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value,
      };
      console.log(formData);

      const response = await submitFormData(formData);
      const data = await response.json();
      console.log(response, data);

      if (response.status === 201) {
        const successAlert = document.querySelector(".success-alert");
        successAlert.style.display = "block";
        setTimeout(() => {
          successAlert.style.display = "none";
          location.assign("http://localhost:3000/worker_login");
        }, 2500);
      } else {
        newPasswordError.textContent = "";
        confirmPasswordError.textContent = "";
        confirmPasswordError.textContent =
          "*Something went wrong. Please try again";
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

const submitFormData = async (formData) => {
  const resetPasswordUrl = `http://localhost:3000/api/workerResetPassword/${token}`;
  const res = await fetch(resetPasswordUrl, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });
  return res;
};
