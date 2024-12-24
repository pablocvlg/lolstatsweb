document.getElementById("search-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const summonerName = document.getElementById("summoner-name").value;
    const summonerTag = document.getElementById("summoner-tag").value;

    // Llamar a la API Backend para obtener el Puuid
    try {
        const response = await fetch(`http://localhost:8000/puuid/europe/${summonerName}/${summonerTag}`);
        const data = await response.json();

        // Mostrar la información en el frontend
        const summonerInfo = document.getElementById("summoner-info");
        if (data) {
            summonerInfo.innerHTML = `
                <h2>${data.name}</h2>
                <p><strong>Puuid:</strong> ${data.puuid}</p>
            `;
        } else {
            summonerInfo.innerHTML = "<p>No data found for this summoner.</p>";
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});