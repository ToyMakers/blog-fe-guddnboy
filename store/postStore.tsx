import { create } from 'zustand';

type State = {
  title: string;
  content: string;
  categories: string[];

  id: string;
  author: string;
  likes: number;
};

type Actions = {
  setTitle: (title: State['title']) => void;
  setContent: (content: State['content']) => void;
  setId: (id: State['id']) => void;
  setAuthor: (author: State['author']) => void;
  setCategories: (categories: State['categories']) => void;
  setLikes: (likes: State['likes']) => void;

  updateTitle: (title: State['title']) => void;
  updateContent: (content: State['content']) => void;

  setPostData: (data: Partial<State>) => void;
};

const postStore = create<State & Actions>((set) => ({
  title: '',
  content: '',
  id: '',
  author: '',
  categories: [],
  likes: 0,

  setTitle: (title) => set(() => ({ title: title })),
  setContent: (content) => set(() => ({ content: content })),
  setId: (id) => set(() => ({ id: id })),
  setAuthor: (author) => set(() => ({ author: author })),
  setCategories: (categories) => set(() => ({ categories: categories })),
  setLikes: (likes) => set(() => ({ likes: likes })),

  updateTitle: (title) => set(() => ({ title: title })),
  updateContent: (content) => set(() => ({ content: content })),

  setPostData: (data) => set(data),
}));

export default postStore;
