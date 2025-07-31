// 4. 이제 여기서 테스트 진행함
// describe, it or test 우리는 test를 쓴다 it과 테스트는 선호도차이
// `render`: 컴포넌트를 가상 DOM에 렌더링하여 테스트할 수 있도록 하는 함수예요.
// `screen`: 가상 DOM에서 요소를 찾기 위한 유틸리티를 제공하는 객체예요.
// `fireEvent`: 사용자 이벤트를 시뮬레이션하는 함수예요.
import { render, screen, fireEvent ,waitFor} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import Order from '../Order';

const renderOrderPage = () => {
    const queryClient = new QueryClient();
    render(
        <MemoryRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <Order />
                </ThemeProvider>
            </QueryClientProvider>
        </MemoryRouter>
    );
};

test('카드메세지에 메세지가 없이 주문하기 버튼을 누르면 에러 텍스트가 뜨는지 확인', async () => {
    // Given 테스트의 초기 상태나 조건을 설정함
    renderOrderPage();
    
    const messageInput = await screen.findByTestId('card-msg');
    fireEvent.change(messageInput, { target: { value: ''}});

    const orderButton = await screen.findByTestId('order-btn');
    // When 테스트 대상이 되는 행동을 수행함
    fireEvent.click(orderButton);

    // Then 행동의 결과를 확인함
    // expect는 테스트의 결과를 검증하기 위한 vitest의 함수, 이 함수는 기대하는 값을 인자로 받아, 이를 기반으로 실제 결과와 비교
    // toBe는 expect 함수와 함께 사용되어, 기대하는 값과 실제 값이 일치하는지 확인하는 Jest의 matcher 함수
    // expect 값(이게) .메서드(이거야? 이렇게야?)
    const errorMsg = await screen.findByTestId('card-error-msg');

    await waitFor(() => {
        expect(errorMsg).toBeInTheDocument();
      });
});

test('보내는 사람에 이름이 없이 주문하기 버튼을 누르면 에러 텍스트가 뜨는지 확인', async () => {
    // Given 테스트의 초기 상태나 조건을 설정함
    renderOrderPage();

    const senderInput = await screen.findByTestId('sender-name');
    fireEvent.change(senderInput, { target: { value: ''}});

    const orderButton = await screen.findByTestId('order-btn');
    // When 테스트 대상이 되는 행동을 수행함
    fireEvent.click(orderButton);

    // Then 행동의 결과를 확인함
    // expect는 테스트의 결과를 검증하기 위한 vitest의 함수, 이 함수는 기대하는 값을 인자로 받아, 이를 기반으로 실제 결과와 비교
    // toBe는 expect 함수와 함께 사용되어, 기대하는 값과 실제 값이 일치하는지 확인하는 Jest의 matcher 함수
    // expect 값(이게) .메서드(이거야? 이렇게야?)
    const errorMsg = await screen.findByTestId('sender-error-msg');

    await waitFor(() => {
        expect(errorMsg).toBeInTheDocument();
      });
});

// 하나의 테스트 코드엔 하나의 시나리오만 테스트한다
// describe으로 여러 테스트를 감쌀수도 있음
// npm run test로 테스트 코드 실행함