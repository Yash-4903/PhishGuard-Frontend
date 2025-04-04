import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkPhishing = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://phishguard-api.onrender.com/predict", {
        url: url
      });

      setResult(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult({ error: "Failed to fetch prediction" });
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>PhishGuard - AI Phishing Detection</h1>
      <input 
        type="text" 
        placeholder="Enter URL..." 
        value={url} 
        onChange={(e) => setUrl(e.target.value)} 
        style={{ padding: "10px", width: "300px" }} 
      />
      <button onClick={checkPhishing} style={{ marginLeft: "10px", padding: "10px" }}>
        Check
      </button>

      {loading && <p>Loading...</p>}

      {result && (
        <div>
          <h3>Result:</h3>
          <p>{result.prediction ? "⚠️ Phishing Detected!" : "✅ Safe Website"}</p>
        </div>
      )}
    </div>
  );
}

export default App;
