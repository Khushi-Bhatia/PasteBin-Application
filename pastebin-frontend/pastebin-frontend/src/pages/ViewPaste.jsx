import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ViewPaste() {
  const { id } = useParams();

  const [content, setContent] = useState("");
  const [remainingViews, setRemainingViews] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/pastes/${id}`)
      .then((res) => {
        if (!res.ok) {
          setError(true);
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setContent(data.content);
          setRemainingViews(data.remaining_views);
          setExpiresAt(data.expires_at);
        }
      })
      .catch(() => setError(true));
  }, [id]);

  if (error) return <h2>Paste Not Found</h2>;

  return (
    <div style={{ padding: 40 }}>
      <h2>Paste Content</h2>

      <pre>{content}</pre>

      {remainingViews !== null && (
        <p>Remaining Views: {remainingViews}</p>
      )}

      {expiresAt && (
        <p>Expires At: {expiresAt}</p>
      )}
    </div>
  );
}
