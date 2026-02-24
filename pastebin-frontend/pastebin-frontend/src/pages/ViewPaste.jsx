// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function ViewPaste() {
//   const { id } = useParams();

//   const [content, setContent] = useState("");
//   const [remainingViews, setRemainingViews] = useState(null);
//   const [expiresAt, setExpiresAt] = useState(null);
//   const [error, setError] = useState(false);

//   // useEffect(() => {
//   //   fetch(`http://localhost:8080/api/pastes/${id}`)
//   //     .then((res) => {
//   //       if (!res.ok) {
//   //         setError(true);
//   //         return;
//   //       }
//   //       return res.json();
//   //     })
//   //     .then((data) => {
//   //       if (data) {
//   //         setContent(data.content);
//   //         setRemainingViews(data.remaining_views);
//   //         setExpiresAt(data.expires_at);
//   //       }
//   //     })
//   //     .catch(() => setError(true));
//   // }, [id]);


// const API = import.meta.env.VITE_API_URL;

// useEffect(() => {
//   fetch(`${API}/api/pastes/${id}`)
//     .then((res) => {
//       if (!res.ok) {
//         setError(true);
//         return;
//       }
//       return res.json();
//     })
//     .then((data) => {
//       if (data) {
//         setContent(data.content);
//         setRemainingViews(data.remaining_views);
//         setExpiresAt(data.expires_at);
//       }
//     })
//     .catch(() => setError(true));

     

// }, [id]);
//   if (error) return <h2>Paste Not Found</h2>;

//   return (
//     <div style={{ padding: 40 }}>
//       <h2>Paste Content</h2>

//       <pre>{content}</pre>

//       {remainingViews !== null && (
//         <p>Remaining Views: {remainingViews}</p>
//       )}

//       {expiresAt && (
//         <p>Expires At: {expiresAt}</p>
//       )}
//     </div>
//   );
// }


// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// const API = import.meta.env.VITE_API_URL;

// export default function ViewPaste() {
//   const { id } = useParams();

//   const [content, setContent] = useState("");
//   const [remainingViews, setRemainingViews] = useState(null);
//   const [expiresAt, setExpiresAt] = useState(null);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchPaste = async () => {
//       try {
//         console.log("API:", API);
//         const baseUrl = API.replace(/\/$/, "");
//         console.log("Base URL:", baseUrl);
//         console.log("Fetching paste ID:", id);

//         const res = await fetch(`${baseUrl}/api/pastes/${id}`);
//         console.log("Response status:", res.status);

//         if (!res.ok) {
//           setError(true);
//           return;
//         }

//         const data = await res.json();
//         console.log("Paste data:", data);

//         setContent(data.content);
//         setRemainingViews(data.remaining_views);
//         setExpiresAt(data.expires_at);
//       } catch (err) {
//         console.error("Fetch failed:", err);
//         setError(true);
//       }
//     };
//      console.log("Final URL:", `${baseUrl}/api/pastes/${id}`);

//     fetchPaste();
//   }, [id]);

//   if (error) return <h2>Paste Not Found</h2>;

//   return (
//     <div style={{ padding: 40 }}>
//       <h2>Paste Content</h2>
//       <pre>{content}</pre>
//       {remainingViews !== null && <p>Remaining Views: {remainingViews}</p>}
//       {expiresAt && <p>Expires At: {expiresAt}</p>}
//     </div>
//   );
// }


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function ViewPaste() {
  const { id } = useParams();

  const [content, setContent] = useState("");
  const [remainingViews, setRemainingViews] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        if (!API) {
          console.error("VITE_API_URL is undefined");
          setError(true);
          return;
        }

        const baseUrl = API.replace(/\/$/, "");
        const finalUrl = `${baseUrl}/api/pastes/${id}`;

        console.log("API:", API);
        console.log("Final URL:", finalUrl);

        const res = await fetch(finalUrl);
        console.log("Response status:", res.status);

        if (!res.ok) {
          setError(true);
          return;
        }

        const data = await res.json();
        console.log("Paste data:", data);

        setContent(data.content);
        setRemainingViews(data.remaining_views);
        setExpiresAt(data.expires_at);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError(true);
      }
    };

    fetchPaste();
  }, [id]);

  if (error) return <h2>Paste Not Found</h2>;

  return (
    <div style={{ padding: 40 }}>
      <h2>Paste Content</h2>
      <pre>{content}</pre>
      {remainingViews !== null && <p>Remaining Views: {remainingViews}</p>}
      {expiresAt && <p>Expires At: {expiresAt}</p>}
    </div>
  );
}