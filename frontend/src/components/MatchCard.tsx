import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";

const MatchCard: React.FC<{ match: { metadata: { matchId: string }; info: any } }> = ({ match }) => {

    const [runesData, setRunesData] = useState<any[]>([]);
    const [itemsData, setItemsData] = useState<any[]>([]);

    useEffect(() => {
      // Load Runes Pathing JSON
      fetch("/info/runesPathing.json")
        .then((response) => response.json())
        .then((data) => setRunesData(data))
        .catch((error) => console.error("Error loading runes JSON:", error));
      // Load Items Pathing JSON
      fetch("/info/itemsPathing.json")
        .then((response) => response.json())
        .then((data) => setItemsData(data))
        .catch((error) => console.error("Error loading items JSON:", error));
    }, []);

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

    // Get the Icon Path for a Rune given its ID
    const getRuneIconPathById = (runeId: number): string | undefined => {
        for (const path of runesData) {
          for (const slot of path.slots) {
            const rune = slot.runes.find((rune: any) => rune.id === runeId);
            if (rune) {
              return rune.icon;
            }
          }
        }
        return undefined; // Si no se encuentra el icono
    };

    // Get the main rune icon full URL
    function getMainRuneIconUrl() {
        const mainRuneId = info.participants[participantIndex].perks.styles[0].selections[0].perk;
        // Rune Pathing JSON
        const mainRuneIconPath = getRuneIconPathById(mainRuneId);
        const mainRuneUrl = `https://ddragon.leagueoflegends.com/cdn/img/${mainRuneIconPath}`;
        return mainRuneUrl;
    }

    // Get the Icon Path for a Rune Tree given its ID
    const getRuneTreeIconPathById = (treeId: number): string | undefined => {
        const tree = runesData.find((tree: any) => tree.id === treeId);
        return tree ? tree.icon : undefined;
    };

    // Get the secondary rune tree icon URL
    function getSecondaryRuneTreeIconUrl() {
        const secondaryRuneTreeId = info.participants[participantIndex].perks.styles[1].style;
        // Rune Pathing JSON
        const secondaryRuneTreeIconPath = getRuneTreeIconPathById(secondaryRuneTreeId);
        const secondaryRuneTreeUrl = `https://ddragon.leagueoflegends.com/cdn/img/${secondaryRuneTreeIconPath}`;
        return secondaryRuneTreeUrl;
    }

    // Get items
    const items: string[] = getItems();
    console.log(items);

    // Function to get the items array
    function getItems() {
        const participant = info.participants[participantIndex];
        return getItemsIconsPathsById(Array.from({ length: 7 }, (_, i) => participant[`item${i}`]));
    }
    
    // Function to get the items icons paths
    function getItemsIconsPathsById(items: string[]) {
        return items.map(itemId => {
            const item = itemsData.find((data: { id: string; }) => data.id === itemId);
            return item ? mapItemIconPath(item.iconPath) : "";
        });
    }

    // Function to map the items icons paths
    function mapItemIconPath(iconPath: string) {
        const newIconPath = iconPath.split('/').pop()?.toLowerCase();
        return ("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/" + newIconPath);
    }

    return (
        <Card sx={{
            border: participantResult === "WIN" ? "3px solid rgba(65, 131, 232)" : participantResult === "LOSS" ? "3px solid rgba(232, 59, 66)" : "3px solid gray",
            borderRadius: "15px",
            margin: '2vh 0vh 2vh 0vh',
            height: "160px",
            width: "100%"
        }}>
            <CardContent sx={{
                backgroundColor: participantResult === "WIN" ? "rgba(45, 57, 110)" : participantResult === "LOSS" ? "rgba(89, 52, 59)" : "gray",
                height: "160px",
                padding: "0 0 0 0"
            }}>
                <Grid container spacing={2} alignItems="center" gap={1} sx={{ margin: "0vh 0vh 0vh 0vh"}}>
                    {/* Grid 1 */}
                    <Grid item xs={2} sx={{ margin: "0px 0px 0px 0px", height: "150px" }}>
                        <Typography sx={{ margin: "10px 0px 0px 0px", textAlign: 'center', fontSize: '1rem', fontWeight: 700, color: participantResult === "WIN" ? "rgba(65, 131, 232)" : participantResult === "LOSS" ? "rgba(232, 59, 66)" : "black" }}>{getGameMode(info.queueId)}</Typography>
                        <Typography sx={{ textAlign: 'center', fontSize: '0.9rem', color: 'rgba(150, 145, 135)' }}>a day ago</Typography>
                        <Divider sx={{ marginY: 2.2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Typography sx={{ textAlign: 'center', fontWeight: 700, color: participantResult === "WIN" ? "rgba(65, 131, 232)" : participantResult === "LOSS" ? "rgba(232, 59, 66)" : "black" }}>{participantResult}</Typography>
                            <Typography sx={{ alignContent: 'center', textAlign: 'center', color: 'rgba(150, 145, 135)', fontSize: '0.9rem' }}>{formatDuration(info.gameDuration)}</Typography>
                        </Box>
                    </Grid>
                    {/* Grid 2 */}
                    <Grid item xs={1.5} sx={{ padding: "0px 10px 0px 0px", height: "150px" }}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                <Box sx={{ position: "relative", display: "inline-block" }}>
                                    <Avatar alt="Champion Icon" src={getChampionIconUrl(championId)} sx={{ width: "73px", height: "73px" }}/>
                                    <Typography sx={{ position: "absolute", bottom: "1%", right: "1%", backgroundColor: "rgba(51, 51, 51)", color: "#fff", padding: "2px 4px 1px 3px", borderRadius: "20px", fontSize: "0.9rem" }}>14</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                    <img alt="Summoner Spell 1" src={getSummonerSpellIconUrl(info.participants[participantIndex].summoner1Id)} style={{ width: "32px", height: "32px", borderRadius: "4px" }}/>
                                    <img alt="Summoner Spell 2" src={getSummonerSpellIconUrl(info.participants[participantIndex].summoner2Id)} style={{ width: "32px", height: "32px", borderRadius: "4px" }}/>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Grid 3 */}
                    <Grid item xs={4.55} sx={{ padding: "0px 0px 0px 0px", height: "150px" }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                    <img src={getMainRuneIconUrl()} alt="Main Rune" style={{ width: "34px", height: "34px", marginTop: "5px", backgroundColor: "rgba(41, 41, 41)", borderRadius: "20px" }}/>
                                    <img src={getSecondaryRuneTreeIconUrl()} alt="Secondary Rune Tree" style={{ width: "26px", height: "26px", marginTop: "5px", marginLeft: "4px" }}/>
                                </Box>
                            </Grid>
                            <Grid item xs={8}>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Typography sx={{ fontWeight: 700 }}>K/D/A</Typography>
                                    <Typography sx={{ fontWeight: 700 }}>3.00:1 KDA</Typography>
                                </Box>
                                <Typography>222CS (8.1 Cs/pm)</Typography>
                            </Grid>
                            {/* Parte de abajo */}
                            <Grid container item xs={12} spacing={1}>
                                <Grid item xs={1.7}>
                                    {items[0] ? (<img src={items[0]} alt="First Item" style={{ width: "32px", height: "32px", marginTop: "3px", marginLeft: "0px", borderRadius: "4px" }}/>)
                                    :
                                    (<div style={{ width: "32px", height: "32px", marginTop: "3px", marginLeft: "0px", borderRadius: "4px", backgroundColor: "rgba(0, 0, 0, 0.7)" }}/>)}
                                </Grid>
                                <Grid item xs={1.7}>
                                    {items[1] ? (<img src={items[1]} alt="Second Item" style={{ width: "32px", height: "32px", marginTop: "3px", marginLeft: "0px", borderRadius: "4px" }}/>)
                                    :
                                    (<div style={{ width: "32px", height: "32px", marginTop: "3px", marginLeft: "0px", borderRadius: "4px", backgroundColor: "rgba(0, 0, 0, 0.7)" }}/>)}
                                </Grid>
                                <Grid item xs={1.7}>
                                    {items[2] ? (<img src={items[2]} alt="Second Item" style={{ width: "32px", height: "32px", marginTop: "3px", marginLeft: "0px", borderRadius: "4px" }}/>)
                                    :
                                    (<div style={{ width: "32px", height: "32px", marginTop: "3px", marginLeft: "0px", borderRadius: "4px", backgroundColor: "rgba(0, 0, 0, 0.7)" }}/>)}
                                </Grid>
                                <Grid item xs={1.7}>
                                    {items[3] ? (<img src={items[3]} alt="Second Item" style={{ width: "32px", height: "32px", marginTop: "3px", marginLeft: "0px", borderRadius: "4px" }}/>)
                                    :
                                    (<div style={{ width: "32px", height: "32px", marginTop: "3px", marginLeft: "0px", borderRadius: "4px", backgroundColor: "rgba(0, 0, 0, 0.7)" }}/>)}
                                </Grid>
                                <Grid item xs={1.7}>
                                    {items[4] ? (<img src={items[4]} alt="Second Item" style={{ width: "32px", height: "32px", marginTop: "3px", marginLeft: "0px", borderRadius: "4px" }}/>)
                                    :
                                    (<div style={{ width: "32px", height: "32px", marginTop: "3px", marginLeft: "0px", borderRadius: "4px", backgroundColor: "rgba(0, 0, 0, 0.7)" }}/>)}
                                </Grid>
                                <Grid item xs={1.7}>
                                    {items[5] ? (<img src={items[5]} alt="Second Item" style={{ width: "32px", height: "32px", marginTop: "3px", marginLeft: "0px", borderRadius: "4px" }}/>)
                                    :
                                    (<div style={{ width: "32px", height: "32px", marginTop: "3px", marginLeft: "0px", borderRadius: "4px", backgroundColor: "rgba(0, 0, 0, 0.7)" }}/>)}
                                </Grid>
                                <Grid item xs={1.7}>
                                    <img src={items[6]} alt="Second Item" style={{ width: "32px", height: "32px", marginTop: "3px", marginLeft: "0px", borderRadius: "12px" }}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Grid 4 */}
                    <Grid item xs={3.5} sx={{ padding: 2, height: "150px" }}>
                        <Grid container spacing={1} alignItems="center">
                            {/* Grid Equipo Azul */}
                            <Grid item xs={6}>
                                <Grid container spacing={0.2} alignItems="center" direction="row">
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'start', gap: 0.5 }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[0].championId)} sx={{ width: "20px", height: "20px" }}/>
                                        <Typography sx={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontStyle: "italic" }} color="rgba(256, 256, 256, 0.7)">{info.participants[0].riotIdGameName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'start', gap: 0.5 }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[1].championId)} sx={{ width: "20px", height: "20px" }}/>
                                        <Typography sx={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontStyle: "italic" }} color="rgba(256, 256, 256, 0.7)">{info.participants[1].riotIdGameName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'start', gap: 0.5 }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[2].championId)} sx={{ width: "20px", height: "20px" }}/>
                                        <Typography sx={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontStyle: "italic" }} color="rgba(256, 256, 256, 0.7)">{info.participants[2].riotIdGameName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'start', gap: 0.5 }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[3].championId)} sx={{ width: "20px", height: "20px" }}/>
                                        <Typography sx={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontStyle: "italic" }} color="rgba(256, 256, 256, 0.7)">{info.participants[3].riotIdGameName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'start', gap: 0.5 }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[4].championId)} sx={{ width: "20px", height: "20px" }}/>
                                        <Typography sx={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontStyle: "italic" }} color="rgba(256, 256, 256, 0.7)">{info.participants[4].riotIdGameName}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Grid Equipo Rojo */}
                            <Grid item xs={6}>
                                <Grid container spacing={0.2} alignItems="center" direction="row">
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'start', gap: 0.5 }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[5].championId)} sx={{ width: "20px", height: "20px" }}/>
                                        <Typography sx={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontStyle: "italic" }} color="rgba(256, 256, 256, 0.7)">{info.participants[5].riotIdGameName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'start', gap: 0.5 }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[6].championId)} sx={{ width: "20px", height: "20px" }}/>
                                        <Typography sx={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontStyle: "italic" }} color="rgba(256, 256, 256, 0.7)">{info.participants[6].riotIdGameName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'start', gap: 0.5 }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[7].championId)} sx={{ width: "20px", height: "20px" }}/>
                                        <Typography sx={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontStyle: "italic" }} color="rgba(256, 256, 256, 0.7)">{info.participants[7].riotIdGameName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'start', gap: 0.5 }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[8].championId)} sx={{ width: "20px", height: "20px" }}/>
                                        <Typography sx={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontStyle: "italic" }} color="rgba(256, 256, 256, 0.7)">{info.participants[8].riotIdGameName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'start', gap: 0.5 }}>
                                        <Avatar alt="Champion Icon" src={getChampionIconUrl(info.participants[9].championId)} sx={{ width: "20px", height: "20px" }}/>
                                        <Typography sx={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontStyle: "italic" }} color="rgba(256, 256, 256, 0.7)">{info.participants[9].riotIdGameName}</Typography>
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