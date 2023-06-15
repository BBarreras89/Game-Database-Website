import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Header({
  setFilterLink,
  setShowFavorites,
  setGamesLink,
  setFilterName,
}) {
  const [inputFieldValue, setInputFieldValue] = useState("");

  function showFavorites() {
    setFilterLink(null);
    setShowFavorites(true);
  }

  function handleUserInput(e) {
    setInputFieldValue(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      searchGames();
    }
  }

  function searchGames(e) {
    const baseURL =
      "https://api.rawg.io/api/games?key=4474495b783c48b5884e25f85041d842&";
    const url = `${baseURL}&search=${inputFieldValue}`;
    setGamesLink(url);
    setFilterLink(false);
    setShowFavorites(false);
    setInputFieldValue("");
    setFilterName("Search Results");
    if (e) {
      e.target.blur();
    }
  }

  return (
    <header className="mb-3">
      <div id="logo">Logo</div>
      <InputGroup className="mb-3">
        <Form.Control
          onKeyDown={handleKeyDown}
          onChange={handleUserInput}
          value={inputFieldValue}
          id="searchField"
          placeholder="Search Games..."
          aria-label="Search"
          aria-describedby="basic-addon2"
        />
        <Button
          onClick={searchGames}
          variant="outline-secondary"
          id="button-addon2">
          Search
        </Button>
        <Button id="favouritesBTN" onClick={showFavorites}>
          Show Favorites
        </Button>
      </InputGroup>
    </header>
  );
}
