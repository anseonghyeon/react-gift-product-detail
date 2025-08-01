import { api } from '../../utils/api';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/queryKeys';
import styled from '@emotion/styled';

const ProductMainReviewWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing5};
    ${({ theme }) => theme.spacing.spacing3};
`;
const ReviewItemWrapper = styled.div`
  margin: ${({ theme }) => theme.spacing.spacing3} 0;
`;

const ReviewItemName = styled.h3`
  font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label.label1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray800};
  padding: ${({ theme }) => theme.spacing.spacing3} 0;
`;

const ReviewItemContent = styled.p`
  font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.body1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray900};
  padding: ${({ theme }) => theme.spacing.spacing3} 0;
`;
interface Review {
  id: string;
  authorName: string;
  content: string;
}

interface ProductHighlightReview {
  totalCount: number;
  reviews: Review[];
}

function ProductMainReview({ id }: { id: string | null }) {
  const fetchProductBasic = async (): Promise<ProductHighlightReview> => {
    const response = await api.get(`/products/${id}/highlight-review`);
    return response.data.data;
  };

  const { data } = useQuery<ProductHighlightReview>({
    queryKey: [QUERY_KEY.PREVIEW('productReview')],
    queryFn: fetchProductBasic,
  });

  return (
    <ProductMainReviewWrapper>
      {data?.reviews.map((review) => (
        <ReviewItemWrapper key={review.id}>
          <ReviewItemName>{review.authorName}</ReviewItemName>
          <ReviewItemContent>{review.content}</ReviewItemContent>
        </ReviewItemWrapper>
      ))}
    </ProductMainReviewWrapper>
  );
}

export default ProductMainReview;
