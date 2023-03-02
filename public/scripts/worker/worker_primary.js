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
  const response = await fetch (`http://localhost:3000/api/workers_leaves/${_id}`);
  const leavesResult = await response.json();
  return leavesResult
}

const fetchApprovedWorkerRequest = async () => {
  const leaves = await fetchLeavesUnderWorker()
  const approvedLeaves = leaves.leaveHistory.filter((leave) => {
      const { approveState } = leave
      return approveState === "approved"
  })
  return approvedLeaves
}

const fetchRejectedWorkerRequest = async () => {
  const leaves = await fetchLeavesUnderWorker()
  const rejectedLeaves = leaves.leaveHistory.filter((leave) => {
      const { approveState } = leave
      return approveState === "rejected"
  })
  return rejectedLeaves
}