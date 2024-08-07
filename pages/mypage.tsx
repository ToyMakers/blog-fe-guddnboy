import React, { useState, useEffect } from 'react';
import useStore from '../store/store';
import { useRouter } from 'next/router';

const mypage = () => {
  const { nickname, bio, setNickname, setBio } = useStore();
  const [initialNickname, setInitialNickname] = useState('');
  const [initialBio, setInitialBio] = useState('');
  const [isEditingNickname, setisEditingNickname] = useState(false);
  const [isEditingBio, setisEditingBio] = useState(false);
  const router = useRouter();
  const navigateTo = (path: string) => router.push(path);

  const nicknameRegex = /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{1,8}$/;
  const bioRegex = /^[a-zA-Z0-9ㄱ-ㅎ가-힣\n .,!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/\\]{1,200}$/;

  const updateNickname = async () => {
    const token = localStorage.getItem('access_token');
    setisEditingNickname(!isEditingNickname);
    setisEditingNickname(!isEditingNickname);

    if (!nicknameRegex.test(nickname)) {
      alert('닉네임은 8자 이내의 한글, 영문, 숫자만 사용 가능합니다.');
      setNickname(initialNickname);
    } else {
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
        setInitialNickname(nickname);
      } catch (error) {
        console.error(error);
        alert('닉네임을 수정하는 데 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const updateBio = async () => {
    const token = localStorage.getItem('access_token');
    setisEditingBio(!isEditingBio);

    if (!bioRegex.test(bio)) {
      alert(`소개는 200자 이내로 작성해주세요.\n(${bio.length} / 200)`);
      setisEditingBio(!isEditingBio);
      setBio(initialBio);
    } else {
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
        setInitialBio(bio);
      } catch (error) {
        console.error(error);
        alert('소개를 수정하는 데 실패했습니다. 다시 시도해주세요.');
      }
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
        <div className="mt-8 items-center">
          <div className="flex justify-between items-center w-80">
            <div className="text-[20px] text-center w-20">닉네임</div>
            <div className="h-[18px] border-l-2 px-2"></div>
            <div className="flex w-60">
              {isEditingNickname ? (
                <section className="w-full">
                  <input
                    className="resize-none w-full h-6 align-middle bg-slate-200 rounded-sm outline-slate-800 outline-1"
                    value={nickname}
                    data-selector="nickname"
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                  />
                  <div className="flex flex-row justify-end">
                    <div>{nickname.length}/8</div>
                    <div>
                      <button
                        onClick={() => updateNickname()}
                        className="w-10 bg-modifyfont rounded-sm text-white hover:bg-modifyfontHover">
                        저장
                      </button>
                    </div>
                  </div>
                </section>
              ) : (
                <>
                  <div className="w-full align-middle flex flex-">{nickname}</div>
                  <div>
                    <button
                      onClick={() => setisEditingNickname(!isEditingNickname)}
                      className="modify-btn">
                      수정
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center w-80 mt-4">
          <div className="text-[20px] text-center w-[80px]">소개</div>
          <div className="h-[48px] border-l-2 px-2"></div>
          <div className="w-60">
            {isEditingBio ? (
              <>
                <textarea
                  className="resize-none w-full h-40 align-middle bg-slate-200 rounded-sm outline-slate-800 outline-1"
                  value={bio}
                  data-selector="bio"
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}></textarea>
                <div className="flex justify-end">
                  <div className="font-titleColor pr-4">{bio.length}/200</div>
                  <button
                    onClick={() => updateBio()}
                    className="w-10 bg-modifyfont rounded-sm text-white hover:bg-modifyfontHover ">
                    저장
                  </button>
                </div>
              </>
            ) : (
              <div className="flex">
                <div className="w-full align-middle flex flex-">{bio}</div>
                <div>
                  <button onClick={() => setisEditingBio(!isEditingBio)} className="modify-btn">
                    수정
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default mypage;
