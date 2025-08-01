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
import Home from '../Home';

const renderHomePage = () => {
  const queryClient = new QueryClient();
  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

test('로딩 중에는 Spinner가 렌더링된다', async () => {
  // Given 테스트의 초기 상태나 조건을 설정함
  renderHomePage();

  // Then 행동의 결과를 확인함
  expect(screen.getByTestId('spinner')).toBeInTheDocument();
});

test('더보기 버튼 클릭 시 전체 상품(20개)이 보여진다', async () => {
  // Given 테스트의 초기 상태나 조건을 설정함
  renderHomePage();

  const moreButton = await screen.findByRole('button', { name: /더보기/i });

  // When 테스트 대상이 되는 행동을 수행함
  fireEvent.click(moreButton);

  // Then 행동의 결과를 확인함
  await waitFor(() => {
    const items = screen.getAllByTestId('product-item');
    expect(items.length).toBe(20);
  });
});

test('접기 버튼 클릭 시 다시 6개만 보여진다', async () => {
  // Given 테스트의 초기 상태나 조건을 설정함
  renderHomePage();

  // When 테스트 대상이 되는 행동을 수행함
  const moreButton = await screen.findByRole('button', { name: /더보기/i });
  fireEvent.click(moreButton);

  const foldButton = await screen.findByRole('button', { name: /접기/i });
  fireEvent.click(foldButton);

  // Then 행동의 결과를 확인함
  await waitFor(() => {
    const items = screen.getAllByTestId('product-item');
    expect(items.length).toBe(6);
  });
});
