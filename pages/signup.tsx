import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Signup = () => {
  return (
    <main className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}>
      <div className="">
        <input type="text" placeholder="ID" />
      </div>
      <div>
        <input type="password" placeholder="Password" />
      </div>
      <div className="flex p-5 justify-between">
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </main>
  );
};
