import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
console.log("Powered by: Mos\n===============")
function App() {
  const [howMany, setHowMany] = useState(7);
  const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=${howMany}&offset=0`;
  const [pokemons, setPokemons] = useState(0);
  const [pokemonName, setPokemonName] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [fetchData, setFetchData] = useState(false);

  const changeHowMany = (e) => {
    setHowMany(e.target.value);
  };
  console.log(`Will load ${howMany} pokemons`)

  useEffect(() => {
    setIsLoading(true);

    async function getPokemons() {
      console.log("Retiving pokemons");
      const getTheData = await fetch(API_URL);
      const parsedData = await getTheData.json();
      setPokemons(parsedData.results.length);
      setPokemonName(parsedData.results)
      console.log(typeof pokemonName)
    }
    getPokemons();
    setIsLoading(false);
   
  }, [fetchData]); //Förstår inte varför ESLint vill ha API_URL här är det för hur jag använt js i strängen?

  return (
    <div>
      <h1>Pokemon Loader</h1>
      <input value={howMany} onChange={changeHowMany} />
      <button onClick={()=> setFetchData(!fetchData)}>Hämta Pokemons</button>
      <ProgressBar isLoading={isLoading} />

      <h5>Antal Pokémon: {pokemons}</h5>
      {pokemonName.map((poke) => poke.name)}
    </div>
  );
}
export default App;
