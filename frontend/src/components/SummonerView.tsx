import { Box, Typography, Avatar, Grid } from "@mui/material";
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

  console.log(searchData);
  // Retrieve profile details
  const profileIconUrl = `https://ddragon-webp.lolmath.net/latest/img/profileicon/${searchData.profileDetails.profileIconId}.webp`;
  const summonerLevel = searchData.profileDetails.summonerLevel;
  const rankedSoloEntry = searchData.summonerEntries.find((entry: { queueType: string; }) => entry.queueType === 'RANKED_SOLO_5x5');
  const soloDuoTierCaps = rankedSoloEntry ? rankedSoloEntry.tier : "UNRANKED";
  const soloDuoTier = soloDuoTierCaps.charAt(0).toUpperCase() + soloDuoTierCaps.slice(1).toLowerCase();
  const soloDuoTierBadgeUrl = `https://wiki.leagueoflegends.com/en-us/images/Season_2023_-_${soloDuoTier}.png`;
  const soloDuoRankRoman = rankedSoloEntry ? rankedSoloEntry.rank : "";

  console.log(searchData);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }} >
        <NavBar height={navBarHeight} />
        <div style={{ flexGrow: 1, overflow: "auto" }}>
          <Box sx={{ background: "url('/gallery/banner.png') no-repeat center center/cover", height: "25vh", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <div style={{ flexGrow: 1, overflow: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ height: "20vh", width: "50%", borderRadius: "60px", display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",  backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
                <Grid container spacing={0} alignItems="center">
                  <Grid item xs={ 3 } sx={{ padding: 0, height: "100%" }}>
                    <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      {profileIconUrl && (<Avatar alt="Summoner Icon" src={profileIconUrl} sx={{ marginLeft: "0vh", width: 100, height: 100 }}/>)}
                      {summonerLevel !== null && (<Typography sx={{ position: "absolute", bottom: "1%", right: "25%", backgroundColor: "rgba(51, 51, 51)", color: "#fff", padding: "2px 4px 1px 3px", borderRadius: "20px", fontSize: "0.9rem" }}>{summonerLevel}</Typography>)}
                    </Box>
                  </Grid>
                  <Grid item xs={ 6 } sx={{ padding: 0, height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 400, fontStyle: "italic", fontSize: "3rem" }} color="white">{summonerName}#{summonerTag}</Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ padding: 0, height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ position: "relative", display: "inline-block", textAlign: "center", width: "100%" }}>
                      <img alt="Tier Badge" src={soloDuoTierBadgeUrl} style={{ height: "15vh", width: "15vh", transform: "translateY(-10%)" }} />
                      <Typography sx={{ position: "absolute", bottom: "5%", left: "50%", transform: "translateX(-50%)", width: "100%", fontWeight: 700 }} color="white">
                        {soloDuoTierCaps} {soloDuoRankRoman}
                      </Typography>
                    </Box>
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
              color: "black",
              margin: "20vh 10vh 0vh 10vh",
              height: "40vh"
             }}>
             </div>
            {searchData.matchDetails && (
            <div style={{ flex: 2.5, marginTop: "5vh", marginBottom: "10vh" }}>
              <Box sx={{ marginTop: "2vh", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid black', padding: "3vh 0vh 3vh 0vh" }}>
                <Typography height="6vh" width="50%" variant="h6" borderBottom="1px solid white" marginTop={ "1vh" } marginBottom={ "1vh" } color="white" textAlign="center">MATCH HISTORY</Typography>
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
              color: "black",
              margin: "20vh 10vh 0vh 10vh",
              height: "40vh"
             }}
             >
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
