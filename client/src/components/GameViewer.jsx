import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import LoadingSpinner from "./LoadingSpinner";

export default function GameViewer({
  setDisplayedGames,
  displayedGames,
  gamesLink,
  filterName,
  setGamesLink,
  spinner,
  setSpinner
}) {

  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [noGamesFound, setNoGamesFound] = useState(false);
  

  useEffect(() => {
    const pageSize = "15"
    const url = `${gamesLink}&page_size=${pageSize}`
    setSpinner(true);

    fetch(url)
      .then((response) => response.json())
      .then((apiData) => {
        setDisplayedGames(apiData.results);
        setNextPage(apiData.next);
        setPreviousPage(apiData.previous);

        if(apiData.results && apiData.results.length === 0){
          setNoGamesFound(true);
        } else {
          setNoGamesFound(false);
        }

      })
      .catch((error) => console.log(error));

    setTimeout(() => {
      setSpinner(false);
    }, 700)

  }, [gamesLink]);

  function addToFavorites(e) {
    const data = {
      title: e.target.id, 
      image: e.target.dataset.imgsrc
    };

    fetch("http://localhost:3000/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
  }

  function newPage(e){

    e.target.id === "nextButton" ? (
      setGamesLink(nextPage)
    ) : 
    e.target.id === "previousButton" && (
      setGamesLink(previousPage)
    )
    e.target.blur();
    window.scrollTo(0, 0)
  }

  return (
    <>
      <h1>{filterName}</h1>
      { previousPage && <button id="previousButton" onClick={newPage}>Previous</button> }
      { nextPage && <button id="nextButton" onClick={newPage}>Next</button> }
      <div className="gamesShown">
        {
          noGamesFound ? (
            <div>No games found...</div>
          ) : spinner ? (
            <LoadingSpinner/>
          ) : !spinner && displayedGames &&
            displayedGames.map((game, index) => (
              <Card key={index}>
                <Card.Img
                  className="img"
                  variant="top"
                  src={game.background_image}
                />
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
                  <Button id={game.name} data-imgsrc={game.background_image} variant="primary" onClick={addToFavorites}>Add To Favorites</Button>
                </Card.Body>
              </Card>
          ))
        }
      </div>
      { previousPage && <button id="previousButton" onClick={newPage}>Previous</button> }
      { nextPage && <button id="nextButton" onClick={newPage}>Next</button> }
    </>
  );
}
