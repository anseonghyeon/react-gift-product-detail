import styled from '@emotion/styled';
import { useState } from 'react';

import ProductMainDescription from './ProductMainDescription';
import ProductMainReview from './ProductMainReview';

import ErrorBoundary from '@/utils/ErrorBoundary';

import ProductMainDetail from './ProductMainDetail';

const ProductMainWrapper = styled.div`
  width: auto;
`;

const ProductMainSelector = styled.div`
  display: flex;
`;

const ProductMainSelectorItem = styled.div<{ selected: boolean }>`
  width: 33%;
  cursor: pointer;
  border-bottom: ${({ selected, theme }) =>
    selected
      ? `2px solid ${theme.colors.gray.gray1000}`
      : `2px solid ${theme.colors.gray.gray300}`};
  font-size: ${({ theme }) => theme.typography.title.title2Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.title.title2Regular.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.title.title2Regular.lineHeight};
  padding: ${({ theme }) => theme.spacing.spacing4};
    ${({ theme }) => theme.spacing.spacing3};
  display: flex;
  justify-content: center;
  align-items: center;
`;
function ProductMain({ id }: { id: string | null }) {
  const [selected, setSelected] = useState('PRODUCT_INFO');

  const handleSelectorClick = (s: string) => {
    setSelected(s);
  };

  return (
    <ProductMainWrapper>
      <ProductMainSelector>
        <ProductMainSelectorItem
          onClick={() => handleSelectorClick('PRODUCT_INFO')}
          selected={selected === 'PRODUCT_INFO'}
        >
          상품설명
        </ProductMainSelectorItem>
        <ProductMainSelectorItem
          onClick={() => handleSelectorClick('GIFT-REVIEW')}
          selected={selected === 'GIFT-REVIEW'}
        >
          선물후기
        </ProductMainSelectorItem>
        <ProductMainSelectorItem
          onClick={() => handleSelectorClick('DETAIL-INFO')}
          selected={selected === 'DETAIL-INFO'}
        >
          상세정보
        </ProductMainSelectorItem>
      </ProductMainSelector>
      <ErrorBoundary fallback={<p>에러 발생</p>}>
        {selected === 'PRODUCT_INFO' && <ProductMainDescription id={id} />}
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>에러 발생</p>}>
        {selected === 'GIFT-REVIEW' && <ProductMainReview id={id} />}
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>에러 발생</p>}>
        {selected === 'DETAIL-INFO' && <ProductMainDetail id={id} />}
      </ErrorBoundary>
    </ProductMainWrapper>
  );
}

export default ProductMain;
