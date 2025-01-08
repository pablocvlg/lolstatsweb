import { Box, Typography, Avatar, Card } from "@mui/material";
import { useParams } from "react-router-dom";
import NavBar from "./NavegationBar";
import MatchCard from "./MatchCard";

const SummonerView: React.FC = () => {
  // Navigation bar height
  const navBarHeight = "25vh";

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
          <Box sx={{ background: "url('/gallery/banner.png') no-repeat center center/cover", height: "25vh", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", opacity:"1" }}>
            <div style={{ flexGrow: 1, overflow: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ background: "black", height: "20vh", width: "60%", borderRadius: "60px", display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center", opacity:"0.8" }}>
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
              color: "black",
              margin: "20vh 10vh 0vh 10vh",
              height: "40vh"
             }}>
              <h2>
                OTHER GAMEMODES
              </h2>
             </div>
            {matchDetails && (
            <div style={{ flex: 2.5, marginTop: "5vh", marginBottom: "10vh" }}>
              <Box>
                <Card sx={{ width: "100%", height: "10vh", backgroundColor: "#C0C0C0", color: "black" }}>
                  <Typography variant="h4" align="center">RANKED SELECTOR</Typography>
                </Card>
              </Box>
              <Box sx={{ marginTop: "5vh", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid black', padding: "3vh 0vh 3vh 0vh" }}>
                <Typography height="5vh" width="50%" variant="h6" borderBottom="1px solid white" marginBottom={ "1vh" } color="white" textAlign="center">MATCH HISTORY</Typography>
                <div style={{ overflowY: 'auto', width: '95%' }}>
                  {/* Fixear que coja el champ que quiero y no el toplaner siempre */}
                  {matchDetails.map((match: { metadata: { matchId: string }; info: any}, index: number) => (
                    <MatchCard key={match.metadata.matchId} match={match}/>
                  ))}
                </div>
              </Box>
            </div>
            )}
            <div style={{ 
              flex: 0.6,
              backgroundColor: "#C0C0C0",
              color: "black",
              margin: "20vh 10vh 0vh 10vh",
              height: "40vh"
             }}
             >
              <h2>
                STATISTICS
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
