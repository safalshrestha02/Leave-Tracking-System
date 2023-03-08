
const fetchLimitedWorkers = async (startPage, dataLimit) => {
    const {_id} = await fetchActiveClientApi();
    fetchTwentyWorkersUrl = `http://localhost:3000/api/clients_workers/${_id}/?page=${startPage}&limit=${dataLimit}`;
    const allWorkers = await fetch(fetchTwentyWorkersUrl);
    const {workers} = await allWorkers.json();
    return workers
}