// JavaScript to load the Home Page
document.getElementById("search-form").addEventListener("submit", async function (e) {

    // Prevent the page from refreshing when the form is submitted
    e.preventDefault();

    // Retrieve the values entered by the user for summoner name and tag
    const summonerName = document.getElementById("summoner-name").value;
    const summonerTag = document.getElementById("summoner-tag").value;

    // If either the summoner name or tag are empty, show an alert message and stop the process
    if (!summonerName || !summonerTag) {

        alert("Please enter both the summoner's name and tag.");

        return;

    }

    // Construct the URL to call the FastAPI backend, inserting the region, summoner name, and tag
    const puuidUrl = `http://localhost:8000/puuid/europe/${summonerName}/${summonerTag}`;

    // Begin a try block to handle the API call and any potential errors
    try {
        
        // Send a request to the FastAPI backend using the API URL
        const response = await fetch(puuidUrl);

        // Check if the response was successful (Status Code 200)
        if (response.ok) {

            // Keep the puuid from the response JSON data
            const data = await response.json();
            const puuid = data.puuid;

            // Use the puuid to make a second API call to fetch summoner details (profile icon and level)
            const summonerDetailsUrl = `http://localhost:8000/puuid/euw1/${puuid}`;
            const detailsResponse = await fetch(summonerDetailsUrl);

            // Check if the response was successful (Status Code 200)
            if (detailsResponse.ok) {

                // Get the details (profile icon ID, summoner level)
                const detailsData = await detailsResponse.json();
                const profileIconId = detailsData.profileIconId;
                const summonerLevel = detailsData.summonerLevel;

                // Construct the URL for the profile icon using the profileIconId
                const profileIconUrl = `https://ddragon-webp.lolmath.net/latest/img/profileicon/${profileIconId}.webp`;

                // Display the summoner details in the 'result' div
                document.getElementById('result').innerHTML = `
                    <p>Summoner Level: ${summonerLevel}</p>
                    <p><img src="${profileIconUrl}" alt="Summoner Icon" width="50" height="50"></p>
                `;

            } else {

                document.getElementById('result').innerHTML = `<p>Error fetching summoner details.</p>`;

            }

        } else {

            document.getElementById('result').innerHTML = `<p>Error al obtener los datos.</p>`;

        }

    } catch (error) {

        console.error("Error:", error);
        document.getElementById('result').innerHTML = `<p>Error al conectarse al servidor.</p>`;

    }

});