import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import LoadingSpinner from "./LoadingSpinner";

export default function FavoritesViewer({
    setDisplayedGames, 
    displayedGames,
    spinner,
    setSpinner
}) {

  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setSpinner(true);
    fetch("http://localhost:3000/api/favorites")
      .then((response) => response.json())
      .then((apiData) => {
        setDisplayedGames(apiData);
      })
      .catch((error) => console.log(error));
    
    setTimeout(() => {
      setSpinner(false);
    }, 700)

  }, [updated]);

  function deleteFromFavorites(e) {
    const url = `http://localhost:3000/api/favorites/${e.target.id}`;

    fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
      }
    })
      .then(response => {
          console.log(response);
      })
      .catch(error => {
          console.log(error);
      });

    !updated ? setUpdated(true) : setUpdated(false);
  }

  return (
    <>
      <h1>My Favorites</h1>
      <div className="gamesShown">
        {spinner ? (
          <LoadingSpinner/>
        ) : !spinner && displayedGames &&
          displayedGames.map((game, index) => (
            <Card key={index}>
              <Card.Img
                className="img"
                variant="top"
                src={game.image}
              />
              <Card.Body>
                <Card.Title>{game.title}</Card.Title>
                <Button id={game._id} variant="primary" onClick={deleteFromFavorites}>Delete From Favorites</Button>
              </Card.Body>
            </Card>
          ))}
      </div>
    </>
  );
}
