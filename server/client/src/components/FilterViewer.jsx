import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import LoadingSpinner from "./LoadingSpinner";

export default function FilterViewer({
  filterLink,
  setFilterName,
  setFilterLink,
  setGamesLink,
  filterCategory,
  spinner,
  setSpinner
}) {
  const [filterCategories, setFilterCategories] = useState([]);

  const truncatedLink = filterLink.split("?")[0];
  const tempArr = truncatedLink.split("/");
  const name = tempArr[tempArr.length - 1].toUpperCase();

  useEffect(() => {
    setSpinner(true);
    fetch(filterLink)
      .then((response) => response.json())
      .then((apiData) => {
        setFilterCategories(apiData.results);
      })
      .catch((error) => console.log(error));

    setTimeout(() => {
      setSpinner(false);
    }, 700)
  }, [filterLink]);

  function selectFilter(e) {
    console.log(e.target.dataset.console);
    setGamesLink(
      `https://api.rawg.io/api/games?key=4474495b783c48b5884e25f85041d842&${filterCategory}=${e.target.id}`
    );
    setFilterName(`${e.target.dataset.categoryname}-Games`);
    setFilterLink(null);
  }

  return (
    <>
      <h1>{name}</h1>
      <div className="gamesShown">
        {spinner ? (
          <LoadingSpinner/>
        ): !spinner && filterCategories &&
          filterCategories.map((category, index) => (
            <Card key={index}>
              <Card.Img
                className="img"
                variant="top"
                src={category.image_background}
              />
              <Card.Body>
                <Button
                  key={index}
                  data-categoryname={category.name}
                  id={category.id}
                  onClick={selectFilter}
                >
                  {category.name}
                </Button>
              </Card.Body>
            </Card>
          ))}
      </div>
    </>
  );
}
