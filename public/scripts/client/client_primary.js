const clientsApiUrl = 'http://localhost:3000/api/clients'

const fetchClientsApi = async () => {
    const response = await fetch(clientsApiUrl)
    const result = await response.json()
    const { companyName, companyAddress, name: clientName, email: clientEmail } = result[35]
    return { companyName, companyAddress, clientName, clientEmail }
}