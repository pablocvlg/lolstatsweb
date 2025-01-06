import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavegationBar";
import SearchPage from "./components/SearchPage";
import SummonerView from "./components/SummonerView";

const App: React.FC = () => {
  const navBarHeight = "5vh";

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }} >
          <NavBar height={navBarHeight} />
        <div style={{ flexGrow: 1, overflow: "auto" }}>
          <Router>
            <Routes>
              <Route path="/" element={<SearchPage/>} />
              <Route path="/summoner/:summonerInfo" element={<SummonerView />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
};

export default App;
