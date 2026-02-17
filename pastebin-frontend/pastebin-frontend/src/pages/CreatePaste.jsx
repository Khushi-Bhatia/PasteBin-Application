import { useState } from "react";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  const createPaste = async () => {
    const body = {
      content,
      ttl_seconds: ttl ? parseInt(ttl) : null,
      max_views: maxViews ? parseInt(maxViews) : null,
    };

    const response = await fetch("http://localhost:8080/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      alert("Error creating paste");
      return;
    }

    const data = await response.json();
    setResultUrl(data.url);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Create Paste</h2>

      <textarea
        rows="10"
        cols="60"
        placeholder="Enter text..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="TTL (seconds)"
        value={ttl}
        onChange={(e) => setTtl(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Views"
        value={maxViews}
        onChange={(e) => setMaxViews(e.target.value)}
      />

      <br /><br />

      <button onClick={createPaste}>Create</button>

      {resultUrl && (
        <p>
          Share Link: <a href={resultUrl}>{resultUrl}</a>
        </p>
      )}
    </div>
  );
}
