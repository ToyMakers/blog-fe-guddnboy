import { create } from 'zustand';

type State = {
  postList: [];
};

type Actions = {
  setPostList: (postList: []) => void;
};

const postListStore = create<State & Actions>((set) => ({
  postList: [],
  setPostList: (postList: []) => set({ postList }),
}));

export default postListStore;
