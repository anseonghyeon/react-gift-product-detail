import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useState } from 'react';

import { api } from '../../utils/api';

import { useQuery } from '@tanstack/react-query';

import QUERY_KEY from '@/constants/queryKeys';
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

// 더보기버튼 시작
const ExtraBtnWrapper = styled.div`
  width: auto;
  height: auto;
  padding-top: ${({ theme }) => theme.spacing.spacing8};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExtraBtn = styled.button`
  width: 480px;
  height: ${({ theme }) => theme.spacing.spacing11};

  background-color: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray400};
  border-radius: 5px;

  font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  line-height: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  cursor: pointer;
`;

const SpinnerWrapper = styled.div`
  width: auto;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessageWrapper = styled.div`
  width: auto;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.p``;

type RankingItem = {
  id: number;
  brandInfo: {
    name: string;
  };
  imageURL: string;
  name: string;
  price: {
    sellingPrice: number;
    basicPrice: number;
  };
};

function RealtimeRankItemWrapper({
  selectedGroup,
  selectedType,
}: {
  selectedGroup: string;
  selectedType: string;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigate = useNavigate();

  // 더보기버튼 클릭시 state를 반전해주는 핸들러
  const handleCollapsedClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  // item클릭시 해당 item정보들을 url query로들고 Order페이지로 가는 핸들러
  const handleItemClick = (
    id: number,
  ) => {
    const query = new URLSearchParams({
      id: id.toString(),
    }).toString();

    navigate(`/product?${query}`);
  };
  
  const fetchRanking = async () => {
    const response = await api.get(
      `/products/ranking?targetType=${selectedGroup}&rankType=${selectedType}`,
    );
    return response.data.data;
  };

  const {data, error, isLoading } = useQuery<RankingItem[]>({
    queryKey: [QUERY_KEY.RTITEM, selectedGroup, selectedType],
    queryFn: fetchRanking
  });

  if (isLoading) {
    return (
      <SpinnerWrapper>
        <Spinner data-testid="spinner"/>
      </SpinnerWrapper>
    );
  }

  if (error || data?.length === 0) {
    return (
      <ErrorMessageWrapper>
        <ErrorMessage>상품이 없습니다</ErrorMessage>
      </ErrorMessageWrapper>
    );
  }

  return (
    <RealtimeRankItemWrapperStyle>
      <RealtimeRankItemGrid>
        {(isCollapsed ? data : data?.slice(0, 6))?.map((item) => (
          <RealtimeRankItem
            key={item.id}
            onClick={() =>
              handleItemClick(
                item.id,
              )
            }
            data-testid="product-item"
          >
            <RealtimeItemImg
              src={item.imageURL}
              alt={item.name}
            ></RealtimeItemImg>
            <RealtimeItemTxt>{item.brandInfo.name}</RealtimeItemTxt>
            <RealtimeItemSubTxt>{item.brandInfo.name}</RealtimeItemSubTxt>
            <RealtimeItemPriceTxt>
              {item.price.sellingPrice} 원
            </RealtimeItemPriceTxt>
          </RealtimeRankItem>
        ))}
      </RealtimeRankItemGrid>

      {/* 더보기 접기 버튼 */}
      <ExtraBtnWrapper>
        <ExtraBtn
          onClick={() => {
            handleCollapsedClick();
          }}
        >
          {isCollapsed ? '접기' : '더보기'}
        </ExtraBtn>
      </ExtraBtnWrapper>
    </RealtimeRankItemWrapperStyle>
  );
}

export default RealtimeRankItemWrapper;
