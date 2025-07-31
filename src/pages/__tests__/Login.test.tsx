import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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
        </MemoryRouter>
    );
};

test('폼이 유효하지 않으면 로그인 버튼이 비활성화상태가 되는제 체크함', () => {
    renderLoginPage();
    const loginButton = screen.getByRole('button', { name: /로그인/i });
    expect(loginButton).toBeDisabled();
});

test('유효한 이메일, 비번 입력시 로그인 버튼이 활성화됨', async () => {
    renderLoginPage();

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');

    fireEvent.change(emailInput, { target: { value: 'mock@kakao.com' } });
    fireEvent.blur(emailInput);

    fireEvent.change(passwordInput, { target: { value: 'mock0927' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
        expect(screen.getByRole('button', { name: /로그인/i })).toBeEnabled();
    });
});

