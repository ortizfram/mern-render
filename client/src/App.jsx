import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [result, setResult] = useState("");

  const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";

  return (
    <>
      <h1>MERN Render</h1>
      <button
        onClick={async () => {
          const res = await fetch(`${URL}`);
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
