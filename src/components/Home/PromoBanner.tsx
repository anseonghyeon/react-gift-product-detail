import styled from '@emotion/styled';

const PromoBannerWrapper = styled.div`
  width: auto;
  height: auto;
  background-color: ${({ theme }) => theme.colors.brand.kakaoYellow};
  border-radius: 16px;

  padding: ${({ theme }) => theme.spacing.spacing4};
`;

const PromoBannerTitle = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label2Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label2Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.label.label2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray700};
`;

const PromoBannerSubTitle = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label.label1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray1000};
`;

function PromoBanner() {
  return (
    <PromoBannerWrapper>
      <PromoBannerTitle>카카오테크 캠퍼스 3기여러분</PromoBannerTitle>
      <PromoBannerSubTitle>
        프론트엔드 2단계 과제 화이팅! 🎉
      </PromoBannerSubTitle>
    </PromoBannerWrapper>
  );
}

export default PromoBanner;
