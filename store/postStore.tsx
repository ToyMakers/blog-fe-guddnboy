import { create } from 'zustand';

interface PostStoreProps {
  title: string;
  content: string;
  category: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setCategory: (category: string) => void;
}

const postStore = create<PostStoreProps>((set) => ({
  title: '',
  content: '',
  category: '',
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setCategory: (category) => set({ category }),
}));
export default postStore;
