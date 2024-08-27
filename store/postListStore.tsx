import { create } from 'zustand';

const postListStore = create((set) => ({
  postList: [],
  setPostList: (postList: []) => set({ postList }),
}));

export default postListStore;
