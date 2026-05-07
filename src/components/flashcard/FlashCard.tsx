"use client";
import { useState } from "react";
import type { VocabItem } from "@/types";

export function FlashCard({ vocab }: { vocab: VocabItem }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-80 h-48 cursor-pointer [perspective:1000px]"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
        {/* Front */}
        <div className="absolute inset-0 flex items-center justify-center rounded-xl border bg-card [backface-visibility:hidden]">
          <p className="text-3xl font-bold">{vocab.word}</p>
        </div>
        {/* Back */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl border bg-muted [transform:rotateY(180deg)] [backface-visibility:hidden] p-6">
          <p className="text-xl font-semibold">{vocab.definition}</p>
          <p className="text-sm text-muted-foreground italic">{vocab.example}</p>
        </div>
      </div>
    </div>
  );
}