import React from 'react';

const PostCard = ({ post }: { post: any }) => {
  return (
    <div className="gap-4">
      <li className="blog-card flex flex-col w-full h-full text-titleColor">
        <div className="flex justify-center items-center text-center w-full h-[48px] border-b-[1px] border-b-slate-200 text-[18px] overflow-hidden">
          {post.title}
        </div>
        <div className="text-[16px] h-[210px] m-2 overflow-hidden">{post.content}</div>
        <footer className="flex items-center justify-between w-full h-12 text-left p-4 text-[14px] border-t-[1px] border-t-slate-200">
          <div className="pr-4">by {post.author}</div>
          <div className="flex items-center gap-1">
            <img src="/assets/likes.png" alt="likes" className="w-3 h-3" />
            {post.likes}
          </div>
        </footer>
      </li>
    </div>
  );
};

export default PostCard;
