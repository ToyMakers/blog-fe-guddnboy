import React, { useState, useEffect } from 'react';
import useStore from '../store/store';
import { useRouter } from 'next/router';

const mypage = () => {
  const { nickname, bio, setNickname, setBio } = useStore();
  const [initialNickname, setInitialNickname] = useState('');
  const [initialBio, setInitialBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const navigateTo = (path: string) => router.push(path);

  const nicknameRegex = /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{1,8}$/;

  const updateProfile = async () => {
    const token = localStorage.getItem('access_token');

    if (!nicknameRegex.test(nickname)) {
      alert('닉네임은 8자 이내의 한글, 영문, 숫자만 사용 가능합니다.');
      return;
    }

    if (initialNickname === nickname && initialBio === bio) {
      alert('수정사항이 없습니다.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/users/profile`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname,
          bio,
        }),
      });
      alert('프로필이 수정되었습니다.');
      setInitialNickname(nickname);
      setInitialBio(bio);
      router.push('/home');
    } catch (error) {
      console.error(error);
      alert('프로필을 수정하는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('로그인이 필요합니다.');
        router.push('/login');
        return;
      }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/users/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('프로필을 가져오는 데 실패했습니다.');
        }
        const data = await response.json();
        setNickname(data.nickname);
        setBio(data.bio);
        setInitialNickname(data.nickname);
        setInitialBio(data.bio);
      } catch (error) {
        console.error(error);
        alert('프로필을 가져오는 데 실패했습니다.');
      }
    };
    fetchProfile();
  }, [setNickname, setBio, router]);

  return (
    <div className="w-full h-full">
      <section className="mt-8 mx-10">
        <div
          className="w-[120px] text-titleColor text-[21px] hover:cursor-pointer hover:-translate-y-1.5 transition"
          onClick={() => navigateTo('/home')}>
          OurBlog
        </div>
      </section>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex-row items-center">
          <div className="flex items-center mt-4 w-80">
            <div className="text-[20px] text-center w-20">닉네임</div>
            <div className="h-[18px] border-l-2 px-2"></div>
            <div className="flex w-60">
              {isEditing ? (
                <input
                  className="resize-none w-full h-6 align-middle bg-slate-200 rounded-sm outline-slate-800"
                  value={nickname}
                  data-selector="nickname"
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                />
              ) : (
                <div className="w-full align-middle">{nickname}</div>
              )}
              <button onClick={() => setIsEditing(!isEditing)} className="modify-btn font-">
                수정
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between align-middle items-center mt-4 w-80">
          <div className="text-[22px] w-20 text-center">소개</div>
          <div className="text-center w-50">
            <textarea
              className="resize-none w-50 h-40 rounded-[5px] outline-none"
              value={bio}
              data-selector="bio"
              onChange={(e) => {
                setBio(e.target.value);
              }}></textarea>
          </div>
        </div>
        <div className="w-80 h-12 flex justify-center bg-slate-300 text-white hover:bg-slate-600 transition rounded-[10px]">
          <button className="text-[22px]" onClick={updateProfile}>
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default mypage;
