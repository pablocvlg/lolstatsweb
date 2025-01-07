import { Box, Typography, Avatar, Card } from "@mui/material";
import { useParams } from "react-router-dom";
import NavBar from "./NavegationBar";

const SummonerView: React.FC = () => {
  // Navigation bar height
  const navBarHeight = "10vh";

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
          <Box sx={{ background: "url('/gallery/banner.png') no-repeat center center/cover", height: "30vh", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", opacity:"1" }}>
            <div style={{ flexGrow: 1, overflow: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ background: "black", height: "20vh", width: "80%", display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center", opacity:"0.8" }}>
                {profileIconUrl && (<Avatar alt="Summoner Icon" src={profileIconUrl} sx={{ margin: "0 5vh", width: 100, height: 100 }}/>)}
                <Typography sx={{ margin: "0 5vh"}} color="white">{summonerName}#{summonerTag}</Typography>
                {summonerLevel !== null && (<Typography color="white">Summoner Level: {summonerLevel}</Typography>)}
              </Box>
            </div>
          </Box>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            backgroundColor: "rgba(51, 51, 51)",
          }}>
            <div style={{ 
              flex: 0.6,
              backgroundColor: "#C0C0C0",
              color: "white",
              margin: "19vh 10vh 0vh 10vh",
              height: "40vh"
             }}>
              <h2>
                Otros modos de juego
              </h2>
             </div>
            {matchDetails && (
            <div style={{ flex: 2.5, marginTop: "7vh", marginBottom: "10vh" }}>
              <Box>
                <Card sx={{ width: "100%", height: "10vh" }}>
                  <Typography variant="h6" marginBottom={ "15px" }>Ranked selector</Typography>
                </Card>
              </Box>
              <Box sx={{ marginTop: "5vh", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid black', padding: "3vh 2vh 3vh 2vh" }}>
                <Typography height="5vh" width="50%" variant="h6" borderBottom="1px solid white" marginBottom={ "1vh" } color="white" textAlign="center">Match Details</Typography>
                <div style={{ maxHeight: '75vh', overflowY: 'auto', width: '100%' }}>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {matchDetails.map((match: { metadata: { matchId: string }; info: { gameDuration: number } }, index: number) => (
                      <li key={index} style={{
                        border: '1px solid black',
                        borderRadius: '3px',
                        margin: '2vh 2vh 2vh 2vh',
                        paddingTop: '10px', paddingLeft: '20px', paddingRight: '20px',
                        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)'
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
            <div style={{ 
              flex: 0.6,
              backgroundColor: "#C0C0C0",
              color: "white",
              margin: "19vh 10vh 0vh 10vh",
              height: "40vh"
             }}
             >
              <h2>
                Estadisticas
              </h2>
             </div>
          </div>
          <Box sx={{ backgroundColor: "rgba(25, 25, 25)", height: "30vh", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", opacity:"1" }}>
            <div style={{ flexGrow: 1, overflow: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ background: "black", height: "20vh", width: "80%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", opacity:"0.8" }}>
                <Typography sx={{ margin: "0 5vh"}} color="white">CONTACT / SUPPORT / HELP / LEGAL</Typography>
              </Box>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default SummonerView;
