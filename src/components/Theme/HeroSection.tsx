import styled from '@emotion/styled';
import { api, IsErrorStatus } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '@/components/Spinner';

import { useQuery } from '@tanstack/react-query';

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
  const navigate = useNavigate();

  const fetchThemeHero = async (): Promise<Hero> => {
    const response = await api.get(`/themes/${themeId}/info`);

    return response.data.data;
  };

  const { data, error, isLoading } = useQuery<Hero>({
    queryKey: ['hero', themeId],
    queryFn: fetchThemeHero,
  });

  if (isLoading) return <Spinner />;

  if (error) {
    IsErrorStatus(error, '', navigate);
    return null;
  }

  if (!data) return null;

  return (
    <HeroSectionWrapper backgroundColor={data.backgroundColor}>
      <HeroSectionName>{data.name}</HeroSectionName>
      <HeroSectionTitle>{data.title}</HeroSectionTitle>
      <HeroSectionDescription>{data.description}</HeroSectionDescription>
    </HeroSectionWrapper>
  );
}

export default HeroSection;
