import React from 'react';

const BlogCard = () => {
  return (
    <div className="w-[280px] h-[280px] content transition hover:-translate-y-2 hover:cursor-pointer shadow-md rounded-md bg-white">
      <li className="flex flex-col w-[280px] h-[280px] text-titleColor">
        <div className="flex justify-center items-center text-center w-full h-[48px] border-b-[1px] border-b-slate-200 text-[18px]">
          블로그 제목 표시
        </div>
        <div className="text-[16px] h-[210px] m-2">이 부분에 게시글 내용이 표시될 예정입니다.</div>
        <footer className="flex items-center w-full h-[48px] text-left pl-4 text-[14px] border-t-[1px] border-t-slate-200">
          <div>by 작성자</div>
        </footer>
      </li>
    </div>
  );
};

export default BlogCard;
