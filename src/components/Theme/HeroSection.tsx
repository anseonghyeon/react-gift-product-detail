// import { Spinner } from '@/components/Spinner';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { api, IsErrorStatus } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '@/components/Spinner';

const HeroSectionWrapper = styled.div<{ backgroundColor: string }>`
  width: auto;
  height: 100px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: ${({ theme }) => theme.spacing.spacing3};
    ${({ theme }) => theme.spacing.spacing3};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const HeroSectionName = styled.h1`
  color: ${({ theme }) => theme.colors.gray.gray00};
  font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label.label1Bold.lineHeight};
`;

const HeroSectionTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray.gray00};
  font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title.title1Bold.lineHeight};
`;

const HeroSectionDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray.gray00};
  font-size: ${({ theme }) =>
    theme.typography.subtitle.subtitle1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.subtitle.subtitle1Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.subtitle.subtitle1Regular.lineHeight};
`;

type Hero = {
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

function HeroSection({ themeId }: { themeId: string }) {
  const [hero, setHero] = useState<Hero>({
    name: '',
    title: '',
    description: '',
    backgroundColor: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThemeHero = async () => {
      try {
        const response = await api.get(`/themes/${themeId}/info`);

        setHero(response.data.data);
        setIsLoading(false);
      } catch (error) {
        IsErrorStatus(error, '', navigate);
      } finally {
      }
    };

    fetchThemeHero();
  }, [themeId]);

  if (isLoading) return <Spinner />;
  return (
    <HeroSectionWrapper backgroundColor={hero.backgroundColor}>
      <HeroSectionName>{hero.name}</HeroSectionName>
      <HeroSectionTitle>{hero.title}</HeroSectionTitle>
      <HeroSectionDescription>{hero.description}</HeroSectionDescription>
    </HeroSectionWrapper>
  );
}

export default HeroSection;
