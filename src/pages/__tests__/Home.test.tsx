import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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
        </MemoryRouter>
    );
};

test('로딩 중에는 Spinner가 렌더링된다', async () => {
    renderHomePage();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
});

test('더보기 버튼 클릭 시 전체 상품(20개)이 보여진다', async () => {
    renderHomePage();

    const moreButton = await screen.findByRole('button', { name: /더보기/i });
    fireEvent.click(moreButton);

    await waitFor(() => {
        const items = screen.getAllByTestId('product-item');
        expect(items.length).toBe(20);
    });
});

test('접기 버튼 클릭 시 다시 6개만 보여진다', async () => {
    renderHomePage();

    const moreButton = await screen.findByRole('button', { name: /더보기/i });
    fireEvent.click(moreButton);

    const foldButton = await screen.findByRole('button', { name: /접기/i });
    fireEvent.click(foldButton);

    await waitFor(() => {
        const items = screen.getAllByTestId('product-item');
        expect(items.length).toBe(6);
    });
});