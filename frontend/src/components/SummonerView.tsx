import { Box, Typography, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import NavBar from "./NavegationBar";

const SummonerView: React.FC = () => {
  // Navigation bar height
  const navBarHeight = "5vh";

  //Obtain the information from the URL
  const { summonerInfo } = useParams();

  // Check if the information is not empty
  if (!summonerInfo) {
    return (
      <div>
        <h1>Invalid URL</h1>
        <p>Please check the URL and try again.</p>
      </div>
    );
  }

  // Extract the parameters from the URL
  const [encodedSummonerName, summonerTag] = summonerInfo.split('-'); 

  // Decode the summoner name
  const summonerName = decodeURIComponent(encodedSummonerName);

  // Retrieve the parameters passed to the component from the sessionStorage
  const storedData = sessionStorage.getItem('summonerInfo');
  const searchData = storedData ? JSON.parse(storedData) : null;
  const summonerLevel = searchData.summonerLevel;
  const profileIconUrl = searchData.profileIconUrl;
  const matchDetails = searchData.matchDetails;

  console.log(matchDetails);

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };  

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }} >
        <NavBar height={navBarHeight} />
        <div style={{ flexGrow: 1, overflow: "auto" }}>
          <Box sx={{ textAlign: "center" }}>
            <div style={{ flexGrow: 1, overflow: "auto" }}>
              <Box sx={{ background: "url('/gallery/banner.png') no-repeat center center/cover", height: "30vh", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", opacity:"1" }}>
                <div style={{ flexGrow: 1, overflow: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Box sx={{ background: "black", height: "20vh", width: "80%", display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center", opacity:"0.8" }}>
                    {profileIconUrl && (<Avatar alt="Summoner Icon" src={profileIconUrl} sx={{ margin: "0 5vh", width: 100, height: 100 }}/>)}
                    <Typography sx={{ margin: "0 5vh"}} color="white">{summonerName}#{summonerTag}</Typography>
                    {summonerLevel !== null && (<Typography color="white">Summoner Level: {summonerLevel}</Typography>)}
                  </Box>
                </div>
              </Box>
            </div>
            {matchDetails && (
              <div style={{ flexGrow: 1, overflow: "auto" }}>
                <Box sx={{ backgroundColor: "#333", marginTop: 2, width: "40%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="h6" marginBottom={ "15px" }>Match Details:</Typography>
                  <div style={{ maxHeight: '40vh', overflowY: 'auto', width: '100%' }}>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {matchDetails.map((match: { metadata: { matchId: string }; info: { gameDuration: number } }, index: number) => (
                        <li key={index} style={{
                          border: '1px solid black',  // Black border
                          borderRadius: '3px',         // Optional: rounded corners
                          marginBottom: '10px',        // Optional: space between items
                          paddingTop: '10px', paddingLeft: '20px', paddingRight: '20px', // Padding inside the list item
                          boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)' // Optional: subtle shadow for better visibility
                        }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
                            Match ID: {match.metadata.matchId}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              <strong>Game Duration:</strong>
                            </Typography>
                            <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'gray' }}>
                              {formatDuration(match.info.gameDuration)}
                            </Typography>
                          </Box>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Box>
              </div>
            )}
          </Box>
        </div>
      </div>
    </>
  );
};

export default SummonerView;
