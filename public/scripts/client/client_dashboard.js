const addWorker = document.querySelector("#button-add-worker");
const addWorkerResponsive = document.querySelector('.btn-add-worker-responsive')
const formContainer = document.querySelector(".register-container");
const formClose = document.querySelector("#close-form");
const companyNameField = document.querySelector(".company-name-value");
const form = document.querySelector(".register-form");
const inputFields = document.querySelectorAll(".register-input-field");
const companyIDField = document.querySelector(".client-ID-value")

addWorker.addEventListener("click", () => {
  formContainer.classList.add("form-active");
  document.body.style.overflow = 'hidden'
});

addWorkerResponsive.addEventListener("click", () => {
  formContainer.classList.add("form-active");
  document.body.style.overflow = 'hidden'
});

formClose.addEventListener("click", () => {
  formContainer.classList.remove("form-active");
  document.body.style.overflow = 'auto'
  manageWorkersSection.innerHTML = ""
  location.reload()
});

window.addEventListener("click", (event) => {
  if (event.target === formContainer) {
    formContainer.classList.remove("form-active");
    document.body.style.overflow = 'auto'
  }
});

const fetchCompanyName = async () => {
  try {
    const { companyName } = await fetchActiveClientApi();
    companyNameField.value = companyName;
  } catch (err) {
    console.log(err.message);
  }
};
fetchCompanyName();

const fetchCompanyID = async () => {
  try {
    const { companyID } = await fetchActiveClientApi();
    companyIDField.value = companyID

  } catch (err) {
    console.log(err.message)
  }
}

fetchCompanyID();

const reset = document.querySelector(".form-button-reset");

reset.addEventListener("click", () => {
  fetchCompanyName();
  fetchCompanyID();

  firstName_error.textContent = " ";
  lastName_error.textContent = " ";
  country_error.textContent = " ";
  city_error.textContent = " ";
  companyName_error.textContent = " ";
  workerID_error.textContent = " ";
  gender_error.textContent = " ";
  workerEmail_error.textContent = " ";
  workerPassword_error.textContent = " ";
  country_error.textContent = " ";

  idDetails.innerHTML = ""
  inputFields.forEach((inputs) => {
    inputs.setAttribute("style", "border: initial");
  });
});

const leftContainerWrapper = document.querySelector('.left-container-wrapper')
const hamBurgerMenu = document.querySelector('.hamburger-bars')
const closeMenu = document.querySelector('.close-menu')

const openHamburgerMenu = () => {
  leftContainerWrapper.classList.add('active-hamburger')
  leftContainerWrapper.classList.add('animate')
  setTimeout(() => {
    leftContainerWrapper.classList.remove('animate')
  }, 100)
}

const closeHamburgerMenu = () => {
  leftContainerWrapper.classList.remove('animate')
  setTimeout(() => {
    leftContainerWrapper.classList.add('animate')
  }, 100)

  setTimeout(() => {
    leftContainerWrapper.classList.remove('active-hamburger')
  }, 300)

  setTimeout(() => {
    leftContainerWrapper.classList.remove('animate')
  }, 500)
}


hamBurgerMenu.addEventListener('click', openHamburgerMenu)
closeMenu.addEventListener('click', closeHamburgerMenu)