import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import nlp from "compromise/three";
import notes from "./notes";

function extractPlainTextTerms(o: any) {
  return o.terms.map((t: any) => t.normal).join(" ");
}

function isNotBanned(term: string) {
  return !BANNED_TERMS.some(
    (banned) => banned.toLowerCase() === term.toLowerCase()
  );
}

const BANNED_TERMS = [
  "we",
  "they",
  "I",
  "me",
  "there",
  `it's`,
  `it’s`,
  "it",
  "is",
  "the",
  "our",
];

function extractTerms(note: { title: string; body: string }) {
  return new Set(
    (nlp(note.body).normalize("heavy") as any)
      .match("#Noun")
      .sort("freq")
      .out("json")
      .map(extractPlainTextTerms)
      .filter(isNotBanned)
  );
}

function intersection<T>(a: Set<T>, b: Set<T>) {
  return new Set([...a].filter((x) => b.has(x)));
}

function App() {
  const [count, setCount] = useState(0);

  const analysis = notes.map(extractTerms);
  console.log(analysis);

  console.log(intersection(analysis[2], analysis[1]));

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
