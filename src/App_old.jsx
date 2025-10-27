import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const API_URL = "https://api.sampleapis.com/coffee/hot";

function App() {
  const [count, setCount] = useState(0);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    
    async function getDrinks() {
      console.log("Retiving drinks");
      const getTheData = await fetch(API_URL); //Anropar APIn
      const parsedData = await getTheData.json(); //Parsar datat JSON => JS Array
  
      setDrinks(parsedData);
    }

    getDrinks()

    return

  }, [count])
 useEffect(()=>{
    //The code
    return ()=>{}// End listniners
  }, []//dependencies
  )

 useEffect(()=>{},[])

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
