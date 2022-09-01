import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import nlp from "compromise/three";
import notes from "./notes";
import { ForceGraph2D, ForceGraph3D } from "react-force-graph";
import SpriteText from "three-spritetext";
import DOMPurify from "dompurify";
import { marked } from "marked";

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
  "be",
  "our",
  "you",
  "thing",
  "your",
];

type Note = { title: string; body: string };
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

const data = {
  nodes: [
    { id: "A", group: 1 },
    { id: "B", group: 1 },
  ],
  links: [{ source: "A", target: "B", value: "Hello" }],
};

function buildData(notes: Note[]) {
  const analysis = notes.map(extractTerms);

  return {
    nodes: notes.map((n) => ({ id: n.title, note: n, group: 1 })),
    links: notes.flatMap((n, i) => {
      const res: any[] = [];
      notes.forEach((m, j) => {
        if (i === j) return [];

        const overlap = intersection(analysis[i], analysis[j]);
        overlap.forEach((o) => {
          res.push({
            source: n.title,
            target: m.title,
            value: o,
            curvature: 0.2,
          });
        });
      });

      return res;
    }),
  };
}

function hashCode(s: string) {
  var hash = 0,
    i,
    chr;
  if (s.length === 0) return hash;
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function App() {
  const [count, setCount] = useState(0);
  const [selectedNote, setSelectedNode] = useState<any | null>(null);

  const data = useMemo(() => buildData(notes), [notes]);
  const fgRef = useRef();

  const handleClick = useCallback((node: any) => {
    setSelectedNode(node.note);
  }, []);

  return (
    <>
      <ForceGraph3D
        ref={fgRef}
        linkWidth={1}
        onNodeClick={handleClick}
        nodeThreeObject={(node: any) => {
          const sprite = new SpriteText(node.id);
          sprite.color = node.color;
          sprite.textHeight = 6;
          return sprite;
        }}
        nodeLabel="id"
        nodeAutoColorBy="group"
        d3AlphaDecay={0.05}
        linkCurvature="curvature"
        linkThreeObjectExtend={true}
        linkThreeObject={(link: any) => {
          // extend link with text sprite
          const sprite = new SpriteText(`${link.value}`);
          sprite.color = "lightgrey";
          sprite.textHeight = 4;
          return sprite;
        }}
        linkPositionUpdate={(sprite, { start, end }, link) => {
          const k = (hashCode(link.value) % 1024) / 100;
          const middlePos = Object.assign(
            ...["x", "y", "z"].map((c) => ({
              [c]: start[c] + (end[c] - start[c]) / 2 + k,
            }))
          );

          // Position sprite
          Object.assign(sprite.position, middlePos);
          return null;
        }}
        graphData={data}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          padding: "0 16px",
          maxWidth: "320px",
          background: "white",
          color: "black",
          margin: 0,
          borderBottomRightRadius: "8px",
        }}
        dangerouslySetInnerHTML={{
          __html: selectedNote && DOMPurify.sanitize(marked(selectedNote.body)),
        }}
      ></div>
    </>
  );
}

export default App;
