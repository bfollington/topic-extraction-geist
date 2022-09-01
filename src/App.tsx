import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import nlp from "compromise/three";
import notes from "./notes";
import { ForceGraph2D, ForceGraph3D } from "react-force-graph";
import SpriteText from "three-spritetext";

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
    nodes: notes.map((n) => ({ id: n.title, group: 1 })),
    links: notes.flatMap((n, i) => {
      const res: any[] = [];
      notes.forEach((m, j) => {
        if (i === j) return [];

        const overlap = intersection(analysis[i], analysis[j]);
        console.log(overlap);
        overlap.forEach((o) => {
          res.push({
            source: n.title,
            target: m.title,
            value: o,
            curvature: 0.1 + Math.random() * 0.5,
          });
        });
      });

      return res;
    }),
  };
}

function App() {
  const [count, setCount] = useState(0);

  const data = useMemo(() => buildData(notes), [notes]);

  return (
    <ForceGraph3D
      linkWidth={1}
      nodeThreeObject={(node: any) => {
        const sprite = new SpriteText(node.id);
        sprite.color = node.color;
        sprite.textHeight = 6;
        return sprite;
      }}
      nodeLabel="id"
      nodeAutoColorBy="group"
      linkCurvature="curvature"
      linkThreeObjectExtend={true}
      linkThreeObject={(link: any) => {
        // extend link with text sprite
        const sprite = new SpriteText(`${link.value}`);
        sprite.color = "lightgrey";
        sprite.textHeight = 4;
        return sprite;
      }}
      graphData={data}
    />
  );
}

export default App;
