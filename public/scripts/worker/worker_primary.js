const navTopWorkerName = document.querySelector(".worker-name");
const navTopWorkerID = document.querySelector("#id-number");

const activeWorkerApiUrl = "http://localhost:3000/api/activeWorker"
const fetchActiveWorkerApi = async () => {
  const response = await fetch(activeWorkerApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  })
  const result = await response.json()
  const { data } = result
  const { firstName, lastName, country, city, companyName, workerID, gender, email, _id } = data
  const fullName = `${firstName} ${lastName}`
  navTopWorkerName.innerHTML = fullName;
  navTopWorkerID.innerHTML = workerID;
  return { fullName, country, city, companyName, workerID, gender, email, _id }
}
fetchActiveWorkerApi()


const fetchLeavesUnderWorker = async () => {
  const activeWorker = await fetchActiveWorkerApi();
  const { _id } = activeWorker;
  const response = await fetch(`http://localhost:3000/api/workers_leaves/${_id}`);
  console.log(_id)
  const leavesResult = await response.json();
  const { leaveHistory } = leavesResult
  return leaveHistory
}

const fetchApprovedWorkerRequest = async () => {
  const leaves = await fetchLeavesUnderWorker()
  const approvedLeaves = leaves.filter((leave) => {
    const { approveState } = leave
    return approveState === "approved"
  })
  return approvedLeaves
}

const fetchRejectedWorkerRequest = async () => {
  const leaves = await fetchLeavesUnderWorker()
  const rejectedLeaves = leaves.filter((leave) => {
    const { approveState } = leave
    return approveState === "rejected"
  })
  return rejectedLeaves
}

const fetchLeavesYearly = async () => {
  const activeWorker = await fetchActiveWorkerApi()
  const { _id } = activeWorker
  const response = await fetch(`http://localhost:3000/api/workers/${_id}`);
  const woorkerResult = await response.json();
  const { leavesYearly } = woorkerResult
  return leavesYearly
}

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