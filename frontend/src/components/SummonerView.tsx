import { Box, Typography, Avatar, Card, Grid } from "@mui/material";
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

  // Retrieve profile details
  const profileIconUrl = `https://ddragon-webp.lolmath.net/latest/img/profileicon/${searchData.profileDetails.profileIconId}.webp`;
  const summonerLevel = searchData.profileDetails.summonerLevel;

  console.log(searchData.summonerEntries[0].rank);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }} >
        <NavBar height={navBarHeight} />
        <div style={{ flexGrow: 1, overflow: "auto" }}>
          <Box sx={{ background: "url('/gallery/banner.png') no-repeat center center/cover", height: "25vh", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <div style={{ flexGrow: 1, overflow: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ height: "20vh", width: "45%", borderRadius: "60px", display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",  backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs={ 2.5 } sx={{ padding: 0, height: "100%" }}>
                      <Box sx={{ position: "relative", display: "inline-block" }}>
                        {profileIconUrl && (<Avatar alt="Summoner Icon" src={profileIconUrl} sx={{ marginLeft: "10vh", width: 100, height: 100 }}/>)}
                        {summonerLevel !== null && (<Typography sx={{ position: "absolute", bottom: "1%", right: "1%", backgroundColor: "rgba(51, 51, 51)", color: "#fff", padding: "2px 4px 1px 3px", borderRadius: "20px", fontSize: "0.9rem" }}>{summonerLevel}</Typography>)}
                      </Box>
                    </Grid>
                    <Grid item xs={ 7 } sx={{ padding: 0, height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Typography color="white">{summonerName}#{summonerTag}</Typography>
                    </Grid>
                    <Grid item xs={ 2.5 } sx={{ padding: 0, height: "100%", display: "flex", justifyContent: "start", alignItems: "center" }}>
                      <Typography color="white">{searchData.summonerEntries[0].tier} {searchData.summonerEntries[0].rank}</Typography>
                    </Grid>
                </Grid>
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
            {searchData.matchDetails && (
            <div style={{ flex: 2.5, marginTop: "5vh", marginBottom: "10vh" }}>
              <Box>
                <Card sx={{ width: "100%", height: "10vh", backgroundColor: "#C0C0C0", color: "black" }}>
                  <Typography variant="h4" align="center">RANKED SELECTOR</Typography>
                </Card>
              </Box>
              <Box sx={{ marginTop: "5vh", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid black', padding: "3vh 0vh 3vh 0vh" }}>
                <Typography height="5vh" width="50%" variant="h6" borderBottom="1px solid white" marginBottom={ "1vh" } color="white" textAlign="center">MATCH HISTORY</Typography>
                <div style={{ overflowY: 'auto', width: '95%' }}>
                  {searchData.matchDetails.map((match: { metadata: { matchId: string }; info: any}, index: number) => (
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
