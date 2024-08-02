import React from 'react';

interface HeaderProps {
  nickname: string;
  logout: () => void;
  navigateTo: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ nickname, logout, navigateTo }) => {
  return (
    <header className="flex justify-end w-full mt-4">
      <ul className="flex justify-center font-bold mr-4">
        <li className="mr-4">
          <span
            className="hover:cursor-pointer hover:text-gray-600 transition"
            onClick={() => navigateTo('/mypage')}>
            {nickname}
          </span>
          <span> 님, 환영합니다.</span>
        </li>
        <li className="mr-4">
          <button onClick={logout}>Logout</button>
        </li>
        <li className="mr-4">
          <button>글쓰기</button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
