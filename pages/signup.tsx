import React from 'react';

const SignUp = () => {
  return (
    <main className={'flex min-h-screen flex-col items-center p-24'}>
      <div className="">
        <input type="text" placeholder="ID" />
      </div>
      <div>
        <input type="password" placeholder="Password" />
      </div>
      <div className="flex p-5 justify-between">
        <div>
          <div>
            <input type="text" placeholder="사용하실 닉네임을 작성하세요."></input>
            <input type="text" placeholder="비밀번호를 입력하세요."></input>
            <input type="text" placeholder="비밀번호를 다시 입력하세요."></input>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
