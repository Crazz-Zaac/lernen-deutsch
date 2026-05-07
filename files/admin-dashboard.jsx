import { useState, useRef, useCallback } from "react";

// ─── Fonts & Styles ───────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap";
document.head.appendChild(fontLink);

const style = document.createElement("style");
style.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0f0f0f;
    --bg2: #161616;
    --bg3: #1e1e1e;
    --bg4: #252525;
    --border: rgba(255,255,255,0.08);
    --border2: rgba(255,255,255,0.14);
    --text: #f0ede8;
    --text2: #a09890;
    --text3: #5a5550;
    --accent: #e8622e;
    --accent2: #ff8555;
    --gold: #d4a63a;
    --green: #4ade80;
    --blue: #60a5fa;
    --red: #f87171;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --font-mono: 'DM Mono', monospace;
    --r: 10px;
  }
  html, body, #root { height: 100%; background: var(--bg); color: var(--text); font-family: var(--font-body); }

  /* ─── Layout ─── */
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

  /* ─── Main ─── */
  .admin-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .admin-topbar {
    height: 58px; background: var(--bg2); border-bottom: 1px solid var(--border);
    display: flex; align-items: center; padding: 0 28px; gap: 16px; flex-shrink: 0;
  }
  .admin-topbar-title { font-family: var(--font-display); font-size: 16px; font-weight: 700; flex: 1; }
  .admin-content { flex: 1; overflow-y: auto; padding: 28px; }

  /* ─── Buttons ─── */
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

  /* ─── Cards / Panels ─── */
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

  /* ─── Stats ─── */
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

  /* ─── Table ─── */
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

  /* ─── Form ─── */
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

  /* ─── Rich Text Editor Mock ─── */
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

  /* ─── BULK UPLOAD ─── */
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

  /* ─── Scrollbar ─── */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--bg4); border-radius: 3px; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  .animate-in { animation: fadeUp 0.3s ease both; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
  .pulsing { animation: pulse 1.5s ease infinite; }
`;
document.head.appendChild(style);

// ─── Sample data ──────────────────────────────────────────────────────────────
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

// ─── Helper: parse & validate JSON upload ─────────────────────────────────────
function parseUploadFile(text, type) {
  try {
    const data = JSON.parse(text);
    const arr = Array.isArray(data) ? data : [data];
    const required = type === "vocab" ? ["word", "definition"] : ["title", "body"];
    return arr.map((item, i) => {
      const missing = required.filter(k => !item[k]);
      return {
        index: i + 1,
        data: item,
        ok: missing.length === 0,
        error: missing.length ? `Missing: ${missing.join(", ")}` : null,
      };
    });
  } catch (e) {
    return [{ index: 0, data: null, ok: false, error: "Invalid JSON: " + e.message }];
  }
}

// ─── Bulk Upload Panel ────────────────────────────────────────────────────────
function BulkUpload() {
  const [vocabDrag, setVocabDrag] = useState(false);
  const [grammarDrag, setGrammarDrag] = useState(false);
  const [vocabResults, setVocabResults] = useState(null);
  const [grammarResults, setGrammarResults] = useState(null);
  const [vocabProgress, setVocabProgress] = useState(0);
  const [grammarProgress, setGrammarProgress] = useState(0);
  const [vocabPushing, setVocabPushing] = useState(false);
  const [grammarPushing, setGrammarPushing] = useState(false);
  const vocabInputRef = useRef();
  const grammarInputRef = useRef();

  const simulatePush = (results, setProgress, setPushing, setResults) => {
    const total = results.filter(r => r.ok).length;
    if (!total) return;
    setPushing(true);
    let done = 0;
    const step = () => {
      done++;
      setProgress(Math.round((done / total) * 100));
      if (done < total) setTimeout(step, 120);
      else { setPushing(false); }
    };
    setTimeout(step, 80);
  };

  const handleFile = (text, type) => {
    const results = parseUploadFile(text, type);
    if (type === "vocab") { setVocabResults(results); setVocabProgress(0); }
    else { setGrammarResults(results); setGrammarProgress(0); }
  };

  const onDrop = (e, type) => {
    e.preventDefault();
    if (type === "vocab") setVocabDrag(false); else setGrammarDrag(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    file.text().then(t => handleFile(t, type));
  };

  const onFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    file.text().then(t => handleFile(t, type));
  };

  function DropZone({ type, drag, setDrag, results, progress, pushing, inputRef }) {
    const schema = type === "vocab" ? VOCAB_SCHEMA : GRAMMAR_SCHEMA;
    const ok = results?.filter(r => r.ok).length ?? 0;
    const err = results?.filter(r => !r.ok).length ?? 0;
    const isSuccess = results && ok > 0;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div
          className={`drop-zone ${drag ? "dragging" : ""} ${isSuccess && !pushing ? "success" : ""}`}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => onDrop(e, type)}
          onClick={() => inputRef.current.click()}
        >
          <input ref={inputRef} type="file" accept=".json" className="upload-file-hidden" onChange={e => onFileChange(e, type)} />
          <div className="drop-icon">{isSuccess ? "✓" : type === "vocab" ? "📖" : "📐"}</div>
          <div className="drop-title">{type === "vocab" ? "Vocabulary" : "Grammar Rules"} JSON</div>
          <div className="drop-sub">Drop your .json file here or click to browse</div>
          <div className="drop-format">{schema}</div>
        </div>

        {results && (
          <div className="upload-preview animate-in">
            <div className="upload-preview-header">
              <span className="upload-preview-title">
                {results[0].error && !results[0].ok ? "⚠ Parse error" : `${results.length} item${results.length !== 1 ? "s" : ""} found`}
              </span>
              <button className="btn btn-ghost btn-sm" onClick={() => {
                if (type === "vocab") { setVocabResults(null); setVocabProgress(0); }
                else { setGrammarResults(null); setGrammarProgress(0); }
              }}>Clear</button>
            </div>

            {ok > 0 && (
              <>
                <div style={{ padding: "8px 12px 0" }}>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
                </div>
                <div className="upload-stats-row" style={{ padding: "0 12px 8px" }}>
                  <span className="upload-stat ok"><strong>{ok}</strong> valid</span>
                  {err > 0 && <span className="upload-stat err"><strong>{err}</strong> errors</span>}
                  {progress > 0 && progress < 100 && <span className="upload-stat pulsing">{progress}% uploaded…</span>}
                  {progress === 100 && <span className="upload-stat ok"><strong>✓ Done!</strong></span>}
                </div>
              </>
            )}

            <div className="upload-preview-body">
              {results.slice(0, 12).map(r => (
                <div key={r.index} className={r.ok ? "item-ok" : "item-err"}>
                  {r.ok ? "✓" : "✗"} #{r.index} {r.ok
                    ? (type === "vocab" ? r.data.word : r.data.title)
                    : r.error}
                </div>
              ))}
              {results.length > 12 && <div className="item-warn">… and {results.length - 12} more</div>}
            </div>

            {ok > 0 && progress < 100 && (
              <div style={{ padding: "0 12px 14px" }}>
                <button
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  disabled={pushing}
                  onClick={() => {
                    if (type === "vocab") simulatePush(results, setVocabProgress, setVocabPushing, setVocabResults);
                    else simulatePush(results, setGrammarProgress, setGrammarPushing, setGrammarResults);
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
        <div style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: "var(--text2)", marginBottom: 4 }}>HOW IT WORKS</div>
        <div style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7 }}>
          Drop a <span style={{ fontFamily: "var(--font-mono)", color: "var(--text2)" }}>.json</span> file matching the schema shown. 
          The app validates each entry, shows a preview, then pushes valid items to Appwrite in bulk.
          Invalid entries are flagged — you fix and re-upload just those.
        </div>
      </div>
      <div className="upload-grid">
        <DropZone type="vocab" drag={vocabDrag} setDrag={setVocabDrag} results={vocabResults} progress={vocabProgress} pushing={vocabPushing} inputRef={vocabInputRef} />
        <DropZone type="grammar" drag={grammarDrag} setDrag={setGrammarDrag} results={grammarResults} progress={grammarProgress} pushing={grammarPushing} inputRef={grammarInputRef} />
      </div>
    </div>
  );
}

// ─── Vocab Manager ────────────────────────────────────────────────────────────
function TagEditor({ tags, setTags }) {
  const [input, setInput] = useState("");
  const add = () => { const v = input.trim(); if (v && !tags.includes(v)) { setTags([...tags, v]); } setInput(""); };
  return (
    <div className="tag-input-row">
      {tags.map(t => (
        <span key={t} className="tag-pill-editable">
          {t}
          <button className="tag-remove" onClick={() => setTags(tags.filter(x => x !== t))}>×</button>
        </span>
      ))}
      <input
        className="tag-add-input" placeholder="+ add tag"
        value={input} onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && add()}
        onBlur={add}
      />
    </div>
  );
}

function RichEditorMock({ placeholder = "Write rich content here…" }) {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [hl, setHl] = useState(false);
  return (
    <div className="panel" style={{ overflow: "hidden" }}>
      <div className="editor-toolbar">
        {[["B", "bold", bold, setBold], ["I", "italic", italic, setItalic], ["U", "underline"], ["S", "strikethrough"]].map(([label, cmd, active, toggle]) => (
          <button key={label} className={`editor-btn ${active ? "active" : ""}`}
            style={{ fontStyle: cmd === "italic" ? "italic" : "normal", textDecoration: cmd === "underline" ? "underline" : cmd === "strikethrough" ? "line-through" : "none" }}
            onMouseDown={e => { e.preventDefault(); if (toggle) toggle(!active); document.execCommand(cmd, false); }}>
            {label}
          </button>
        ))}
        <div className="editor-sep" />
        <button className="editor-btn" style={{ fontSize: 11 }} onMouseDown={e => { e.preventDefault(); document.execCommand("superscript"); }}>x²</button>
        <button className="editor-btn" style={{ fontSize: 11 }} onMouseDown={e => { e.preventDefault(); document.execCommand("subscript"); }}>x₂</button>
        <div className="editor-sep" />
        <button className={`editor-btn ${hl ? "active" : ""}`} onMouseDown={e => { e.preventDefault(); setHl(!hl); document.execCommand("hiliteColor", false, "#d4a63a55"); }}>🖊 HL</button>
        <div className="editor-sep" />
        <button className="editor-btn" onMouseDown={e => { e.preventDefault(); document.execCommand("insertUnorderedList"); }}>• List</button>
        <button className="editor-btn" onMouseDown={e => { e.preventDefault(); document.execCommand("insertOrderedList"); }}>1. List</button>
        <div className="editor-sep" />
        <button className="editor-btn" onMouseDown={e => { e.preventDefault(); document.execCommand("formatBlock", false, "blockquote"); }}>❝</button>
      </div>
      <div
        className="editor-area"
        contentEditable suppressContentEditableWarning
        data-placeholder={placeholder}
      />
    </div>
  );
}

function VocabManager() {
  const [data, setData] = useState(VOCAB_DATA);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ word: "", definition: "", example: "", tags: [] });
  const [search, setSearch] = useState("");

  const filtered = data.filter(v =>
    v.word.toLowerCase().includes(search.toLowerCase()) ||
    v.definition.toLowerCase().includes(search.toLowerCase())
  );

  const save = () => {
    if (!form.word || !form.definition) return;
    setData([...data, { id: Date.now(), ...form }]);
    setForm({ word: "", definition: "", example: "", tags: [] });
    setAdding(false);
  };

  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {adding ? (
        <div className="panel animate-in">
          <div className="panel-header">
            <div className="panel-title">Add Vocabulary Entry</div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setAdding(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={save}>Save entry</button>
            </div>
          </div>
          <div className="panel-body">
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">German word</label>
                <input className="form-input" placeholder="die Erfahrung" value={form.word} onChange={e => setForm(f => ({ ...f, word: e.target.value }))} />
              </div>
              <div className="form-field">
                <label className="form-label">Definition</label>
                <input className="form-input" placeholder="experience" value={form.definition} onChange={e => setForm(f => ({ ...f, definition: e.target.value }))} />
              </div>
              <div className="form-field full">
                <label className="form-label">Example sentence</label>
                <input className="form-input" placeholder="Das war eine wichtige Erfahrung." value={form.example} onChange={e => setForm(f => ({ ...f, example: e.target.value }))} />
              </div>
              <div className="form-field full">
                <label className="form-label">Rich text notes</label>
                <RichEditorMock placeholder="Add grammar notes, usage tips, declensions…" />
              </div>
              <div className="form-field full">
                <label className="form-label">Tags</label>
                <TagEditor tags={form.tags} setTags={t => setForm(f => ({ ...f, tags: t }))} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Vocabulary</div>
            <input className="form-input" placeholder="Search…" style={{ width: 200, marginLeft: "auto", marginRight: 10 }} value={search} onChange={e => setSearch(e.target.value)} />
            <button className="btn btn-primary btn-sm" onClick={() => setAdding(true)}>+ Add word</button>
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
              {filtered.map(v => (
                <tr key={v.id}>
                  <td className="word-cell">{v.word}</td>
                  <td>{v.definition}</td>
                  <td style={{ fontStyle: "italic", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.example}</td>
                  <td>{v.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}</td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn btn-ghost btn-sm">Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => setData(d => d.filter(x => x.id !== v.id))}>Del</button>
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

// ─── Grammar Manager ──────────────────────────────────────────────────────────
function GrammarManager() {
  const [data, setData] = useState(GRAMMAR_DATA);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: "", tags: [] });

  const save = () => {
    if (!form.title) return;
    setData([...data, { id: Date.now(), ...form, body: "…" }]);
    setForm({ title: "", tags: [] });
    setAdding(false);
  };

  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {adding ? (
        <div className="panel animate-in">
          <div className="panel-header">
            <div className="panel-title">Add Grammar Rule</div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setAdding(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={save}>Save rule</button>
            </div>
          </div>
          <div className="panel-body">
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Rule title</label>
                <input className="form-input" placeholder="Konjunktiv II" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div className="form-field">
                <label className="form-label">Tags</label>
                <TagEditor tags={form.tags} setTags={t => setForm(f => ({ ...f, tags: t }))} />
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
            <button className="btn btn-primary btn-sm" style={{ marginLeft: "auto" }} onClick={() => setAdding(true)}>+ Add rule</button>
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
              {data.map(g => (
                <tr key={g.id}>
                  <td className="word-cell">{g.title}</td>
                  <td>{g.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}</td>
                  <td style={{ color: "var(--text3)", fontStyle: "italic", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.body}</td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn btn-ghost btn-sm">Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => setData(d => d.filter(x => x.id !== g.id))}>Del</button>
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

// ─── Overview ─────────────────────────────────────────────────────────────────
function Overview() {
  return (
    <div className="animate-in">
      <div className="stats-row">
        <div className="stat-card"><div className="stat-label">Vocab words</div><div className="stat-value accent">247</div><div className="stat-sub">+12 this week</div></div>
        <div className="stat-card"><div className="stat-label">Grammar rules</div><div className="stat-value gold">38</div><div className="stat-sub">3 pending review</div></div>
        <div className="stat-card"><div className="stat-label">Quiz attempts</div><div className="stat-value green">1,204</div><div className="stat-sub">avg score 72%</div></div>
        <div className="stat-card"><div className="stat-label">Active learners</div><div className="stat-value blue">1</div><div className="stat-sub">You! 🔥</div></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="panel">
          <div className="panel-header"><div className="panel-title">Recent uploads</div></div>
          <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { name: "b1_vocab_travel.json", count: 34, time: "2h ago", ok: true },
              { name: "grammar_modal_verbs.json", count: 8, time: "yesterday", ok: true },
              { name: "vocab_batch_3.json", count: 0, time: "3 days ago", ok: false },
            ].map(f => (
              <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: 18 }}>{f.ok ? "✓" : "✗"}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text)" }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)" }}>{f.ok ? `${f.count} items pushed` : "Upload failed — invalid format"} · {f.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="panel-header"><div className="panel-title">Quick actions</div></div>
          <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["📖", "Add single vocabulary entry", "vocab"],
              ["📐", "Add grammar rule", "grammar"],
              ["⬆", "Bulk upload JSON", "upload"],
            ].map(([icon, label]) => (
              <button key={label} className="btn btn-ghost" style={{ justifyContent: "flex-start", gap: 12, padding: "12px 14px" }}>
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

// ─── App ──────────────────────────────────────────────────────────────────────
export default function AdminApp() {
  const [page, setPage] = useState("overview");

  const nav = [
    { id: "overview", label: "Overview", icon: "◈" },
    { id: "vocab", label: "Vocabulary", icon: "≡", count: 247 },
    { id: "grammar", label: "Grammar Rules", icon: "⌘", count: 38 },
    { id: "upload", label: "Bulk Upload", icon: "⬆", dot: true },
  ];

  const titles = { overview: "Dashboard", vocab: "Vocabulary Manager", grammar: "Grammar Manager", upload: "Bulk Upload" };

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <div className="admin-logo-mark">Deutsch<span>B1</span></div>
          <div className="admin-logo-sub">Admin Panel</div>
        </div>
        <div className="admin-nav">
          <div className="admin-nav-label">Content</div>
          {nav.map(n => (
            <button key={n.id} className={`admin-nav-item ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 14 }}>{n.icon}</span>
              {n.label}
              {n.dot && <span className="dot" />}
              {n.count && <span className="count">{n.count}</span>}
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
