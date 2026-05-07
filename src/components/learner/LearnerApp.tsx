"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const LEARNER_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap";

const LEARNER_STYLES = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ink: #1a1714;
    --ink2: #4a453f;
    --ink3: #8a8079;
    --cream: #f5f0e8;
    --cream2: #ede7d9;
    --cream3: #e2d9c8;
    --accent: #c8401a;
    --accent2: #e8622e;
    --gold: #c9963a;
    --green: #2d6a4f;
    --green2: #40916c;
    --blue: #2d5a87;
    --card: #faf7f2;
    --border: rgba(26,23,20,0.12);
    --font-display: 'Playfair Display', Georgia, serif;
    --font-body: 'DM Sans', sans-serif;
    --r: 12px;
    --shadow: 0 2px 16px rgba(26,23,20,0.08);
    --shadow-lg: 0 8px 40px rgba(26,23,20,0.14);
  }
  html, body { height: 100%; background: var(--cream); color: var(--ink); font-family: var(--font-body); }

  .app { display: flex; height: 100vh; overflow: hidden; }

  .sidebar {
    width: 220px; flex-shrink: 0;
    background: var(--ink);
    display: flex; flex-direction: column;
    padding: 28px 0;
    position: relative; z-index: 10;
  }
  .sidebar-logo {
    padding: 0 24px 28px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    margin-bottom: 20px;
  }
  .sidebar-logo .logo-de {
    font-family: var(--font-display); font-size: 22px; font-weight: 700;
    color: #fff; letter-spacing: -0.5px;
  }
  .sidebar-logo .logo-sub {
    font-size: 10px; font-weight: 500; letter-spacing: 2px;
    text-transform: uppercase; color: var(--ink3); margin-top: 2px;
  }
  .nav-section { padding: 0 12px; margin-bottom: 4px; }
  .nav-label {
    font-size: 9px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
    color: rgba(255,255,255,0.3); padding: 0 12px; margin-bottom: 6px;
  }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: 8px;
    font-size: 13.5px; font-weight: 400; color: rgba(255,255,255,0.6);
    cursor: pointer; transition: all 0.18s; margin-bottom: 2px;
    border: none; background: none; width: 100%; text-align: left;
  }
  .nav-item:hover { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.9); }
  .nav-item.active { background: var(--accent); color: #fff; font-weight: 500; }
  .nav-item .nav-icon { font-size: 16px; width: 20px; text-align: center; }
  .nav-item .badge {
    margin-left: auto; background: rgba(255,255,255,0.15);
    font-size: 10px; padding: 1px 7px; border-radius: 20px; font-weight: 500;
  }
  .nav-item.active .badge { background: rgba(255,255,255,0.25); }
  .sidebar-bottom {
    margin-top: auto; padding: 16px 12px 0;
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .topbar {
    height: 60px; background: var(--card);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center;
    padding: 0 32px; gap: 16px; flex-shrink: 0;
  }
  .topbar-title { font-family: var(--font-display); font-size: 18px; font-weight: 600; flex: 1; }
  .topbar-tag-filter {
    display: flex; gap: 6px; align-items: center;
  }
  .tag-chip {
    padding: 4px 12px; border-radius: 20px;
    font-size: 11px; font-weight: 500; cursor: pointer; transition: all 0.15s;
    border: 1.5px solid var(--border);
    background: transparent; color: var(--ink2);
  }
  .tag-chip.active { background: var(--ink); color: #fff; border-color: var(--ink); }
  .tag-chip:hover:not(.active) { border-color: var(--ink2); }
  .progress-pill {
    font-size: 12px; font-weight: 500; color: var(--ink3);
    background: var(--cream2); padding: 5px 14px; border-radius: 20px;
  }
  .content { flex: 1; overflow-y: auto; padding: 32px; }

  .flashcard-scene {
    display: flex; flex-direction: column; align-items: center;
    gap: 32px; padding: 20px 0;
  }
  .card-counter { font-size: 13px; color: var(--ink3); font-weight: 500; }
  .flashcard-wrap {
    width: 480px; height: 280px;
    perspective: 1200px; cursor: pointer;
  }
  .flashcard-inner {
    width: 100%; height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.55s cubic-bezier(.4,0,.2,1);
    position: relative;
  }
  .flashcard-inner.flipped { transform: rotateY(180deg); }
  .flashcard-face {
    position: absolute; inset: 0;
    backface-visibility: hidden;
    border-radius: 20px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 12px;
    box-shadow: var(--shadow-lg);
  }
  .flashcard-front {
    background: var(--card);
    border: 1.5px solid var(--border);
  }
  .flashcard-back {
    background: var(--ink);
    transform: rotateY(180deg);
  }
  .card-hint { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--ink3); }
  .card-back-hint { color: rgba(255,255,255,0.35); }
  .card-word { font-family: var(--font-display); font-size: 32px; font-weight: 600; color: var(--ink); text-align: center; padding: 0 32px; }
  .card-def { font-family: var(--font-display); font-size: 26px; font-weight: 400; color: #fff; text-align: center; padding: 0 32px; }
  .card-example { font-size: 13px; color: rgba(255,255,255,0.55); text-align: center; padding: 0 32px; font-style: italic; }
  .card-tags { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
  .card-tag-small { font-size: 10px; font-weight: 500; padding: 3px 10px; border-radius: 10px; background: var(--cream2); color: var(--ink2); }
  .flashcard-actions { display: flex; align-items: center; gap: 12px; }
  .btn-icon {
    width: 48px; height: 48px; border-radius: 50%;
    border: 1.5px solid var(--border);
    background: var(--card); color: var(--ink2);
    font-size: 20px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.15s;
  }
  .btn-icon:hover { background: var(--cream2); border-color: var(--ink3); }
  .btn-icon.danger:hover { background: #fef2f0; border-color: var(--accent); color: var(--accent); }
  .btn-icon.success:hover { background: #f0faf5; border-color: var(--green); color: var(--green); }
  .btn-primary {
    padding: 12px 28px; border-radius: 10px;
    background: var(--ink); color: #fff;
    border: none; font-size: 13.5px; font-weight: 500; font-family: var(--font-body);
    cursor: pointer; transition: all 0.15s;
  }
  .btn-primary:hover { background: #2d2926; }
  .btn-accent {
    padding: 12px 28px; border-radius: 10px;
    background: var(--accent); color: #fff;
    border: none; font-size: 13.5px; font-weight: 500; font-family: var(--font-body);
    cursor: pointer; transition: all 0.15s;
  }
  .btn-accent:hover { background: var(--accent2); }
  .revise-btn {
    padding: 8px 18px; border-radius: 8px;
    border: 1.5px solid var(--gold);
    background: transparent; color: var(--gold);
    font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s;
    font-family: var(--font-body);
  }
  .revise-btn.added { background: var(--gold); color: #fff; }
  .revise-btn:hover { background: rgba(201,150,58,0.1); }
  .revise-btn.added:hover { background: #b8862e; }
  .flip-hint { font-size: 12px; color: var(--ink3); }

  .quiz-scene { max-width: 640px; margin: 0 auto; }
  .quiz-progress-bar {
    height: 4px; background: var(--cream3); border-radius: 2px;
    margin-bottom: 32px; overflow: hidden;
  }
  .quiz-progress-fill { height: 100%; background: var(--accent); border-radius: 2px; transition: width 0.3s; }
  .quiz-q-label { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--ink3); margin-bottom: 12px; }
  .quiz-word { font-family: var(--font-display); font-size: 36px; font-weight: 600; margin-bottom: 8px; }
  .quiz-example { font-size: 14px; color: var(--ink3); margin-bottom: 36px; font-style: italic; }
  .quiz-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
  .quiz-option {
    padding: 18px 20px; border-radius: 12px;
    border: 1.5px solid var(--border); background: var(--card);
    font-size: 14px; font-weight: 400; color: var(--ink);
    cursor: pointer; transition: all 0.18s; text-align: left;
    font-family: var(--font-body);
  }
  .quiz-option:hover:not(:disabled) { border-color: var(--ink); background: var(--cream2); }
  .quiz-option.correct { border-color: var(--green); background: #f0faf5; color: var(--green); font-weight: 500; }
  .quiz-option.wrong { border-color: var(--accent); background: #fef2f0; color: var(--accent); font-weight: 500; }
  .quiz-option:disabled { cursor: default; }
  .quiz-next { display: flex; justify-content: flex-end; }
  .quiz-result {
    text-align: center; padding: 48px 32px;
    background: var(--card); border-radius: 20px;
    border: 1.5px solid var(--border);
  }
  .quiz-score { font-family: var(--font-display); font-size: 72px; font-weight: 700; color: var(--accent); }
  .quiz-score-label { font-size: 16px; color: var(--ink2); margin-top: 8px; margin-bottom: 32px; }

  .grammar-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grammar-card {
    background: var(--card); border-radius: 16px;
    border: 1.5px solid var(--border);
    padding: 24px; cursor: pointer;
    transition: all 0.2s; box-shadow: var(--shadow);
  }
  .grammar-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); border-color: rgba(26,23,20,0.2); }
  .grammar-card-title { font-family: var(--font-display); font-size: 20px; font-weight: 600; margin-bottom: 8px; }
  .grammar-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
  .grammar-tag {
    font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
    padding: 3px 10px; border-radius: 20px;
    background: var(--cream2); color: var(--ink2);
  }
  .grammar-preview { font-size: 13px; color: var(--ink3); line-height: 1.6; }
  .grammar-rule-body {
    background: var(--card); border-radius: 20px; padding: 40px;
    border: 1.5px solid var(--border);
    font-size: 15px; line-height: 1.8; color: var(--ink2);
  }
  .grammar-rule-body strong { color: var(--ink); font-weight: 600; }
  .grammar-rule-body u { text-underline-offset: 3px; color: var(--ink); }
  .grammar-rule-body blockquote {
    border-left: 3px solid var(--accent); padding: 12px 20px;
    background: var(--cream2); border-radius: 0 8px 8px 0;
    margin: 16px 0; font-style: italic; color: var(--ink);
  }
  .back-btn {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 500; color: var(--ink3);
    background: none; border: none; cursor: pointer;
    padding: 0; font-family: var(--font-body);
    margin-bottom: 24px; transition: color 0.15s;
  }
  .back-btn:hover { color: var(--ink); }

  .revise-empty {
    text-align: center; padding: 80px 32px;
    color: var(--ink3);
  }
  .revise-empty .empty-icon { font-size: 48px; margin-bottom: 16px; }
  .revise-list { display: flex; flex-direction: column; gap: 12px; }
  .revise-item {
    background: var(--card); border-radius: 14px;
    border: 1.5px solid var(--border);
    padding: 20px 24px;
    display: flex; align-items: center; gap: 16px;
  }
  .revise-item-type {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .revise-item-type.vocab { background: #fef2f0; }
  .revise-item-type.grammar { background: #f0f7ff; }
  .revise-item-word { font-weight: 600; font-size: 15px; color: var(--ink); }
  .revise-item-def { font-size: 13px; color: var(--ink3); margin-top: 2px; }
  .remove-btn {
    margin-left: auto; background: none; border: none;
    color: var(--ink3); font-size: 18px; cursor: pointer;
    padding: 6px; border-radius: 6px; transition: all 0.15s;
  }
  .remove-btn:hover { background: #fef2f0; color: var(--accent); }

  .content::-webkit-scrollbar { width: 6px; }
  .content::-webkit-scrollbar-track { background: transparent; }
  .content::-webkit-scrollbar-thumb { background: var(--cream3); border-radius: 3px; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  .animate-in { animation: fadeUp 0.35s ease both; }
`;

const SAMPLE_VOCAB = [
  { id: 1, word: "die Verantwortung", definition: "responsibility", example: "Er trägt die Verantwortung für das Projekt.", tags: ["nouns", "work"] },
  { id: 2, word: "sich entscheiden", definition: "to decide", example: "Sie hat sich für die rote Jacke entschieden.", tags: ["verbs", "daily"] },
  { id: 3, word: "die Gelegenheit", definition: "opportunity", example: "Das ist eine gute Gelegenheit zum Lernen.", tags: ["nouns", "abstract"] },
  { id: 4, word: "überzeugen", definition: "to convince", example: "Er konnte mich von seiner Idee überzeugen.", tags: ["verbs", "communication"] },
  { id: 5, word: "die Umgebung", definition: "surroundings / environment", example: "Ich liebe die Umgebung von München.", tags: ["nouns", "nature"] },
  { id: 6, word: "sich gewöhnen an", definition: "to get used to", example: "Ich habe mich ans Frühaufstehen gewöhnt.", tags: ["verbs", "daily"] },
  { id: 7, word: "die Erfahrung", definition: "experience", example: "Das war eine wichtige Erfahrung für mich.", tags: ["nouns", "abstract"] },
  { id: 8, word: "bemerken", definition: "to notice", example: "Ich habe sofort den Fehler bemerkt.", tags: ["verbs", "perception"] },
];

const GRAMMAR_RULES = [
  {
    id: 1,
    title: "Konjunktiv II",
    tags: ["mood", "subjunctive"],
    body: `<p>Used to express <strong>hypothetical situations</strong>, wishes, and polite requests.</p>
<p><u>Formation:</u> würde + Infinitiv <em>or</em> strong verb forms.</p>
<blockquote>Wenn ich Zeit hätte, würde ich mehr lesen.</blockquote>
<p>Common irregular forms: <strong>wäre</strong> (sein), <strong>hätte</strong> (haben), <strong>könnte</strong> (können)</p>`,
  },
  {
    id: 2,
    title: "Relativsätze",
    tags: ["clauses", "relative"],
    body: `<p><strong>Relative clauses</strong> add information about a noun using relative pronouns.</p>
<p><u>Nominative:</u> der / die / das &nbsp; <u>Accusative:</u> den / die / das &nbsp; <u>Dative:</u> dem / der / dem</p>
<blockquote>Das ist der Mann, <strong>der</strong> jeden Tag hier vorbeiläuft.</blockquote>`,
  },
  {
    id: 3,
    title: "Passiv Präsens",
    tags: ["voice", "passive"],
    body: `<p>The <strong>passive voice</strong> focuses on the action rather than the actor.</p>
<p><u>Formation:</u> werden (conjugated) + Partizip II</p>
<blockquote>Das Buch <strong>wird</strong> von vielen Menschen <strong>gelesen</strong>.</blockquote>`,
  },
];

const QUIZ_QUESTIONS = SAMPLE_VOCAB.slice(0, 5).map((entry) => ({
  id: entry.id,
  word: entry.word,
  correct: entry.definition,
  options: [entry.definition, "to forget", "the journey", "carefully"].sort(() => Math.random() - 0.5),
}));

function FlashcardsView({ reviseSet, setReviseSet }: { reviseSet: Set<number>; setReviseSet: React.Dispatch<React.SetStateAction<Set<number>>> }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [activeTag, setActiveTag] = useState("all");

  const allTags = ["all", ...new Set(SAMPLE_VOCAB.flatMap((entry) => entry.tags))];
  const filtered = activeTag === "all" ? SAMPLE_VOCAB : SAMPLE_VOCAB.filter((entry) => entry.tags.includes(activeTag));
  const card = filtered[idx % filtered.length];
  const isRevised = card ? reviseSet.has(card.id) : false;

  const next = () => {
    setFlipped(false);
    setTimeout(() => setIdx((current) => (current + 1) % filtered.length), 150);
  };
  const prev = () => {
    setFlipped(false);
    setTimeout(() => setIdx((current) => (current - 1 + filtered.length) % filtered.length), 150);
  };
  const toggleRevise = () =>
    setReviseSet((current) => {
      if (!card) return current;
      const nextSet = new Set(current);
      nextSet.has(card.id) ? nextSet.delete(card.id) : nextSet.add(card.id);
      return nextSet;
    });

  return (
    <div className="flashcard-scene animate-in">
      <div className="topbar-tag-filter" style={{ flexWrap: "wrap", justifyContent: "center" }}>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`tag-chip ${activeTag === tag ? "active" : ""}`}
            onClick={() => {
              setActiveTag(tag);
              setIdx(0);
              setFlipped(false);
            }}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="card-counter">
        {idx + 1} / {filtered.length}
      </div>
      <div className="flashcard-wrap" onClick={() => setFlipped((current) => !current)}>
        <div className={`flashcard-inner ${flipped ? "flipped" : ""}`}>
          <div className="flashcard-face flashcard-front">
            <div className="card-hint">German word</div>
            <div className="card-word">{card?.word}</div>
            <div className="card-tags">
              {card?.tags.map((tag) => (
                <span key={tag} className="card-tag-small">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flip-hint">tap to reveal →</div>
          </div>
          <div className="flashcard-face flashcard-back">
            <div className="card-hint card-back-hint">Definition</div>
            <div className="card-def">{card?.definition}</div>
            <div className="card-example">"{card?.example}"</div>
          </div>
        </div>
      </div>
      <div className="flashcard-actions">
        <button className="btn-icon" onClick={prev}>
          ←
        </button>
        <button
          className={`revise-btn ${isRevised ? "added" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            toggleRevise();
          }}
        >
          {isRevised ? "★ Saved" : "☆ Revise later"}
        </button>
        <button className="btn-icon" onClick={next}>
          →
        </button>
      </div>
    </div>
  );
}

function QuizView() {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUIZ_QUESTIONS[qIdx];

  const choose = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === q.correct) setScore((current) => current + 1);
  };
  const next = () => {
    if (qIdx + 1 >= QUIZ_QUESTIONS.length) {
      setDone(true);
      return;
    }
    setSelected(null);
    setQIdx((current) => current + 1);
  };
  const restart = () => {
    setQIdx(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  if (done)
    return (
      <div className="quiz-scene animate-in">
        <div className="quiz-result">
          <div className="quiz-score">
            {score}/{QUIZ_QUESTIONS.length}
          </div>
          <div className="quiz-score-label">
            {score >= 4 ? "Ausgezeichnet! 🎉" : score >= 2 ? "Gut gemacht! Keep going." : "Üb weiter! You'll get there."}
          </div>
          <button className="btn-accent" onClick={restart}>
            Try again
          </button>
        </div>
      </div>
    );

  return (
    <div className="quiz-scene animate-in">
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${(qIdx / QUIZ_QUESTIONS.length) * 100}%` }} />
      </div>
      <div className="quiz-q-label">
        Question {qIdx + 1} of {QUIZ_QUESTIONS.length}
      </div>
      <div className="quiz-word">{q.word}</div>
      <div className="quiz-options">
        {q.options.map((opt) => (
          <button
            key={opt}
            className={`quiz-option ${selected ? (opt === q.correct ? "correct" : opt === selected ? "wrong" : "") : ""}`}
            onClick={() => choose(opt)}
            disabled={!!selected}
          >
            {opt}
          </button>
        ))}
      </div>
      {selected && (
        <div className="quiz-next">
          <button className="btn-primary" onClick={next}>
            {qIdx + 1 >= QUIZ_QUESTIONS.length ? "See results" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}

function GrammarView() {
  const [active, setActive] = useState<(typeof GRAMMAR_RULES)[number] | null>(null);
  if (active)
    return (
      <div className="animate-in">
        <button className="back-btn" onClick={() => setActive(null)}>
          ← Back to rules
        </button>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600, marginBottom: 10 }}>{active.title}</div>
          <div className="grammar-tags">
            {active.tags.map((tag) => (
              <span key={tag} className="grammar-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="grammar-rule-body" dangerouslySetInnerHTML={{ __html: active.body }} />
      </div>
    );
  return (
    <div className="grammar-grid animate-in">
      {GRAMMAR_RULES.map((rule) => (
        <div key={rule.id} className="grammar-card" onClick={() => setActive(rule)}>
          <div className="grammar-card-title">{rule.title}</div>
          <div className="grammar-tags">
            {rule.tags.map((tag) => (
              <span key={tag} className="grammar-tag">
                {tag}
              </span>
            ))}
          </div>
          <div
            className="grammar-preview"
            dangerouslySetInnerHTML={{ __html: rule.body.replace(/<[^>]+>/g, " ").slice(0, 100) + "…" }}
          />
        </div>
      ))}
    </div>
  );
}

function ReviseView({ reviseSet, setReviseSet }: { reviseSet: Set<number>; setReviseSet: React.Dispatch<React.SetStateAction<Set<number>>> }) {
  const items = SAMPLE_VOCAB.filter((entry) => reviseSet.has(entry.id));
  if (items.length === 0)
    return (
      <div className="revise-empty animate-in">
        <div className="empty-icon">☆</div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Nothing saved yet</div>
        <div style={{ fontSize: 14 }}>Hit "Revise later" on any flashcard to save it here.</div>
      </div>
    );
  return (
    <div className="animate-in">
      <div style={{ fontSize: 13, color: "var(--ink3)", marginBottom: 20 }}>
        {items.length} word{items.length !== 1 ? "s" : ""} to revise
      </div>
      <div className="revise-list">
        {items.map((entry) => (
          <div key={entry.id} className="revise-item">
            <div className="revise-item-type vocab">📖</div>
            <div>
              <div className="revise-item-word">{entry.word}</div>
              <div className="revise-item-def">{entry.definition}</div>
            </div>
            <button
              className="remove-btn"
              onClick={() =>
                setReviseSet((current) => {
                  const nextSet = new Set(current);
                  nextSet.delete(entry.id);
                  return nextSet;
                })
              }
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

type LearnerPage = "learn" | "quiz" | "grammar" | "revise";

export default function LearnerApp({ initialPage = "learn" }: { initialPage?: LearnerPage }) {
  const router = useRouter();
  const { logout } = useAuth();
  const [page, setPage] = useState<LearnerPage>(initialPage);
  const [reviseSet, setReviseSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    const existingLink = document.querySelector<HTMLLinkElement>("link[data-learner-font]");
    const existingStyle = document.querySelector<HTMLStyleElement>("style[data-learner-style]");

    const link = existingLink ?? document.createElement("link");
    link.rel = "stylesheet";
    link.href = LEARNER_FONTS_URL;
    link.dataset.learnerFont = "true";
    if (!existingLink) document.head.appendChild(link);

    const style = existingStyle ?? document.createElement("style");
    style.textContent = LEARNER_STYLES;
    style.dataset.learnerStyle = "true";
    if (!existingStyle) document.head.appendChild(style);

    return () => {
      if (!existingLink) link.remove();
      if (!existingStyle) style.remove();
    };
  }, []);

  const nav: Array<{ id: LearnerPage; icon: string; label: string; badge?: number | null }> = [
    { id: "learn", icon: "🃏", label: "Flashcards" },
    { id: "quiz", icon: "⚡", label: "Quiz" },
    { id: "grammar", icon: "📐", label: "Grammar" },
    { id: "revise", icon: "☆", label: "Revise Later", badge: reviseSet.size || null },
  ];

  const titles: Record<LearnerPage, string> = {
    learn: "Flashcards",
    quiz: "Quiz",
    grammar: "Grammar Rules",
    revise: "Revise Later",
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-de">Deutsch B1</div>
          <div className="logo-sub">Learning Platform</div>
        </div>
        <div className="nav-section">
          <div className="nav-label">Study</div>
          {nav.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${page === item.id ? "active" : ""}`}
              onClick={() => setPage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
              {item.badge ? <span className="badge">{item.badge}</span> : null}
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <button className="nav-item" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span className="nav-icon">⚙</span> Settings
          </button>
        </div>
      </aside>
      <div className="main">
        <div className="topbar">
          <div className="topbar-title">{titles[page]}</div>
          <div className="progress-pill">🔥 12 day streak</div>
          <Button
            variant="outline"
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
          >
            Log out
          </Button>
        </div>
        <div className="content">
          {page === "learn" && <FlashcardsView reviseSet={reviseSet} setReviseSet={setReviseSet} />}
          {page === "quiz" && <QuizView />}
          {page === "grammar" && <GrammarView />}
          {page === "revise" && <ReviseView reviseSet={reviseSet} setReviseSet={setReviseSet} />}
        </div>
      </div>
    </div>
  );
}
