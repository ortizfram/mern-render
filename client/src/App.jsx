import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/navbar2";


function App() {
  const [result, setResult] = useState("");

  const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";

  return (
    <>
    <Navbar />
      <h1>MERN Render</h1>
      <button
        onClick={async () => {
          const res = await fetch(`${URL}`, {
            mode: 'cors',
            credentials: 'include',
          });
          const data = await res.json();
          console.log(data);
          setResult(data);
        }}
      >
        Users
      </button>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </>
  );
}

export default App;
