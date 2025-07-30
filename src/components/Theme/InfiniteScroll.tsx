import { Spinner } from '@/components/Spinner';
import { useEffect, useRef } from 'react';
import { api, IsErrorStatus } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { useInfiniteQuery } from '@tanstack/react-query';

// Item 영역 시작
const RealtimeRankItemWrapperStyle = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RealtimeRankItemGrid = styled.div`
  width: auto;
  height: auto;
  margin-top: ${({ theme }) => theme.spacing.spacing4};
  margin-bottom: ${({ theme }) => theme.spacing.spacing5};

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: ${({ theme }) => theme.spacing.spacing5};
  column-gap: ${({ theme }) => theme.spacing.spacing3};
  justify-items: center;
`;

const RealtimeRankItem = styled.div`
  width: auto;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  cursor: pointer;
`;

const RealtimeItemImg = styled.img`
  width: 220px;
  height: auto;
  border-radius: 5px;
  position: relative;
`;

const RealtimeItemTxt = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label1Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.label.label1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray600};

  padding-top: ${({ theme }) => theme.spacing.spacing2};
`;

const RealtimeItemSubTxt = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label1Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.label.label1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray1000};

  padding-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const RealtimeItemPriceTxt = styled.p`
  font-size: ${({ theme }) => theme.typography.body.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.body1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray1000};
`;

type Item = {
  id: number;
  name: string;
  imageURL: string;
  brandInfo: {
    name: string;
  };
  price: {
    sellingPrice: number;
    basicPrice: number;
  };
};

type ThemeProductResponse = {
  list: Item[];
  cursor: number;
  hasMoreList: boolean;
};


function InfiniteScroll({ themeId }: { themeId: string }) {
  const loader = useRef(null);
  const navigate = useNavigate();

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ThemeProductResponse, Error, ThemeProductResponse>({
    queryKey: ['themeItems', themeId],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await api.get(`/themes/${themeId}/products?cursor=${pageParam}&limit=20`);
      return response.data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMoreList ? lastPage.cursor : undefined,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const el = loader.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleItemClick = (id: number) => {
    const query = new URLSearchParams({ id: id.toString() }).toString();
    navigate(`/product?${query}`);
  };

  if (isLoading) return <Spinner />;
  if (error) {
    IsErrorStatus(error, '', navigate);
    return null;
  }

  const allItems = (data as any)?.pages.flatMap((page:any) => page.list) || [];
  if (!isLoading && allItems.length === 0) return <h1>상품이 없습니다</h1>;

  return (
    <RealtimeRankItemWrapperStyle>
      <RealtimeRankItemGrid>
        {allItems.map((item:Item) => (
          <RealtimeRankItem key={item.id} onClick={() => handleItemClick(item.id)}>
            <RealtimeItemImg src={item.imageURL} alt={item.name} />
            <RealtimeItemTxt>{item.brandInfo.name}</RealtimeItemTxt>
            <RealtimeItemSubTxt>{item.brandInfo.name}</RealtimeItemSubTxt>
            <RealtimeItemPriceTxt>{item.price.sellingPrice} 원</RealtimeItemPriceTxt>
          </RealtimeRankItem>
        ))}
      </RealtimeRankItemGrid>
      {isFetchingNextPage && <Spinner />}
      <div ref={loader} style={{ height: '20px' }} />
    </RealtimeRankItemWrapperStyle>
  );
}

export default InfiniteScroll;
