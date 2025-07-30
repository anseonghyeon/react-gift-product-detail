import { api } from '../../utils/api';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/queryKeys';
import styled from '@emotion/styled';

const ProductMainDetailWrapper = styled.div`
    padding: ${({ theme }) => theme.spacing.spacing5} ${({ theme }) => theme.spacing.spacing3};
`

const DetailItemWrapper = styled.div`
    margin: ${({ theme }) => theme.spacing.spacing3} 0;
`

const DetailItemName = styled.h3`
    font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
    font-weight: ${({ theme }) => theme.typography.label.label1Bold.fontWeight};
    line-height: ${({ theme }) => theme.typography.label.label1Bold.lineHeight};
    color: ${({ theme }) => theme.colors.gray.gray800};
    padding: ${({ theme }) => theme.spacing.spacing3} 0;
    
`

const DetailItemContent = styled.p`
    font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
    font-weight: ${({ theme }) => theme.typography.body.body1Regular.fontWeight};
    line-height: ${({ theme }) => theme.typography.body.body1Regular.lineHeight};
    color: ${({ theme }) => theme.colors.gray.gray900};
    padding: ${({ theme }) => theme.spacing.spacing3} 0;
`

interface ProductAnnouncement {
    name: string;
    value: string;
    displayOrder: number;
}

interface ProductDetail {
    description: string;
    announcements: ProductAnnouncement[];
}

function ProductMainDetail({ id }: { id: string | null }) {
    const fetchProductDetail = async (): Promise<ProductDetail> => {
        const response = await api.get(`/products/${id}/detail`);
        return response.data.data;
    }

    const { data } = useQuery<ProductDetail>({
        queryKey: [QUERY_KEY.PDETAIL],
        queryFn: fetchProductDetail
    });

    return (
        <ProductMainDetailWrapper>
            {
                data?.announcements?.map((item) => (
                    <DetailItemWrapper key={item.displayOrder}>
                        <DetailItemName>{item.name}</DetailItemName>
                        <DetailItemContent>{item.value}</DetailItemContent>
                    </DetailItemWrapper>
                ))
            }
        </ProductMainDetailWrapper>
    );
}

export default ProductMainDetail;