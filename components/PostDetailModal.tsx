import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Url } from 'next/dist/shared/lib/router/router';
import Header from '@/components/Header';
import userStore from '@/store/userStore';

interface Post {
  title: string;
  category: string;
  content: string;
}

const PostDetailModal = ({
  isOpen,
  onClose,
  post,
}: {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
}) => {
  const router = useRouter();

  const navigateTo = async (path: Url) => {
    onClose();
    router.push(path);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-8 rounded-lg w-3/4 max-w-2xl relative">
        <button className="absolute top-4 right-4 text-gray-600 text-lg" onClick={onClose}>
          X
        </button>
        <div>
          <section className="mt-6">
            <div className="text-[44px] w-full h-[66px] font-sans font-bold">{post.title}</div>
            <div className="h-full border-b-[6px] border-gray-800 w-[80px]"></div>
          </section>
          <section className="flex mt-5 w-full h-18px">
            <div className="w-full text-[18px] text-tagColor">{post.category}</div>
          </section>
          <section>
            <div className="w-full "></div>
            <div className="w-full h-[400px] mt-5 text-tagColor text-[18px]">{post.content}</div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
