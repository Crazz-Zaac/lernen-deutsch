export type VocabItem = {
  id: string;
  word: string;
  definition: string;
  example?: string;
  tags: string[];
};
export interface Vocab {
  $id: string;
  word: string;
  definition: string;
  example: string;
  richText: string;
  tags: string[];
  createdAt: string;
}