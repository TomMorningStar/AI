export type Genre = {
  id: number;
  genre: string;
  description: string;
};

export type IChatMessage = {
  role: 'user' | 'assistant';
  content: string;
}