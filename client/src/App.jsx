import { useState } from "react";
import "./index.css";
import Header from "./components/Header";
import GameViewer from "./components/GameViewer";
import Navbar from "./components/Navbar";
import FilterViewer from "./components/FilterViewer";
import FavoritesViewer from "./components/FavoritesViewer";

function getDay() {
  let today = new Date();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();

  if (mm < 10) {
    mm = "0" + mm;
  }

  const getDaysInAmonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const lastMonth = () => {
    if (mm === "01") {
      return "12";
    } else {
      let month = parseInt(mm) - 1;
      if (month < 10) {
        month = "0" + month;
      }
      return month;
    }
  };
  const timeSpan =
    yyyy +
    "-" +
    lastMonth() +
    "-01," +
    yyyy +
    "-" +
    mm +
    "-" +
    getDaysInAmonth(yyyy, mm);

  return timeSpan;
}

function App() {
  const [displayedGames, setDisplayedGames] = useState(null);
  const [gamesLink, setGamesLink] = useState(
    `https://api.rawg.io/api/games?key=4474495b783c48b5884e25f85041d842&dates=${getDay()}&metacritic=70,100`
  );
  const [filterName, setFilterName] = useState("New & Trending");
  const [filterLink, setFilterLink] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [spinner, setSpinner] = useState(false);

  return (
    <>
      <Header
        setFilterLink={setFilterLink}
        setGamesLink={setGamesLink}
        setShowFavorites={setShowFavorites}
        setFilterName={setFilterName}
      />
      <Navbar
        setGamesLink={setGamesLink}
        setFilterName={setFilterName}
        setFilterLink={setFilterLink}
        setFilterCategory={setFilterCategory}
        setShowFavorites={setShowFavorites}
      />
      {!filterLink && !showFavorites ? (
        <GameViewer
          setDisplayedGames={setDisplayedGames}
          displayedGames={displayedGames}
          setGamesLink={setGamesLink}
          gamesLink={gamesLink}
          filterName={filterName}
          spinner={spinner}
          setSpinner={setSpinner}
        />
      ) : filterLink && !showFavorites ? (
        <FilterViewer
          filterLink={filterLink}
          filterCategory={filterCategory}
          setFilterLink={setFilterLink}
          setFilterName={setFilterName}
          setGamesLink={setGamesLink}
          spinner={spinner}
          setSpinner={setSpinner}
        />
      ) : (
        !filterLink &&
        showFavorites && (
          <FavoritesViewer
            setDisplayedGames={setDisplayedGames}
            displayedGames={displayedGames}
            spinner={spinner}
            setSpinner={setSpinner}
          />
        )
      )}
    </>
  );
}

export default App;
