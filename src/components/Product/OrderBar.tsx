import { api } from '../../utils/api';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/queryKeys';
import styled from '@emotion/styled';

import { useNavigate } from 'react-router-dom';

const OrderBarWrapper = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 720px;
    height: ${({ theme }) => theme.spacing.spacing12};
    background-color: ${({ theme }) => theme.colors.brand.kakaoYellow};
    display: flex;

`

const OrderBarLikeBtn = styled.div`
    cursor: pointer;
    width: 8%;
    background-color: ${({ theme }) => theme.colors.gray.gray00};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const LikeBtnCount = styled.p`
    font-size: 0.625rem;
`

const OrderBarOrderBtn = styled.div`
    cursor: pointer;
    width: 92%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.brand.kakaoYellow};
    font-size: ${({ theme }) => theme.typography.title.title2Bold.fontSize};
    font-weight: ${({ theme }) => theme.typography.title.title2Bold.fontWeight};
    line-height: ${({ theme }) => theme.typography.title.title2Bold.lineHeight};
`

function OrderBar({ id }: { id: string | null }) {
    const navigate = useNavigate();

    const handleOrderClick = () => {
          if(!id) {
            return;
          }
          navigate(`/order?id=${id}`);
    }

    return (
        <OrderBarWrapper>
            <OrderBarLikeBtn>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2a3038" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart" aria-hidden="true">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z">
                    </path>
                </svg>
                <LikeBtnCount>11353</LikeBtnCount>
            </OrderBarLikeBtn>
            <OrderBarOrderBtn onClick={handleOrderClick}>주문하기</OrderBarOrderBtn>
        </OrderBarWrapper>
    );
}

export default OrderBar;