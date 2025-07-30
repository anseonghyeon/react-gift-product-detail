import { api } from '../../utils/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/queryKeys';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

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

interface ProductLikeInfo {
    wishCount: number,
    isWished: boolean,
}

function OrderBar({ id }: { id: string | null }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // 하트 디자인 상태를 바꾸는 state들
    const [likeStyle, setLikeStyle] = useState({
        fill: 'none',
        stroke: '#2a3038',
    });
    const [likeCount, setLikeCount] = useState<number | undefined>(0);
    const [isWished, setIsWished] = useState(false);

    // api로 좋아요수랑 좋아요한 여부 가져오는 코드
    const fetchProductLike = async (): Promise<ProductLikeInfo> => {
        const response = await api.get(`/products/${id}/wish`);
        return response.data.data;
    }

    const { data } = useQuery<ProductLikeInfo>({
        queryKey: [QUERY_KEY.PLIKE],
        queryFn: fetchProductLike,
        enabled: !!id,
    });

    useEffect(() => {
        if (data?.wishCount !== undefined) {
            setLikeCount(data.wishCount);
        }
    }, [data?.wishCount]);

    // 뮤테이션 코드
    const mutation = useMutation({
        // 요청하는 부분
        mutationFn: async () => {
            // await api.post(`/products/${id}/wish`); 이런 api는 없잖아????
        },
        // 요청직전 UI를 먼저 수정하고 이전 상태를 백업하는 부분
        onMutate: async () => {
            const previousStyle = likeStyle;
            const previousCount = likeCount;
            const previousWished = isWished;

            if (isWished) {
                setLikeStyle({ fill: 'none', stroke: '#2a3038' });
                setLikeCount(prev => (prev ?? 0) - 1);
                setIsWished(false);
            } else {
                setLikeStyle({ fill: '#fa342c', stroke: '#fa342c' });
                setLikeCount(prev => (prev ?? 0) + 1);
                setIsWished(true);
            }

            return { previousStyle, previousCount, previousWished };
        },
        // 요청 실패 시 백업된 상태로 롤백시키는 부분
        onError: (_err, _vars, context) => {
            if (context) {
                setLikeStyle(context.previousStyle);
                setLikeCount(context.previousCount);
                setIsWished(context.previousWished);
            }
        },
        // 요청 완료시 캐시 재검증 하는 부분
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PLIKE] });
        },
    });

    const handleLikeClick = () => {
        if(!id) return;
        mutation.mutate();
    }

    const handleOrderClick = () => {
        if (!id) return;
        navigate(`/order?id=${id}`);
    }

    return (
        <OrderBarWrapper>
            <OrderBarLikeBtn onClick={handleLikeClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={likeStyle.fill} stroke={likeStyle.stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart" aria-hidden="true">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z">
                    </path>
                </svg>
                <LikeBtnCount>{likeCount}</LikeBtnCount>
            </OrderBarLikeBtn>
            <OrderBarOrderBtn onClick={handleOrderClick}>주문하기</OrderBarOrderBtn>
        </OrderBarWrapper>
    );
}

export default OrderBar;

