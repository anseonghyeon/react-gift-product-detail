import styled from '@emotion/styled';
import PromoBanner from './PromoBanner';

import { useEffect, useState } from 'react';

import { api } from '../../utils/api';

import { useNavigate } from 'react-router-dom';

const GiftCategorySelectorStyle = styled.div`
  width: auto;
  height: auto;
  padding: ${({ theme }) => theme.spacing.spacing8};
    ${({ theme }) => theme.spacing.spacing4};
`;

const GiftCategorySelectorTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title.title1Bold.lineHeight};
`;

const GiftCategorySelectorItemBoxWrapper = styled.div`
  width: 100%;
  height: 300px;
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

const GiftCategorySelectorItemBoxGrid = styled.div`
  width: auto;
  height: auto;
  margin-top: ${({ theme }) => theme.spacing.spacing5};
  margin-bottom: ${({ theme }) => theme.spacing.spacing10};

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: ${({ theme }) => theme.spacing.spacing5};
  column-gap: ${({ theme }) => theme.spacing.spacing16};
`;

const GiftCategorySelectorItemWrapper = styled.div`
  width: auto;
  height: auto;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GiftCategorySelectorItemImg = styled.img`
  width: ${({ theme }) => theme.spacing.spacing13};
  height: ${({ theme }) => theme.spacing.spacing13};
  border-radius: ${({ theme }) => theme.spacing.spacing4};
`;

const GiftCategorySelectorItemText = styled.p`
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.spacing1};
`;

type Theme = {
  themeId: number;
  image: string;
  name: string;
};

function GiftCategorySelectorItemBox() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  // 최초 랜더링시 axios로 api요청후 state 세팅
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await api.get('/themes');
        setThemes(response.data.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemes();
  }, []);

  // 로딩중일때 spinner 패인팅
  if (isLoading) {
    return <Spinner />;
  }

  // 에러뜨면 아무것도 표시 x
  if (isError) {
    return null;
  }

  const handleThemeClick = (themeId: number) => {
    const query = new URLSearchParams({
      themeId: themeId.toString(),
    }).toString();

    navigate(`/theme?${query}`);
  };

  return (
    <GiftCategorySelectorItemBoxGrid>
      {themes.map((item) => (
        <GiftCategorySelectorItemWrapper
          key={item.themeId}
          onClick={() => handleThemeClick(item.themeId)}
        >
          <GiftCategorySelectorItemImg
            src={item.image}
            alt={item.name}
          ></GiftCategorySelectorItemImg>
          <GiftCategorySelectorItemText>
            {item.name}
          </GiftCategorySelectorItemText>
        </GiftCategorySelectorItemWrapper>
      ))}
    </GiftCategorySelectorItemBoxGrid>
  );
}

function GiftCategorySelector() {
  return (
    <GiftCategorySelectorStyle>
      <GiftCategorySelectorTitle>선물 테마</GiftCategorySelectorTitle>
      <GiftCategorySelectorItemBoxWrapper>
        <GiftCategorySelectorItemBox />
      </GiftCategorySelectorItemBoxWrapper>
      <PromoBanner></PromoBanner>
    </GiftCategorySelectorStyle>
  );
}

export default GiftCategorySelector;
