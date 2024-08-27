import { useRouter } from 'next/router';
import React from 'react';

const PostCard = ({ post }: { post: any }) => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="gap-4" onClick={() => navigateTo('/postDetail')}>
      <li className="blog-card flex flex-col w-full h-full text-titleColor">
        <div className="flex justify-center items-center text-center w-full h-[48px] border-b-[1px] border-b-slate-200 text-[18px]">
          {post.title}
        </div>
        <div className="text-[16px] h-[210px] m-2">{post.content}</div>
        <footer className="flex items-center w-full h-[48px] text-left pl-4 text-[14px] border-t-[1px] border-t-slate-200">
          <div>by {post.author}</div>
        </footer>
      </li>
    </div>
  );
};

export default PostCard;