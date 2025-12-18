import { useEffect, useState } from "react";

function App() {
  const [fungi, setFungi] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/fungi")
      .then(res => res.json())
      .then(data => setFungi(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🍄 FungiLib</h1>

      {fungi.length === 0 && <p>No fungi found.</p>}

      <ul>
        {fungi.map(f => (
          <li key={f.id}>
            <strong>{f.commonName || "Unnamed fungus"}</strong>
            <br />
            <em>{f.scientificName}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
