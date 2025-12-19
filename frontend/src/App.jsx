import { useEffect, useState } from "react";
import { getFungi } from "./api";

function App() {
  const [fungi, setFungi] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFungi()
      .then(setFungi)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🍄 FungiLib</h1>

      {loading && <p>Loading fungi...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && fungi.length === 0 && <p>No fungi found.</p>}

      {!loading && !error && fungi.length > 0 && (
        <ul>
  {fungi.map((f) => (
    <li key={f.id} style={{ marginBottom: "1rem" }}>
      <strong>{f.taxonomy?.commonName || "Unnamed fungus"}</strong>
      <br />
      <em>{f.taxonomy?.scientificName || "Scientific name not set"}</em>
      {f.ecology?.images?.length > 0 && (
        <div style={{ marginTop: "0.5rem" }}>
          <img
  src={f.ecology.images[0]?.replace(/,$/, "")} 
  alt={f.taxonomy?.commonName || "fungus image"}
  style={{ maxWidth: "200px", borderRadius: "8px" }}
/>
        </div>
      )}
    </li>
  ))}
</ul>

      )}
    </div>
  );
}

export default App;
