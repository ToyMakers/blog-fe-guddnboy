import React from 'react';
import Image from 'next/image';
import searchBtn from '../public/assets/searchbtn.png';
import backBtn from '../public/assets/backbtn.png';
import postBtn from '../public/assets/postbtn.png';

const write = () => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col pl-8 w-[50%] h-[100vh] bg-white font-sans">
        <section className="mt-6">
          <div className="resize-none">
            <input
              className="text-[44px] w-full h-[66px] resize-none outline-none font-sans font-bold"
              type="text"
              placeholder="제목을 입력하세요"
            />
          </div>
          <div className="mt-4 border-b-[6px] border-gray-800 w-[80px]"></div>
        </section>
        <section className="flex flex-row mt-5 h-full">
          <div className="flex justify-between text-tagColor w-[560px]">
            <div className="flex justify-center items-center">
              <input
                type="text"
                placeholder="태그를 입력하세요"
                className="w-full outline-none text-[18px] text-tagColor"
              />
            </div>
            <div className="flex justify-center items-center mr-4">
              <Image
                src={searchBtn}
                alt="검색"
                className="hover:cursor-pointer w-[36px] h-[36px] hover:bg-slate-300 rounded-full transition"></Image>
            </div>
          </div>
        </section>
        <section className="w-full h-[100vh]">
          <div>
            <textarea
              className="w-full h-[400px] mt-5 resize-none outline-none text-tagColor text-[18px] placeholder:italic"
              placeholder="당신의 이야기를 적어보세요..."
            />
          </div>
        </section>
        <section className="flex justify-between w-full h-[100vh]">
          <div className="ml-2 w-[36px] h-[36px] hover:bg-slate-300 rounded-full transition">
            <Image src={backBtn} alt="뒤로가기" />
          </div>
          <div className="mr-4 w-[36px] h-[36px] hover:bg-slate-300 rounded-full transition">
            <Image src={postBtn} alt="게시" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default write;
