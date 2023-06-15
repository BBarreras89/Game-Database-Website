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

  const timeSpan =
    yyyy +
    "-" +
    mm +
    "-01," +
    yyyy +
    "-" +
    mm +
    "-" +
    getDaysInAmonth(yyyy, mm);

  return timeSpan;
}

export default function Navbar({
  setGamesLink,
  setFilterName,
  setFilterLink,
  setFilterCategory,
  setShowFavorites,
}) {
  function handleMostPopularFilter(e) {
    setGamesLink(
      "https://api.rawg.io/api/games?key=4474495b783c48b5884e25f85041d842&metacritic=80,100"
    );
    setFilterName("Most Popular");
    setFilterLink(null);
    setShowFavorites(false);
  }

  function handleNewReleasesFilter(e) {
    setGamesLink(
      `https://api.rawg.io/api/games?key=4474495b783c48b5884e25f85041d842&dates=${getDay()}`
    );
    setFilterName("New & Upcoming");
    setFilterLink(null);
    setShowFavorites(false);
  }

  function handleGenresFilter(e) {
    setFilterLink(
      "https://api.rawg.io/api/genres?key=4474495b783c48b5884e25f85041d842"
    );
    setFilterCategory("genres");
    setShowFavorites(false);
  }

  function handlePlatformsFilter(e) {
    setFilterLink(
      "https://api.rawg.io/api/platforms?key=4474495b783c48b5884e25f85041d842"
    );
    setFilterCategory("platforms");
    setShowFavorites(false);
  }

  return (
    <>
      <div className="navBar">
        <ul>
          <li>
            <button onClick={handleGenresFilter}>Genres</button>
          </li>
          <li>
            <button onClick={handlePlatformsFilter}>Platforms</button>
          </li>
          <li>
            <button onClick={handleNewReleasesFilter}>New Releases</button>
          </li>
          <li>
            <button onClick={handleMostPopularFilter}>Most Popular</button>
          </li>
        </ul>
      </div>
    </>
  );
}
