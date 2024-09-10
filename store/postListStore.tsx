import { create } from 'zustand';

type Post = {
  id: string;
  title: string;
  content: string;
  categories: string[];
  author: string;
  likes: number;
};

type PostListState = {
  postList: Post[];
  setPostList: (postList: Post[]) => void;
};

const postListStore = create<PostListState>((set) => ({
  postList: [],
  setPostList: (postList: Post[]) => set({ postList }),
}));

export default postListStore;
