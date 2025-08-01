// 4. 이제 여기서 테스트 진행함
// 4-1 우선 render로 테스트 하고자하는 컴포넌트를 렌더링한다
// 4-2 screen으론 가상 DOM에 렌더링된 요소를 찾기위한 메소도들을 제공해주는 객체이다
// 4-3 fireEvent로 screen으로 찾은 요소에 이벤트를 발생시킨다
// 4-4 expect로 테스트의 결과를 검증한다
// 하나의 테스트 코드엔 하나의 시나리오만 테스트한다
// npm run test로 테스트 코드 실행함

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import Login from '../Login';

const renderLoginPage = () => {
  const queryClient = new QueryClient();
  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Login />
        </ThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

test('폼이 유효하지 않으면 로그인 버튼이 비활성화상태가 되는제 체크함', () => {
  // Given 테스트의 초기 상태나 조건을 설정함
  renderLoginPage();
  const loginButton = screen.getByRole('button', { name: /로그인/i });

  // Then 행동의 결과를 확인함
  expect(loginButton).toBeDisabled();
});

test('유효한 이메일, 비번 입력시 로그인 버튼이 활성화됨', async () => {
  // Given 테스트의 초기 상태나 조건을 설정함
  renderLoginPage();

  const emailInput = screen.getByPlaceholderText('이메일');
  const passwordInput = screen.getByPlaceholderText('비밀번호');

  // When 테스트 대상이 되는 행동을 수행함
  fireEvent.change(emailInput, { target: { value: 'mock@kakao.com' } });
  fireEvent.blur(emailInput);

  fireEvent.change(passwordInput, { target: { value: 'mock0927' } });
  fireEvent.blur(passwordInput);

  // Then 행동의 결과를 확인함
  await waitFor(() => {
    expect(screen.getByRole('button', { name: /로그인/i })).toBeEnabled();
  });
});
