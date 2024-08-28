import { create } from 'zustand';

type State = {
  username: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  bio: string | null;
};

type Actions = {
  setUsername: (username: State['username']) => void;
  setPassword: (password: State['password']) => void;
  setPasswordConfirm: (passwordConfirm: State['passwordConfirm']) => void;
  setNickname: (nickname: State['nickname']) => void;
  setBio: (bio: State['bio']) => void;

  updateUsername: (username: State['username']) => void;
  updatePassword: (password: State['password']) => void;
  updatePasswordConfirm: (passwordConfirm: State['passwordConfirm']) => void;
  updateNickname: (nickname: State['nickname']) => void;
  updateBio: (bio: State['bio']) => void;
};

const userStore = create<State & Actions>((set) => ({
  username: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
  bio: '',
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setPasswordConfirm: (passwordConfirm) => set({ passwordConfirm }),
  setNickname: (nickname) => set({ nickname }),
  setBio: (bio) => set({ bio }),

  updateUsername: (username) => set({ username }),
  updatePassword: (password) => set({ password }),
  updatePasswordConfirm: (passwordConfirm) => set({ passwordConfirm }),
  updateNickname: (nickname) => set({ nickname }),
  updateBio: (bio) => set({ bio }),
}));

export default userStore;
