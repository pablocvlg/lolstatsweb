import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SearchPage from "./components/SearchPage";
import SummonerView from "./components/SummonerView";

const App: React.FC = () => {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage/>} />
          <Route path="/summoner/:summonerInfo" element={<SummonerView />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
