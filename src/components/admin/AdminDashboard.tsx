"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const ADMIN_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap";

const ADMIN_STYLES = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #f8f7f4;
    --bg2: #ffffff;
    --bg3: #f2f1ed;
    --bg4: #e9e7e2;
    --border: rgba(15, 15, 15, 0.08);
    --border2: rgba(15, 15, 15, 0.14);
    --text: #1a1714;
    --text2: #4a453f;
    --text3: #8a8079;
    --accent: #c8401a;
    --accent2: #e8622e;
    --gold: #c9963a;
    --green: #2d6a4f;
    --blue: #2d5a87;
    --red: #b91c1c;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --font-mono: 'DM Mono', monospace;
    --r: 10px;
  }
  html, body { height: 100%; background: var(--bg); color: var(--text); font-family: var(--font-body); }

  .admin-app { display: flex; height: 100vh; overflow: hidden; }

  .admin-sidebar {
    width: 230px; flex-shrink: 0;
    background: var(--bg2);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    padding: 0;
  }
  .admin-logo {
    padding: 22px 22px 18px;
    border-bottom: 1px solid var(--border);
  }
  .admin-logo-mark {
    font-family: var(--font-display); font-size: 16px; font-weight: 800;
    letter-spacing: -0.5px; color: var(--text);
  }
  .admin-logo-mark span { color: var(--accent); }
  .admin-logo-sub {
    font-size: 10px; font-weight: 500; color: var(--text3);
    letter-spacing: 2px; text-transform: uppercase; margin-top: 3px;
  }
  .admin-nav { padding: 14px 12px; flex: 1; }
  .admin-nav-label {
    font-size: 9px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--text3); padding: 0 10px; margin-bottom: 6px; margin-top: 16px;
  }
  .admin-nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 10px; border-radius: 8px;
    font-size: 13px; font-weight: 400; color: var(--text2);
    cursor: pointer; transition: all 0.15s; margin-bottom: 1px;
    border: none; background: none; width: 100%; text-align: left;
    font-family: var(--font-body);
  }
  .admin-nav-item:hover { background: var(--bg3); color: var(--text); }
  .admin-nav-item.active { background: var(--bg4); color: var(--text); font-weight: 500; }
  .admin-nav-item .dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent); margin-left: auto; flex-shrink: 0;
  }
  .admin-nav-item .count {
    margin-left: auto; font-size: 11px; font-family: var(--font-mono);
    color: var(--text3); background: var(--bg3); padding: 1px 7px; border-radius: 4px;
  }
  .admin-sidebar-bottom {
    padding: 16px 12px;
    border-top: 1px solid var(--border);
  }
  .admin-user-pill {
    display: flex; align-items: center; gap: 10px; padding: 8px 10px;
    border-radius: 8px; background: var(--bg3);
  }
  .admin-avatar {
    width: 28px; height: 28px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--gold));
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #fff;
  }
  .admin-user-name { font-size: 12px; font-weight: 500; color: var(--text2); }

  .admin-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .admin-topbar {
    height: 58px; background: var(--bg2); border-bottom: 1px solid var(--border);
    display: flex; align-items: center; padding: 0 28px; gap: 16px; flex-shrink: 0;
  }
  .admin-topbar-title { font-family: var(--font-display); font-size: 16px; font-weight: 700; flex: 1; }
  .admin-content { flex: 1; overflow-y: auto; padding: 28px; }

  .btn {
    padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.15s; border: none; font-family: var(--font-body);
    display: inline-flex; align-items: center; gap: 7px;
  }
  .btn-primary { background: var(--accent); color: #fff; }
  .btn-primary:hover { background: var(--accent2); }
  .btn-ghost { background: var(--bg3); color: var(--text2); border: 1px solid var(--border); }
  .btn-ghost:hover { background: var(--bg4); color: var(--text); }
  .btn-danger { background: rgba(248,113,113,0.12); color: var(--red); border: 1px solid rgba(248,113,113,0.2); }
  .btn-danger:hover { background: rgba(248,113,113,0.2); }
  .btn-sm { padding: 6px 12px; font-size: 12px; }
  .btn-success { background: rgba(74,222,128,0.12); color: var(--green); border: 1px solid rgba(74,222,128,0.2); }

  .panel {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 14px; overflow: hidden;
  }
  .panel-header {
    padding: 18px 22px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 12px;
  }
  .panel-title { font-family: var(--font-display); font-size: 14px; font-weight: 700; }
  .panel-body { padding: 22px; }

  .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
  .stat-card {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 12px; padding: 18px 20px;
  }
  .stat-label { font-size: 11px; color: var(--text3); font-weight: 500; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .stat-value { font-family: var(--font-display); font-size: 32px; font-weight: 800; line-height: 1; }
  .stat-value.accent { color: var(--accent); }
  .stat-value.gold { color: var(--gold); }
  .stat-value.green { color: var(--green); }
  .stat-value.blue { color: var(--blue); }
  .stat-sub { font-size: 11px; color: var(--text3); margin-top: 6px; }

  .data-table { width: 100%; border-collapse: collapse; }
  .data-table th {
    text-align: left; font-size: 11px; font-weight: 600; color: var(--text3);
    letter-spacing: 1.5px; text-transform: uppercase;
    padding: 12px 16px; border-bottom: 1px solid var(--border);
  }
  .data-table td { padding: 13px 16px; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text2); vertical-align: middle; }
  .data-table tr:last-child td { border-bottom: none; }
  .data-table tr:hover td { background: rgba(255,255,255,0.02); }
  .data-table .word-cell { font-weight: 600; color: var(--text); font-family: var(--font-display); font-size: 14px; }
  .tag-pill {
    display: inline-flex; padding: 2px 9px; border-radius: 20px;
    font-size: 11px; font-weight: 500;
    background: var(--bg4); color: var(--text3);
    border: 1px solid var(--border); margin-right: 4px;
  }
  .actions-cell { display: flex; gap: 6px; }

  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-field { display: flex; flex-direction: column; gap: 6px; }
  .form-field.full { grid-column: 1 / -1; }
  .form-label { font-size: 11px; font-weight: 600; color: var(--text3); letter-spacing: 1px; text-transform: uppercase; }
  .form-input {
    padding: 10px 14px; border-radius: 8px;
    background: var(--bg3); border: 1px solid var(--border);
    color: var(--text); font-size: 13.5px; font-family: var(--font-body);
    outline: none; transition: border-color 0.15s;
  }
  .form-input:focus { border-color: var(--accent); }
  .form-input::placeholder { color: var(--text3); }
  .form-textarea { resize: vertical; min-height: 90px; line-height: 1.6; }
  .tag-input-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  .tag-pill-editable {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 10px; border-radius: 20px;
    font-size: 12px; font-weight: 500;
    background: var(--bg4); color: var(--text2);
    border: 1px solid var(--border2);
  }
  .tag-remove { background: none; border: none; color: var(--text3); cursor: pointer; font-size: 13px; line-height: 1; padding: 0; }
  .tag-remove:hover { color: var(--red); }
  .tag-add-input {
    background: none; border: 1px dashed var(--border2); border-radius: 20px;
    color: var(--text2); font-size: 12px; padding: 4px 12px; outline: none;
    font-family: var(--font-body); width: 100px;
  }
  .tag-add-input:focus { border-color: var(--accent); color: var(--text); }

  .editor-toolbar {
    display: flex; gap: 2px; padding: 8px 10px;
    background: var(--bg3); border-bottom: 1px solid var(--border);
    flex-wrap: wrap;
  }
  .editor-btn {
    padding: 5px 9px; border-radius: 6px; font-size: 12px; font-weight: 600;
    background: none; border: none; color: var(--text3); cursor: pointer; transition: all 0.12s;
    font-family: var(--font-mono);
  }
  .editor-btn:hover { background: var(--bg4); color: var(--text); }
  .editor-btn.active { background: var(--accent); color: #fff; }
  .editor-sep { width: 1px; background: var(--border); margin: 4px 4px; }
  .editor-area {
    min-height: 120px; padding: 14px 16px;
    background: var(--bg3); color: var(--text);
    font-size: 14px; line-height: 1.7; outline: none;
    font-family: var(--font-body);
  }
  .editor-area[contenteditable]:empty::before { content: attr(data-placeholder); color: var(--text3); }

  .upload-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .drop-zone {
    border: 2px dashed var(--border2);
    border-radius: 14px; padding: 40px 28px;
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; text-align: center; gap: 12px;
    cursor: pointer; transition: all 0.2s;
    background: var(--bg2); position: relative; overflow: hidden;
  }
  .drop-zone.dragging { border-color: var(--accent); background: rgba(232,98,46,0.06); }
  .drop-zone.success { border-color: var(--green); border-style: solid; }
  .drop-zone:hover { border-color: var(--border2); background: var(--bg3); }
  .drop-icon { font-size: 36px; line-height: 1; }
  .drop-title { font-family: var(--font-display); font-size: 15px; font-weight: 700; color: var(--text); }
  .drop-sub { font-size: 12px; color: var(--text3); line-height: 1.6; }
  .drop-format {
    font-family: var(--font-mono); font-size: 11px; color: var(--text3);
    background: var(--bg3); border: 1px solid var(--border); border-radius: 6px;
    padding: 6px 12px; text-align: left; width: 100%;
    white-space: pre; overflow-x: auto;
  }
  .upload-file-hidden { display: none; }
  .upload-preview {
    background: var(--bg3); border: 1px solid var(--border);
    border-radius: 10px; overflow: hidden;
  }
  .upload-preview-header {
    padding: 12px 16px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .upload-preview-title { font-size: 12px; font-weight: 600; color: var(--text2); font-family: var(--font-mono); }
  .upload-preview-body {
    max-height: 300px; overflow-y: auto; padding: 12px;
    font-family: var(--font-mono); font-size: 11px; color: var(--text3); line-height: 1.8;
  }
  .upload-preview-body .item-ok { color: var(--green); }
  .upload-preview-body .item-err { color: var(--red); }
  .upload-preview-body .item-warn { color: var(--gold); }
  .progress-bar { height: 3px; background: var(--bg4); border-radius: 2px; overflow: hidden; margin: 8px 0; }
  .progress-fill { height: 100%; background: var(--accent); border-radius: 2px; transition: width 0.4s ease; }
  .upload-stats-row { display: flex; gap: 16px; margin-top: 12px; }
  .upload-stat { font-size: 12px; color: var(--text3); }
  .upload-stat strong { color: var(--text); font-weight: 600; }
  .upload-stat.ok strong { color: var(--green); }
  .upload-stat.err strong { color: var(--red); }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--bg4); border-radius: 3px; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  .animate-in { animation: fadeUp 0.3s ease both; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
  .pulsing { animation: pulse 1.5s ease infinite; }
`;

const VOCAB_DATA = [
  { id: 1, word: "die Verantwortung", definition: "responsibility", example: "Er trägt die Verantwortung.", tags: ["nouns", "work"] },
  { id: 2, word: "sich entscheiden", definition: "to decide", example: "Sie hat sich entschieden.", tags: ["verbs", "daily"] },
  { id: 3, word: "die Gelegenheit", definition: "opportunity", example: "Das ist eine gute Gelegenheit.", tags: ["nouns", "abstract"] },
  { id: 4, word: "überzeugen", definition: "to convince", example: "Er konnte mich überzeugen.", tags: ["verbs"] },
  { id: 5, word: "bemerken", definition: "to notice", example: "Ich habe den Fehler bemerkt.", tags: ["verbs", "perception"] },
];

const GRAMMAR_DATA = [
  { id: 1, title: "Konjunktiv II", tags: ["mood", "subjunctive"], body: "Used for hypothetical situations and polite requests…" },
  { id: 2, title: "Relativsätze", tags: ["clauses"], body: "Relative clauses using der/die/das as pronouns…" },
  { id: 3, title: "Passiv Präsens", tags: ["voice", "passive"], body: "werden + Partizip II for passive constructions…" },
];

const VOCAB_SCHEMA = `[
  {
    "word": "die Verantwortung",
    "definition": "responsibility",
    "example": "Er trägt die Verantwortung.",
    "tags": ["nouns", "work"]
  }
]`;

const GRAMMAR_SCHEMA = `[
  {
    "title": "Konjunktiv II",
    "body": "<p>Used for <strong>hypothetical</strong> situations…</p>",
    "tags": ["mood", "subjunctive"]
  }
]`;

type UploadType = "vocab" | "grammar";

type UploadResult = {
  index: number;
  data: Record<string, unknown> | null;
  ok: boolean;
  error: string | null;
};

type NavItem = {
  id: "overview" | "vocab" | "grammar" | "upload";
  label: string;
  icon: string;
  count?: number;
  dot?: boolean;
};

function parseUploadFile(text: string, type: UploadType): UploadResult[] {
  try {
    const data = JSON.parse(text);
    const arr = Array.isArray(data) ? data : [data];
    const required = type === "vocab" ? ["word", "definition"] : ["title", "body"];
    return arr.map((item, i) => {
      const missing = required.filter((key) => !item[key]);
      return {
        index: i + 1,
        data: item,
        ok: missing.length === 0,
        error: missing.length ? `Missing: ${missing.join(", ")}` : null,
      };
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return [{ index: 0, data: null, ok: false, error: "Invalid JSON: " + message }];
  }
}

function BulkUpload() {
  const [vocabDrag, setVocabDrag] = useState(false);
  const [grammarDrag, setGrammarDrag] = useState(false);
  const [vocabResults, setVocabResults] = useState<UploadResult[] | null>(null);
  const [grammarResults, setGrammarResults] = useState<UploadResult[] | null>(null);
  const [vocabProgress, setVocabProgress] = useState(0);
  const [grammarProgress, setGrammarProgress] = useState(0);
  const [vocabPushing, setVocabPushing] = useState(false);
  const [grammarPushing, setGrammarPushing] = useState(false);
  const vocabInputRef = useRef<HTMLInputElement | null>(null);
  const grammarInputRef = useRef<HTMLInputElement | null>(null);

  const simulatePush = (results: UploadResult[], setProgress: (value: number) => void, setPushing: (value: boolean) => void) => {
    const total = results.filter((result) => result.ok).length;
    if (!total) return;
    setPushing(true);
    let done = 0;
    const step = () => {
      done += 1;
      setProgress(Math.round((done / total) * 100));
      if (done < total) setTimeout(step, 120);
      else {
        setPushing(false);
      }
    };
    setTimeout(step, 80);
  };

  const handleFile = (text: string, type: UploadType) => {
    const results = parseUploadFile(text, type);
    if (type === "vocab") {
      setVocabResults(results);
      setVocabProgress(0);
    } else {
      setGrammarResults(results);
      setGrammarProgress(0);
    }
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>, type: UploadType) => {
    event.preventDefault();
    if (type === "vocab") setVocabDrag(false);
    else setGrammarDrag(false);
    const file = event.dataTransfer.files[0];
    if (!file) return;
    file.text().then((text) => handleFile(text, type));
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: UploadType) => {
    const file = event.target.files?.[0];
    if (!file) return;
    file.text().then((text) => handleFile(text, type));
  };

  function DropZone({
    type,
    drag,
    setDrag,
    results,
    progress,
    pushing,
    inputRef,
  }: {
    type: UploadType;
    drag: boolean;
    setDrag: (value: boolean) => void;
    results: UploadResult[] | null;
    progress: number;
    pushing: boolean;
    inputRef: React.RefObject<HTMLInputElement | null>;
  }) {
    const schema = type === "vocab" ? VOCAB_SCHEMA : GRAMMAR_SCHEMA;
    const ok = results?.filter((result) => result.ok).length ?? 0;
    const err = results?.filter((result) => !result.ok).length ?? 0;
    const isSuccess = results && ok > 0;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div
          className={`drop-zone ${drag ? "dragging" : ""} ${isSuccess && !pushing ? "success" : ""}`}
          onDragOver={(event) => {
            event.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(event) => onDrop(event, type)}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".json"
            className="upload-file-hidden"
            onChange={(event) => onFileChange(event, type)}
          />
          <div className="drop-icon">{isSuccess ? "✓" : type === "vocab" ? "📖" : "📐"}</div>
          <div className="drop-title">{type === "vocab" ? "Vocabulary" : "Grammar Rules"} JSON</div>
          <div className="drop-sub">Drop your .json file here or click to browse</div>
          <div className="drop-format">{schema}</div>
        </div>

        {results && (
          <div className="upload-preview animate-in">
            <div className="upload-preview-header">
              <span className="upload-preview-title">
                {results[0].error && !results[0].ok
                  ? "⚠ Parse error"
                  : `${results.length} item${results.length !== 1 ? "s" : ""} found`}
              </span>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  if (type === "vocab") {
                    setVocabResults(null);
                    setVocabProgress(0);
                  } else {
                    setGrammarResults(null);
                    setGrammarProgress(0);
                  }
                }}
              >
                Clear
              </button>
            </div>

            {ok > 0 && (
              <>
                <div style={{ padding: "8px 12px 0" }}>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <div className="upload-stats-row" style={{ padding: "0 12px 8px" }}>
                  <span className="upload-stat ok">
                    <strong>{ok}</strong> valid
                  </span>
                  {err > 0 && (
                    <span className="upload-stat err">
                      <strong>{err}</strong> errors
                    </span>
                  )}
                  {progress > 0 && progress < 100 && (
                    <span className="upload-stat pulsing">{progress}% uploaded…</span>
                  )}
                  {progress === 100 && (
                    <span className="upload-stat ok">
                      <strong>✓ Done!</strong>
                    </span>
                  )}
                </div>
              </>
            )}

            <div className="upload-preview-body">
              {results.slice(0, 12).map((result) => {
                const label = result.ok
                  ? type === "vocab"
                    ? (result.data as { word?: string } | null)?.word
                    : (result.data as { title?: string } | null)?.title
                  : result.error;
                return (
                  <div key={result.index} className={result.ok ? "item-ok" : "item-err"}>
                    {result.ok ? "✓" : "✗"} #{result.index} {String(label ?? "")}
                  </div>
                );
              })}
              {results.length > 12 && <div className="item-warn">… and {results.length - 12} more</div>}
            </div>

            {ok > 0 && progress < 100 && (
              <div style={{ padding: "0 12px 14px" }}>
                <button
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  disabled={pushing}
                  onClick={() => {
                    if (type === "vocab") simulatePush(results, setVocabProgress, setVocabPushing);
                    else simulatePush(results, setGrammarProgress, setGrammarPushing);
                  }}
                >
                  {pushing ? <span className="pulsing">Uploading…</span> : `Push ${ok} item${ok !== 1 ? "s" : ""} to Appwrite`}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="animate-in">
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 13,
            fontWeight: 700,
            color: "var(--text2)",
            marginBottom: 4,
          }}
        >
          HOW IT WORKS
        </div>
        <div style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7 }}>
          Drop a <span style={{ fontFamily: "var(--font-mono)", color: "var(--text2)" }}>.json</span> file matching the schema shown.
          The app validates each entry, shows a preview, then pushes valid items to Appwrite in bulk.
          Invalid entries are flagged — you fix and re-upload just those.
        </div>
      </div>
      <div className="upload-grid">
        <DropZone
          type="vocab"
          drag={vocabDrag}
          setDrag={setVocabDrag}
          results={vocabResults}
          progress={vocabProgress}
          pushing={vocabPushing}
          inputRef={vocabInputRef}
        />
        <DropZone
          type="grammar"
          drag={grammarDrag}
          setDrag={setGrammarDrag}
          results={grammarResults}
          progress={grammarProgress}
          pushing={grammarPushing}
          inputRef={grammarInputRef}
        />
      </div>
    </div>
  );
}

function TagEditor({ tags, setTags }: { tags: string[]; setTags: (tags: string[]) => void }) {
  const [input, setInput] = useState("");
  const add = () => {
    const value = input.trim();
    if (value && !tags.includes(value)) {
      setTags([...tags, value]);
    }
    setInput("");
  };
  return (
    <div className="tag-input-row">
      {tags.map((tag) => (
        <span key={tag} className="tag-pill-editable">
          {tag}
          <button className="tag-remove" onClick={() => setTags(tags.filter((item) => item !== tag))}>
            ×
          </button>
        </span>
      ))}
      <input
        className="tag-add-input"
        placeholder="+ add tag"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && add()}
        onBlur={add}
      />
    </div>
  );
}

function RichEditorMock({ placeholder = "Write rich content here…" }: { placeholder?: string }) {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [highlight, setHighlight] = useState(false);
  return (
    <div className="panel" style={{ overflow: "hidden" }}>
      <div className="editor-toolbar">
        {([
          ["B", "bold", bold, setBold],
          ["I", "italic", italic, setItalic],
          ["U", "underline"],
          ["S", "strikethrough"],
        ] as const).map(([label, cmd, active, toggle]) => (
          <button
            key={label}
            className={`editor-btn ${active ? "active" : ""}`}
            style={{
              fontStyle: cmd === "italic" ? "italic" : "normal",
              textDecoration:
                cmd === "underline" ? "underline" : cmd === "strikethrough" ? "line-through" : "none",
            }}
            onMouseDown={(event) => {
              event.preventDefault();
              if (toggle) toggle(!active);
              document.execCommand(cmd, false);
            }}
          >
            {label}
          </button>
        ))}
        <div className="editor-sep" />
        <button
          className="editor-btn"
          style={{ fontSize: 11 }}
          onMouseDown={(event) => {
            event.preventDefault();
            document.execCommand("superscript");
          }}
        >
          x²
        </button>
        <button
          className="editor-btn"
          style={{ fontSize: 11 }}
          onMouseDown={(event) => {
            event.preventDefault();
            document.execCommand("subscript");
          }}
        >
          x₂
        </button>
        <div className="editor-sep" />
        <button
          className={`editor-btn ${highlight ? "active" : ""}`}
          onMouseDown={(event) => {
            event.preventDefault();
            setHighlight(!highlight);
            document.execCommand("hiliteColor", false, "#d4a63a55");
          }}
        >
          🖊 HL
        </button>
        <div className="editor-sep" />
        <button
          className="editor-btn"
          onMouseDown={(event) => {
            event.preventDefault();
            document.execCommand("insertUnorderedList");
          }}
        >
          • List
        </button>
        <button
          className="editor-btn"
          onMouseDown={(event) => {
            event.preventDefault();
            document.execCommand("insertOrderedList");
          }}
        >
          1. List
        </button>
        <div className="editor-sep" />
        <button
          className="editor-btn"
          onMouseDown={(event) => {
            event.preventDefault();
            document.execCommand("formatBlock", false, "blockquote");
          }}
        >
          ❝
        </button>
      </div>
      <div className="editor-area" contentEditable suppressContentEditableWarning data-placeholder={placeholder} />
    </div>
  );
}

type VocabFormState = { word: string; definition: string; example: string; tags: string[] };
type GrammarFormState = { title: string; tags: string[] };

function VocabManager() {
  const [data, setData] = useState(VOCAB_DATA);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<VocabFormState>({ word: "", definition: "", example: "", tags: [] });
  const [search, setSearch] = useState("");

  const filtered = data.filter(
    (item) =>
      item.word.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase()),
  );

  const save = async () => {
    if (!form.word || !form.definition) return;
    if (editingId) {
      const response = await fetch(`/api/vocab/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const updated = await response.json();
      setData((current) => current.map((item) => (item.id === editingId ? { ...item, ...updated } : item)));
    } else {
      const response = await fetch("/api/vocab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const created = await response.json();
      setData((current) => [...current, { id: created.id ?? Date.now(), ...form }]);
    }
    setForm({ word: "", definition: "", example: "", tags: [] });
    setAdding(false);
    setEditingId(null);
  };

  const startEdit = (id: number) => {
    const item = data.find((entry) => entry.id === id);
    if (!item) return;
    setForm({ word: item.word, definition: item.definition, example: item.example, tags: item.tags });
    setEditingId(id);
    setAdding(true);
  };

  const remove = async (id: number) => {
    await fetch(`/api/vocab/${id}`, { method: "DELETE" });
    setData((current) => current.filter((entry) => entry.id !== id));
  };

  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {adding ? (
        <div className="panel animate-in">
          <div className="panel-header">
            <div className="panel-title">Add Vocabulary Entry</div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setAdding(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
              <button className="btn btn-primary btn-sm" onClick={save}>
                {editingId ? "Save changes" : "Save entry"}
              </button>
            </div>
          </div>
          <div className="panel-body">
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">German word</label>
                <input
                  className="form-input"
                  placeholder="die Erfahrung"
                  value={form.word}
                  onChange={(event) => setForm((prev) => ({ ...prev, word: event.target.value }))}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Definition</label>
                <input
                  className="form-input"
                  placeholder="experience"
                  value={form.definition}
                  onChange={(event) => setForm((prev) => ({ ...prev, definition: event.target.value }))}
                />
              </div>
              <div className="form-field full">
                <label className="form-label">Example sentence</label>
                <input
                  className="form-input"
                  placeholder="Das war eine wichtige Erfahrung."
                  value={form.example}
                  onChange={(event) => setForm((prev) => ({ ...prev, example: event.target.value }))}
                />
              </div>
              <div className="form-field full">
                <label className="form-label">Rich text notes</label>
                <RichEditorMock placeholder="Add grammar notes, usage tips, declensions…" />
              </div>
              <div className="form-field full">
                <label className="form-label">Tags</label>
                <TagEditor tags={form.tags} setTags={(tags) => setForm((prev) => ({ ...prev, tags }))} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Vocabulary</div>
            <input
              className="form-input"
              placeholder="Search…"
              style={{ width: 200, marginLeft: "auto", marginRight: 10 }}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button className="btn btn-primary btn-sm" onClick={() => setAdding(true)}>
              + Add word
            </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Word</th>
                <th>Definition</th>
                <th>Example</th>
                <th>Tags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="word-cell">{item.word}</td>
                  <td>{item.definition}</td>
                  <td
                    style={{
                      fontStyle: "italic",
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.example}
                  </td>
                  <td>
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn btn-ghost btn-sm" onClick={() => startEdit(item.id)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => remove(item.id)}>
                        Del
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function GrammarManager() {
  const [data, setData] = useState(GRAMMAR_DATA);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<GrammarFormState>({ title: "", tags: [] });

  const save = async () => {
    if (!form.title) return;
    if (editingId) {
      const response = await fetch(`/api/grammar/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, body: "…" }),
      });
      const updated = await response.json();
      setData((current) => current.map((item) => (item.id === editingId ? { ...item, ...updated } : item)));
    } else {
      const response = await fetch("/api/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, body: "…" }),
      });
      const created = await response.json();
      setData((current) => [...current, { id: created.id ?? Date.now(), ...form, body: "…" }]);
    }
    setForm({ title: "", tags: [] });
    setAdding(false);
    setEditingId(null);
  };

  const startEdit = (id: number) => {
    const item = data.find((entry) => entry.id === id);
    if (!item) return;
    setForm({ title: item.title, tags: item.tags });
    setEditingId(id);
    setAdding(true);
  };

  const remove = async (id: number) => {
    await fetch(`/api/grammar/${id}`, { method: "DELETE" });
    setData((current) => current.filter((entry) => entry.id !== id));
  };

  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {adding ? (
        <div className="panel animate-in">
          <div className="panel-header">
            <div className="panel-title">Add Grammar Rule</div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setAdding(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
              <button className="btn btn-primary btn-sm" onClick={save}>
                {editingId ? "Save changes" : "Save rule"}
              </button>
            </div>
          </div>
          <div className="panel-body">
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Rule title</label>
                <input
                  className="form-input"
                  placeholder="Konjunktiv II"
                  value={form.title}
                  onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Tags</label>
                <TagEditor tags={form.tags} setTags={(tags) => setForm((prev) => ({ ...prev, tags }))} />
              </div>
              <div className="form-field full">
                <label className="form-label">Rule body (rich text)</label>
                <RichEditorMock placeholder="Write the grammar rule with examples, tables, highlighted forms…" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Grammar Rules</div>
            <button className="btn btn-primary btn-sm" style={{ marginLeft: "auto" }} onClick={() => setAdding(true)}>
              + Add rule
            </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Tags</th>
                <th>Preview</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((rule) => (
                <tr key={rule.id}>
                  <td className="word-cell">{rule.title}</td>
                  <td>
                    {rule.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </td>
                  <td
                    style={{
                      color: "var(--text3)",
                      fontStyle: "italic",
                      maxWidth: 220,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {rule.body}
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn btn-ghost btn-sm" onClick={() => startEdit(rule.id)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => remove(rule.id)}>
                        Del
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Overview() {
  return (
    <div className="animate-in">
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Vocab words</div>
          <div className="stat-value accent">247</div>
          <div className="stat-sub">+12 this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Grammar rules</div>
          <div className="stat-value gold">38</div>
          <div className="stat-sub">3 pending review</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Quiz attempts</div>
          <div className="stat-value green">1,204</div>
          <div className="stat-sub">avg score 72%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active learners</div>
          <div className="stat-value blue">1</div>
          <div className="stat-sub">You! 🔥</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Recent uploads</div>
          </div>
          <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { name: "b1_vocab_travel.json", count: 34, time: "2h ago", ok: true },
              { name: "grammar_modal_verbs.json", count: 8, time: "yesterday", ok: true },
              { name: "vocab_batch_3.json", count: 0, time: "3 days ago", ok: false },
            ].map((file) => (
              <div
                key={file.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: 18 }}>{file.ok ? "✓" : "✗"}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text)" }}>{file.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)" }}>
                    {file.ok ? `${file.count} items pushed` : "Upload failed — invalid format"} · {file.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Quick actions</div>
          </div>
          <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["📖", "Add single vocabulary entry"],
              ["📐", "Add grammar rule"],
              ["⬆", "Bulk upload JSON"],
            ].map(([icon, label]) => (
              <button
                key={label}
                className="btn btn-ghost"
                style={{ justifyContent: "flex-start", gap: 12, padding: "12px 14px" }}
              >
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span style={{ color: "var(--text2)" }}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const { logout, hydrate } = useAuth();
  const [page, setPage] = useState<NavItem["id"]>("overview");
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const existingLink = document.querySelector<HTMLLinkElement>("link[data-admin-font]");
    const existingStyle = document.querySelector<HTMLStyleElement>("style[data-admin-style]");

    const link = existingLink ?? document.createElement("link");
    link.rel = "stylesheet";
    link.href = ADMIN_FONTS_URL;
    link.dataset.adminFont = "true";
    if (!existingLink) document.head.appendChild(link);

    const style = existingStyle ?? document.createElement("style");
    style.textContent = ADMIN_STYLES;
    style.dataset.adminStyle = "true";
    if (!existingStyle) document.head.appendChild(style);

    return () => {
      if (!existingLink) link.remove();
      if (!existingStyle) style.remove();
    };
  }, []);

  useEffect(() => {
    hydrate().then((session) => {
      setAuthChecked(true);
      if (!session) router.push("/login");
    });
  }, [hydrate, router]);

  if (!authChecked) {
    return null;
  }

  const nav: NavItem[] = [
    { id: "overview", label: "Overview", icon: "◈" },
    { id: "vocab", label: "Vocabulary", icon: "≡", count: 247 },
    { id: "grammar", label: "Grammar Rules", icon: "⌘", count: 38 },
    { id: "upload", label: "Bulk Upload", icon: "⬆", dot: true },
  ];

  const titles: Record<NavItem["id"], string> = {
    overview: "Dashboard",
    vocab: "Vocabulary Manager",
    grammar: "Grammar Manager",
    upload: "Bulk Upload",
  };

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <div className="admin-logo-mark">
            Deutsch<span>B1</span>
          </div>
          <div className="admin-logo-sub">Admin Panel</div>
        </div>
        <div className="admin-nav">
          <div className="admin-nav-label">Content</div>
          {nav.map((item) => (
            <button
              key={item.id}
              className={`admin-nav-item ${page === item.id ? "active" : ""}`}
              onClick={() => setPage(item.id)}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 14 }}>{item.icon}</span>
              {item.label}
              {item.dot && <span className="dot" />}
              {item.count ? <span className="count">{item.count}</span> : null}
            </button>
          ))}
          <div className="admin-nav-label">System</div>
          <button className="admin-nav-item">
            <span style={{ fontFamily: "var(--font-mono)" }}>◎</span> Settings
          </button>
        </div>
        <div className="admin-sidebar-bottom">
          <div className="admin-user-pill">
            <div className="admin-avatar">A</div>
            <div>
              <div className="admin-user-name">Admin</div>
              <div style={{ fontSize: 10, color: "var(--text3)" }}>appwrite session</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <div className="admin-topbar-title">{titles[page]}</div>
          <button
            className="btn btn-ghost btn-sm"
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
          >
            Log out
          </button>
          {page === "upload" && (
            <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--font-mono)" }}>
              → pushes to Appwrite database
            </div>
          )}
        </div>
        <div className="admin-content">
          {page === "overview" && <Overview />}
          {page === "vocab" && <VocabManager />}
          {page === "grammar" && <GrammarManager />}
          {page === "upload" && <BulkUpload />}
        </div>
      </div>
    </div>
  );
}
