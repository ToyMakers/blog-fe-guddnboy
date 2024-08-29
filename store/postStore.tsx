import { create } from 'zustand';

type State = {
  title: string;
  content: string;
  category: string;
  id: string;
  author: string;
  categories: string[];
};

type Actions = {
  setTitle: (title: State['title']) => void;
  setContent: (content: State['content']) => void;
  setCategory: (category: State['category']) => void;
  setId: (id: State['id']) => void;
  setAuthor: (author: State['author']) => void;
  setCategories: (categories: State['categories']) => void;

  addCategoryIntoCategories: (category: State['category']) => void;
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
  categories: [],

  setTitle: (title) => set(() => ({ title: title })),
  setContent: (content) => set(() => ({ content: content })),
  setCategory: (category) => set(() => ({ category: category })),
  setId: (id) => set(() => ({ id: id })),
  setAuthor: (author) => set(() => ({ author: author })),
  setCategories: (categories) => set(() => ({ categories: categories })),

  addCategoryIntoCategories: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),

  updateTitle: (title) => set(() => ({ title: title })),
  updateContent: (content) => set(() => ({ content: content })),
  updateCategory: (category) => set(() => ({ category: category })),
}));

export default postStore;
