import { create } from 'zustand';

interface UserState {
  username: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  introduction: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setPasswordConfirm: (passwordConfirm: string) => void;
  setNickname: (nickname: string) => void;
  setIntroduction: (introduction: string) => void;
}

const useStore = create<UserState>((set) => ({
  username: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
  introduction: '',
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setPasswordConfirm: (passwordConfirm) => set({ passwordConfirm }),
  setNickname: (nickname) => set({ nickname }),
  setIntroduction: (introduction) => set({ introduction }),
}));

export default useStore;
