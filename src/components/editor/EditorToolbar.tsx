"use client";

import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";

export function EditorToolbar({ editor }: { editor: Editor | null }) {
	if (!editor) return null;

	return (
		<div className="flex flex-wrap gap-2 border-b bg-muted/40 p-2">
			<Button size="sm" variant={editor.isActive("bold") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleBold().run()}>
				B
			</Button>
			<Button size="sm" variant={editor.isActive("italic") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleItalic().run()}>
				I
			</Button>
			<Button size="sm" variant={editor.isActive("underline") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleUnderline().run()}>
				U
			</Button>
			<Button size="sm" variant={editor.isActive("highlight") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleHighlight().run()}>
				HL
			</Button>
			<Button size="sm" variant="outline" onClick={() => editor.chain().focus().toggleBulletList().run()}>
				• List
			</Button>
			<Button size="sm" variant="outline" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
				1. List
			</Button>
		</div>
	);
}
