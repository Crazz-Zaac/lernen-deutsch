import type { GrammarRule, VocabItem } from "@/types";

export const SAMPLE_VOCAB: VocabItem[] = [
  {
    id: "v1",
    word: "die Verantwortung",
    definition: "responsibility",
    example: "Er trägt die Verantwortung für das Projekt.",
    tags: ["nouns", "work"],
  },
  {
    id: "v2",
    word: "sich entscheiden",
    definition: "to decide",
    example: "Sie hat sich für die rote Jacke entschieden.",
    tags: ["verbs", "daily"],
  },
  {
    id: "v3",
    word: "die Gelegenheit",
    definition: "opportunity",
    example: "Das ist eine gute Gelegenheit zum Lernen.",
    tags: ["nouns", "abstract"],
  },
  {
    id: "v4",
    word: "überzeugen",
    definition: "to convince",
    example: "Er konnte mich von seiner Idee überzeugen.",
    tags: ["verbs", "communication"],
  },
  {
    id: "v5",
    word: "die Umgebung",
    definition: "surroundings / environment",
    example: "Ich liebe die Umgebung von München.",
    tags: ["nouns", "nature"],
  },
  {
    id: "v6",
    word: "sich gewöhnen an",
    definition: "to get used to",
    example: "Ich habe mich ans Frühaufstehen gewöhnt.",
    tags: ["verbs", "daily"],
  },
];

export const GRAMMAR_RULES: GrammarRule[] = [
  {
    id: "g1",
    title: "Konjunktiv II",
    tags: ["mood", "subjunctive"],
    body:
      "<p>Used to express <strong>hypothetical situations</strong>, wishes, and polite requests.</p>" +
      "<p><u>Formation:</u> würde + Infinitiv <em>or</em> strong verb forms.</p>" +
      "<blockquote>Wenn ich Zeit hätte, würde ich mehr lesen.</blockquote>",
  },
  {
    id: "g2",
    title: "Relativsätze",
    tags: ["clauses", "relative"],
    body:
      "<p><strong>Relative clauses</strong> add information about a noun using relative pronouns.</p>" +
      "<p><u>Nominative:</u> der / die / das · <u>Accusative:</u> den / die / das · <u>Dative:</u> dem / der / dem</p>",
  },
  {
    id: "g3",
    title: "Passiv Präsens",
    tags: ["voice", "passive"],
    body:
      "<p>The <strong>passive voice</strong> focuses on the action rather than the actor.</p>" +
      "<p><u>Formation:</u> werden (conjugated) + Partizip II</p>",
  },
];

export const QUIZ_QUESTIONS = SAMPLE_VOCAB.slice(0, 5).map((entry) => ({
  id: entry.id,
  word: entry.word,
  correct: entry.definition,
  options: [entry.definition, "to forget", "the journey", "carefully"].sort(() => Math.random() - 0.5),
}));
