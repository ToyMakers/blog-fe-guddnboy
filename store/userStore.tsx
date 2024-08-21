import { create } from 'zustand';

interface UserState {
  username: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  bio: string | null;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setPasswordConfirm: (passwordConfirm: string) => void;
  setNickname: (nickname: string) => void;
  setBio: (bio: string) => void;
}

const userStore = create<UserState>((set) => ({
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
}));

export default userStore;
