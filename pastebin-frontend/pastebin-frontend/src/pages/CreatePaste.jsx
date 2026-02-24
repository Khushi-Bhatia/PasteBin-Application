import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createPaste = async () => {
    setErrorMessage("");
    if (!content.trim()) {
      alert("Content cannot be empty");
      return;
    }

    const body = {
      content,
      ttl_seconds: ttl ? parseInt(ttl) : null,
      max_views: maxViews ? parseInt(maxViews) : null,
    };

    try {
      setLoading(true);
      const baseUrl = API.replace(/\/$/, "");

      const response = await fetch(`${baseUrl}/api/pastes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const text = await response.text();
        setErrorMessage(`Error creating paste: ${text}`);
        setLoading(false);
        return;
      }

      const data = await response.json();
      const shareUrl = `${window.location.origin}/p/${data.id}`;
      setResultUrl(shareUrl);
      setLoading(false);
    } catch (error) {
      console.error("Fetch failed:", error);
      setErrorMessage("Server not reachable or CORS issue");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: "0 auto" }}>
      <h2>Create a New Paste</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste your text here..."
        rows={8}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <input
        type="number"
        value={ttl}
        onChange={(e) => setTtl(e.target.value)}
        placeholder="Time to live (seconds)"
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <input
        type="number"
        value={maxViews}
        onChange={(e) => setMaxViews(e.target.value)}
        placeholder="Max views"
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <button
        onClick={createPaste}
        disabled={loading}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        {loading ? "Creating..." : "Create Paste"}
      </button>

      {resultUrl && (
        <div style={{ marginTop: 20 }}>
          <strong>Share URL:</strong>{" "}
          <a href={resultUrl} target="_blank" rel="noopener noreferrer">
            {resultUrl}
          </a>
        </div>
      )}
      {errorMessage && (
        <div style={{ marginTop: 20, color: "red" }}>{errorMessage}</div>
      )}
    </div>
  );
}