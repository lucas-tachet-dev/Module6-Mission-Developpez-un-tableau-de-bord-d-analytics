const API_URL = 'http://localhost:8000/api'

export async function loginUser(username, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
            "username" : username,
            "password" : password
        })
    })

    const data = await response.json();

    if (!response.ok) {
        console.error("Erreur renvoyée par le serveur :", data);
        throw new Error(data.message || "Échec de l'authentification");
    }

    return data
}

export async function fetchWithAuth(endpoint, token) {
    const response = await fetch(`${API_URL}${endpoint}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    return await response.json();
}