import { create } from 'zustand';

interface PostStoreProps {
  title: string;
  content: string;
  category: string;
  id: string;
  author: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setCategory: (category: string) => void;
  setId: (id: string) => void;
  setAuthor: (author: string) => void;
}

const postStore = create<PostStoreProps>((set) => ({
  title: '',
  content: '',
  category: '',
  id: '',
  author: '',
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setCategory: (category) => set({ category }),
  setId: (id) => set({ id }),
  setAuthor: (author) => set({ author }),
}));

export default postStore;
