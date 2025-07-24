import styled from '@emotion/styled';

const ItemInfoWrapper = styled.div`
  width: auto;
  height: auto;
  padding: ${({ theme }) => theme.spacing.spacing3};
    ${({ theme }) => theme.spacing.spacing4};
`;

const ItemInfoTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.title.title2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.title2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title.title2Bold.lineHeight};
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`;

const ItemInfoBox = styled.div`
  width: auto;
  height: auto;
  padding: ${({ theme }) => theme.spacing.spacing3};
    ${({ theme }) => theme.spacing.spacing4};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray300};
  border-radius: 7px;

  display: flex;
  align-items: center;
`;

const ItemInfoBoxImg = styled.img`
  width: ${({ theme }) => theme.spacing.spacing16};
  height: ${({ theme }) => theme.spacing.spacing16};
  border-radius: 5px;
`;

const ItemBoxTxtWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: ${({ theme }) => theme.spacing.spacing3};
`;

const ItemBoxTxtTitle = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label1Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.label.label1Regular.lineHeight};
`;

const ItemBoxTxtSubTitle = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label2Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label2Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.label.label2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray600};
`;

const ItemBoxTxtPrice = styled.p`
  font-size: ${({ theme }) => theme.typography.body.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.body1Bold.lineHeight};
  margin-top: 4px;
`;

const ItemBoxTxtPriceLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.label.label1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label1Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.label.label1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray700};
`;

function ItemInfoCompo({ brandName, imageURL, name, price }: any) {
  return (
    <ItemInfoWrapper>
      <ItemInfoTitle>상품 정보</ItemInfoTitle>
      <ItemInfoBox>
        <ItemInfoBoxImg src={String(imageURL)} alt={String(name)} />
        <ItemBoxTxtWrapper>
          <ItemBoxTxtTitle>{name}</ItemBoxTxtTitle>
          <ItemBoxTxtSubTitle>{brandName}</ItemBoxTxtSubTitle>
          <ItemBoxTxtPrice>
            <ItemBoxTxtPriceLabel>상품가 </ItemBoxTxtPriceLabel>
            {price}원
          </ItemBoxTxtPrice>
        </ItemBoxTxtWrapper>
      </ItemInfoBox>
    </ItemInfoWrapper>
  );
}

export default ItemInfoCompo;
