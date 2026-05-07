export const APPWRITE_CONFIG = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  collections: {
    vocab: process.env.NEXT_PUBLIC_COLLECTION_VOCAB!,
    grammar: process.env.NEXT_PUBLIC_COLLECTION_GRAMMAR!,
    reviseLater: process.env.NEXT_PUBLIC_COLLECTION_REVISE!,
    quizResults: process.env.NEXT_PUBLIC_COLLECTION_QUIZ!,
  },
};