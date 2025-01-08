import React from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";

const MatchCard: React.FC<{ match: { metadata: { matchId: string }; info: any } }> = ({ match }) => {

    const formatDuration = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
      };

    const { metadata, info } = match;

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

    // Get queue type
    function getGameMode(queueId: number): String {
        switch (queueId) {
          case 420:
            return "Ranked Solo/Duo";
          case 440:
            return "Ranked Flex";
          case 400:
            return "Normal Draft";
          case 430:
            return "Quickplay";
          case 450:
            return "ARAM";
          case 700:
            return "Clash";
          default:
            return "Unknown";
        }
      }

    // Get partipant index inside the match's participants array
    const participantIndex = info.participants.findIndex(
        (p: { riotIdGameName: string; riotIdTagline: string }) =>
            p.riotIdGameName === summonerName && p.riotIdTagline === summonerTag
    );

    // Participant not found case
    if (participantIndex === -1) {
        console.error(`Participant not found: ${summonerName}#${summonerTag}`);
        return <p>Information not found for {summonerName}#{summonerTag} in this game.</p>;
    }
    // Get match winner
    const matchWinner = (info.gameDuration < 280) ? "remake" : info.teams[0].win ? "blue" : info.teams[1].win ? "red" : "";

    // Calculate if the participant won
    const participantResult =
        matchWinner === "remake" ? "REMAKE"
        : (participantIndex >= 0 && participantIndex <= 4)
            ? (matchWinner === "blue" ? "WIN" : "LOSS")
        : (participantIndex >= 5 && participantIndex <= 9)
            ? (matchWinner === "blue" ? "LOSS" : "WIN") : "";

    // Get champion ID
    const championId = info.participants[participantIndex].championId;

    // Get champion icon URL
    function getChampionIconUrl(championId: string) {
        return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;
    }
    
    // Get summoner spell icon URL
    function getSummonerSpellIconUrl(summonerId: string) {
        return `https://lolcdn.darkintaqt.com/cdn/spells/${summonerId}`;
    }

    return (
        <Card sx={{ border: "3px solid black", borderRadius: "15px", margin: '2vh 0vh 2vh 0vh', height: "17vh", width: "100%" }}>
            <CardContent sx={{
                backgroundColor: participantResult === "WIN" ? "rgba(0, 223, 208)" : participantResult === "LOSS" ? "rgba(256, 130, 130)" : "gray",
                height: "17vh",
                padding: "0 0 0 0"
            }}>
                <Grid container spacing={2} alignItems="center" gap={1} sx={{ margin: "0vh 0vh 0vh 0vh"}}>
                    {/* Grid 1 */}
                    <Grid item xs={2.5} sx={{ padding: 2, height: "16vh" }}>
                        <Typography sx={{ textAlign: 'center', fontWeight: 700 }}>{getGameMode(info.queueId)}</Typography>
                        <Typography sx={{ textAlign: 'center' }}>a day ago</Typography>
                        <Divider sx={{ marginY: 1.5 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Typography sx={{ textAlign: 'center', fontWeight: 700 }}>{participantResult}</Typography>
                            <Typography sx={{ textAlign: 'center' }}>+21 LP</Typography>
                        </Box>
                        <Typography sx={{ textAlign: 'center' }}>{formatDuration(info.gameDuration)}</Typography>
                    </Grid>
                    {/* Grid 2 */}
                    <Grid item xs={1} sx={{ padding: 2, height: "16vh" }}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                <Box sx={{ position: "relative", display: "inline-block" }}>
                                    <Avatar alt="Champion Icon" src={getChampionIconUrl(championId)} sx={{ width: "8vh", height: "8vh" }}/>
                                    <Typography sx={{ position: "absolute", bottom: "1%", right: "1%", backgroundColor: "rgba(51, 51, 51)", color: "#fff", padding: "2px 4px 1px 3px", borderRadius: "20px", fontSize: "0.9rem" }}>14</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                    <img alt="Summoner Spell 1" src={getSummonerSpellIconUrl(info.participants[participantIndex].summoner1Id)} style={{ width: "3vh", height: "3vh", borderRadius: "4px" }}/>
                                    <img alt="Summoner Spell 2" src={getSummonerSpellIconUrl(info.participants[participantIndex].summoner2Id)} style={{ width: "3vh", height: "3vh", borderRadius: "4px" }}/>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Grid 3 */}
                    <Grid item xs={5} sx={{ padding: 2, height: "16vh" }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>GRASP</Typography>
                                <Typography>SORCERY</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Typography>K/D/A</Typography>
                                    <Typography>3.00:1 KDA</Typography>
                                </Box>
                                <Typography>222CS (8.1 Cs/pm)</Typography>
                            </Grid>
                            {/* Parte de abajo */}
                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={2}>
                                <Typography>ITEM 1</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                <Typography>ITEM 2</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                <Typography>ITEM 3</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                <Typography>ITEM 4</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                <Typography>ITEM 5</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                <Typography>ITEM 6</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Grid 4 */}
                    <Grid item xs={3} sx={{ padding: 2, height: "16vh" }}>
                        <Grid container spacing={1} alignItems="center">
                            {/* Grid Equipo Azul */}
                            <Grid item xs={6}>
                                <Grid container spacing={0} alignItems="center" direction="row">
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[0].championId)} sx={{ width: "2vh", height: "2vh" }}/>
                                        <Typography>{info.participants[0].riotIdGameName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[1].championId)} sx={{ width: "2vh", height: "2vh" }}/>
                                        <Typography>{info.participants[1].riotIdGameName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[2].championId)} sx={{ width: "2vh", height: "2vh" }}/>
                                        <Typography>{info.participants[2].riotIdGameName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[3].championId)} sx={{ width: "2vh", height: "2vh" }}/>
                                        <Typography>{info.participants[3].riotIdGameName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[4].championId)} sx={{ width: "2vh", height: "2vh" }}/>
                                        <Typography>{info.participants[4].riotIdGameName}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Grid Equipo Rojo */}
                            <Grid item xs={6}>
                                <Grid container spacing={0} alignItems="center" direction="row">
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[5].championId)} sx={{ width: "2vh", height: "2vh" }}/>
                                        <Typography>Player 6</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[6].championId)} sx={{ width: "2vh", height: "2vh" }}/>
                                        <Typography>Player 7</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[7].championId)} sx={{ width: "2vh", height: "2vh" }}/>
                                        <Typography>Player 8</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[8].championId)} sx={{ width: "2vh", height: "2vh" }}/>
                                        <Typography>Player 9</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[9].championId)} sx={{ width: "2vh", height: "2vh" }}/>
                                        <Typography>Player 10</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default MatchCard;