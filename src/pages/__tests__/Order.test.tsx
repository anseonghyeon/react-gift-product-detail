// 4. 이제 여기서 테스트 진행함
// 4-1 우선 render로 테스트 하고자하는 컴포넌트를 렌더링한다
// 4-2 screen으론 가상 DOM에 렌더링된 요소를 찾기위한 메소도들을 제공해주는 객체이다
// 4-3 fireEvent로 screen으로 찾은 요소에 이벤트를 발생시킨다
// 4-4 expect로 테스트의 결과를 검증한다
// 하나의 테스트 코드엔 하나의 시나리오만 테스트한다
// npm run test로 테스트 코드 실행함

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import Order from '../Order';

const renderOrderPage = () => {
    const queryClient = new QueryClient();
    render(
        <MemoryRouter initialEntries={['/order?id=123']}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <Routes>
                        <Route path="/order" element={<Order />} />
                    </Routes>
                </ThemeProvider>
            </QueryClientProvider>
        </MemoryRouter>
    );
};

test('카드메세지에 메세지가 없이 주문하기 버튼을 누르면 에러 텍스트가 뜨는지 확인', async () => {
    // Given 테스트의 초기 상태나 조건을 설정함
    renderOrderPage();

    const messageInput = await screen.findByTestId('card-msg');
    fireEvent.change(messageInput, { target: { value: '' } });

    const orderButton = await screen.findByTestId('order-btn');

    // When 테스트 대상이 되는 행동을 수행함
    fireEvent.click(orderButton);

    // Then 행동의 결과를 확인함
    const errorMsg = await screen.findByTestId('card-error-msg');

    await waitFor(() => {
        expect(errorMsg).toBeInTheDocument();
    });
});

test('보내는 사람에 이름이 없이 주문하기 버튼을 누르면 에러 텍스트가 뜨는지 확인', async () => {
    // Given 테스트의 초기 상태나 조건을 설정함
    renderOrderPage();

    const senderInput = await screen.findByTestId('sender-name');
    fireEvent.change(senderInput, { target: { value: '' } });

    const orderButton = await screen.findByTestId('order-btn');

    // When 테스트 대상이 되는 행동을 수행함
    fireEvent.click(orderButton);

    // Then 행동의 결과를 확인함
    const errorMsg = await screen.findByTestId('sender-error-msg');

    await waitFor(() => {
        expect(errorMsg).toBeInTheDocument();
    });
});