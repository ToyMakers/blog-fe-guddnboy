import { create } from 'zustand';

type State = {
  title: string;
  content: string;
  category: string;
  id: string;
  author: string;
};
type Actions = {
  updateTitle: (title: State['title']) => void;
  updateContent: (content: State['content']) => void;
  updateCategory: (category: State['category']) => void;
};

const postStore = create<State & Actions>((set) => ({
  title: '',
  content: '',
  category: '',
  id: '',
  author: '',
  updateTitle: (title) => set(() => ({ title: title })),
  updateContent: (content) => set(() => ({ content: content })),
  updateCategory: (category) => set(() => ({ category: category })),
}));

export default postStore;
