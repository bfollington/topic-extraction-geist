import nlp from "compromise/three";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useCallback, useMemo, useRef, useState } from "react";
import { ForceGraph3D } from "react-force-graph";
import SpriteText from "three-spritetext";
import "./App.css";
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
          // HACK: Use hashcode of text to slightly offset it, prevents overlapping labels
          // hashcode is stable between re-renders so it's useful here
          const k = (hashCode((link as any).value) % 1024) / 100;
          const coords = ["x" as const, "y" as const, "z" as const].map(
            (c) => ({
              [c]: start[c] + (end[c] - start[c]) / 2 + k,
            })
          );
          const middlePos = Object.assign({}, ...coords);

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
