import { Box, Typography, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";

const SummonerView: React.FC = () => {

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

  return (
    <Box sx={{ textAlign: "center", marginTop: 3, }}>
      <Typography variant="h5">Summoner: {summonerName}#{summonerTag}</Typography>
      {summonerLevel !== null && (<Typography variant="h6">Summoner Level: {summonerLevel}</Typography>)}
      {profileIconUrl && ( <Avatar alt="Summoner Icon" src={profileIconUrl} sx={{ margin: "20px auto", width: 100, height: 100 }}/>)}
    </Box>
  );
};

export default SummonerView;
