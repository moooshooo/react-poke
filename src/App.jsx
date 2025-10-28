import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

console.log("Powered by: Mos\n===============");
function App() {
  const [howMany, setHowMany] = useState(3);
  const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=${howMany}&offset=0`;
  const [pokemons, setPokemons] = useState(0);
  const [pokemonInfo, setPokemonInfo] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);
  const [allInfo, setAllInfo] = useState([]);

  useEffect(() => {
    async function getPokemons() {
      console.log("Retiving pokemons");
      const getTheData = await fetch(API_URL);
      const parsedData = await getTheData.json();
      setPokemons(parsedData.results.length);
      setPokemonInfo(parsedData.results);
      //console.log(typeof pokemonName);

      console.log("Retriving more info som second API");

      const detailedData = await Promise.all(
        parsedData.results.map(async (poke) => {
          //Detaljer
          const pokeRes = await fetch(poke.url);
          const pokeData = await pokeRes.json();

          //species
          const speciesRes = await fetch(pokeData.species.url);
          const speciesData = await speciesRes.json();
          return { pokeData, speciesData };
        })
      );
      setAllInfo(detailedData)
      setPokemonData(detailedData.map((d) => d.pokeData));
      setSpeciesData(detailedData.map((d) => d.speciesData));

      console.log("Now you have more info");
      console.log(allInfo);
    }
    setIsLoading(true);
    getPokemons();
  }, [fetchData]); //Förstår inte varför ESLint vill ha API_URL här är det för hur jag använt js i strängen?

  const changeHowMany = (e) => {
    setHowMany(e.target.value);
    setIsLoading(false);
  };
  console.log(`Will load ${howMany} pokemons`);

  return (
    <div>
      <h1>Pokemon Loader</h1>
      <input value={howMany} onChange={changeHowMany} />
      <button onClick={() => setFetchData(!fetchData)}>Hämta Pokemons</button>
      <ProgressBar isLoading={isLoading} />

      <h5>Antal Pokémon: {pokemons}</h5>
      <h6>Heres a list of them</h6>
      <div className="pokemon-holder">
        {pokemonData.map((poke) => (
          <div>
            <p>{poke.name}</p>
            <img src={poke.sprites.front_default} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
