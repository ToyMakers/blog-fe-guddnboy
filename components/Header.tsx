import React from 'react';
import Image from 'next/image';
import logoutbtn from '../public/assets/logoutbtn.png';
import postbtn from '../public/assets/postbtn.png';

interface HeaderProps {
  nickname: string;
  logout: () => void;
  navigateTo: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ nickname, logout, navigateTo }) => {
  return (
    <header className="flex justify-end w-full">
      <ul className="flex justify-center items-center">
        <li className="flex flex-row mr-4">
          <div
            className="hover:cursor-pointer hover:text-gray-600 hover:font-bold  hover:-translate-y-1.5 transition"
            onClick={() => navigateTo('/mypage')}>
            {nickname}
          </div>
          <span>님, 환영합니다</span>
        </li>
        <li className="mr-4 hover:bg-slate-200 hover:cursor-pointer hover:text-white transition rounded-md">
          <Image src={logoutbtn} alt="logout" onClick={logout} className="w-[28px] h-[28px]" />
        </li>
        <li className="mr-4 hover:bg-slate-200 hover:cursor-pointer hover:text-white transition rounded-md">
          <Image
            src={postbtn}
            alt="post"
            onClick={() => navigateTo('/post')}
            className="w-[28px] h-[28px]"
          />
        </li>
      </ul>
    </header>
  );
};

export default Header;
