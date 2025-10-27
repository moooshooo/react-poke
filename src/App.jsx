import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

function App() {
  
  const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=${howMany}&offset=0`;
  const [howMany, setHowMany] = useState("")
  const [pokemons, setPokemons] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  const changeHowMany = () => {
    setHowMany()
  }

  useEffect(() => {
    setIsLoading(true)

    async function getPokemons() {
      console.log("Retiving pokemons");
      const getTheData = await fetch(API_URL);
      const parsedData = await getTheData.json();

      setPokemons(parsedData);
    }
    getPokemons();

    return;
  }, []);

  return (
    <div>
      <h1>Pokemon Loader</h1>
      <input value={howMany} onChange={changeHowMany} />
      <button onClick={}>Hämta Pokemons</button>
      <ProgressBar isLoading={isLoading} />

      <p>Antal Pokémon: {pokemons}</p>
    </div>
  );
}
export default App;
