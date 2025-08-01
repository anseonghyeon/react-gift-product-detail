import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import Layout from '../components/Layout';
import NavBar from '../components/NavBar';

import useInput from '@/hooks/useInput';
import useUser from '@/hooks/useUser';

import { ToastContainer } from 'react-toastify';

import { api, IsErrorStatus } from '../utils/api';

import { useMutation } from '@tanstack/react-query';

const LoginFormWrapper = styled.div`
  width: auto;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray.gray00};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginFormTitle = styled.h1`
  font-size: 30px;
  margin-bottom: ${({ theme }) => theme.spacing.spacing9};
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: start;
`;

const LoginFormInput = styled.input<{ isValid: boolean }>`
  width: 390px;
  height: ${({ theme }) => theme.spacing.spacing10};
  margin-top: ${({ theme }) => theme.spacing.spacing4};

  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid
    ${({ theme, isValid }) =>
      isValid ? theme.colors.gray.gray400 : theme.colors.red.red600};

  &:focus {
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray700};
  }

  font-size: ${({ theme }) => theme.typography.title.title2Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.title.title2Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.title.title2Regular.lineHeight};

  ::placeholder {
    font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
    font-weight: ${({ theme }) =>
      theme.typography.body.body1Regular.fontWeight};
    line-height: ${({ theme }) =>
      theme.typography.body.body1Regular.lineHeight};
    color: ${({ theme }) => theme.colors.gray.gray600};
  }
`;

const LoginFormErrorTxt = styled.p`
  color: ${({ theme }) => theme.colors.red.red600};
  font-size: 12px;
`;

const LoginFormBtn = styled.button`
  width: 390px;
  height: ${({ theme }) => theme.spacing.spacing11};
  margin-top: ${({ theme }) => theme.spacing.spacing12};

  background-color: ${({ theme }) => theme.colors.brand.kakaoYellow};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  font-size: ${({ theme }) => theme.typography.label.label1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label1Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.label.label1Regular.lineHeight};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.yellow.yellow300};
    font-size: ${({ theme }) => theme.typography.label.label1Regular.fontSize};
    font-weight: ${({ theme }) =>
      theme.typography.label.label1Regular.fontWeight};
    line-height: ${({ theme }) =>
      theme.typography.label.label1Regular.lineHeight};
    cursor: not-allowed;
  }
`;

// 메인 컴포넌트
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // 전역에서 사용할 유저정보 저장하는 훅
  const { setEmail, setName, setAuthToken } = useUser();

  // 폼 검증하는 훅
  const email = useInput('email');
  const password = useInput('password');
  const isFormValid = email.isValid && password.isValid;

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        '/login',
        {
          email: email.value,
          password: password.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      setEmail(data.email);
      setName(data.name);
      setAuthToken(data.authToken);
      navigate(from, { replace: true });
    },
    onError: (error: any) => {
      IsErrorStatus(error, '@kakao.com 이메일 주소만 가능합니다', navigate);
    },
  });

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    loginMutation.mutate();
  };

  return (
    <Layout>
      <NavBar></NavBar>
      <LoginFormWrapper>
        <LoginFormTitle>KAKAO</LoginFormTitle>
        <LoginForm>
          {/* 아이디 input */}
          <LoginFormInput
            placeholder="이메일"
            type="email"
            value={email.value}
            onChange={(e) => email.onChange(e.target.value)}
            onBlur={email.onBlur}
            isValid={!email.error || !email.touched}
          ></LoginFormInput>
          {email.error && <LoginFormErrorTxt>{email.error}</LoginFormErrorTxt>}

          {/* 비밀번호 input */}
          <LoginFormInput
            placeholder="비밀번호"
            type="password"
            value={password.value}
            onChange={(e) => password.onChange(e.target.value)}
            onBlur={password.onBlur}
            isValid={!password.error || !password.touched}
          ></LoginFormInput>
          {password.error && (
            <LoginFormErrorTxt>{password.error}</LoginFormErrorTxt>
          )}

          <LoginFormBtn onClick={handleLogin} disabled={!isFormValid}>
            로그인
          </LoginFormBtn>
        </LoginForm>
      </LoginFormWrapper>
      <ToastContainer />
    </Layout>
  );
}

export default Login;
