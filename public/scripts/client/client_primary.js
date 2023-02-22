const clientsApiUrl = "http://localhost:3000/api/clients";
const fetchClientsApi = async () => {
  try {
    const response = await fetch(clientsApiUrl);
    const result = await response.json();
    const {
      companyName,
      companyAddress,
      name: clientName,
      email: clientEmail,
      _id,
    } = result[0];
    return { companyName, companyAddress, clientName, clientEmail, _id };
  } catch (err) {
    console.log(err);
  }
};

const workersApiUrl = "http://localhost:3000/api/workers";
const fetchWorkersApi = async () => {
  try {
    const response = await fetch(workersApiUrl);
    const workersData = await response.json();
    return workersData;
  } catch (err) {
    console.log(err.message);
  }
};

const leaveRequestsApiUrl = "http://localhost:3000/api/leaveRequests";
const fetchLeaveRequestsApi = async () => {
  const response = await fetch(leaveRequestsApiUrl);
  const leaveRequestsData = await response.json();
  return leaveRequestsData;
};

const workersUnderClient = async () => {
  const activeClient = await fetchClientsApi();
  const totalWOrkers = await fetchWorkersApi();
  const workersClient = totalWOrkers.filter((worker) => {
    return worker.companyName === activeClient.companyName;
  });
  return workersClient;
};
