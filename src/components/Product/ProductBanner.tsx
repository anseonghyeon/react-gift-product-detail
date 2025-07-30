import { api } from '../../utils/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/queryKeys';
import styled from '@emotion/styled';

const ProductBannerWrapper = styled.div`
    width: auto;
    border-bottom: ${({ theme }) => theme.spacing.spacing2} solid ${({ theme }) => theme.colors.gray.gray200};
`

const ProductBannerImg = styled.img`
    width: 100%;
    height: auto;
    max-width: 100%;
`

const ProductBannerTitlePriceWrapper = styled.div`
    padding: ${({ theme }) => theme.spacing.spacing4} ${({ theme }) => theme.spacing.spacing4};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray300};
`

const ProductBannerTitle = styled.h1`
    font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
    font-weight: ${({ theme }) => theme.typography.title.title1Bold.fontWeight};
    line-height: ${({ theme }) => theme.typography.title.title1Bold.lineHeight};
    margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`

const ProductBannerPriceSpan = styled.span`
    font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
    font-weight: ${({ theme }) => theme.typography.title.title1Bold.fontWeight};
    line-height: ${({ theme }) => theme.typography.title.title1Bold.lineHeight};
`

const ProductBannerPrice = styled.p`
    font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
`

const ProductBannerBrandInfoWrapper = styled.div`
    display: flex;  
    align-items: center;
    padding: ${({ theme }) => theme.spacing.spacing4} ${({ theme }) => theme.spacing.spacing4};
`

const ProductBannerBrandInfoImg = styled.img`
    width: ${({ theme }) => theme.spacing.spacing8};
    border-radius: ${({ theme }) => theme.spacing.spacing5};
`

const ProductBannerBrandInfoName = styled.p`
    margin-left: ${({ theme }) => theme.spacing.spacing2};
`

interface ProductBasicInfo {
    id: number;
    name: string;
    price: {
        basicPrice: number;
        sellingPrice: number;
        discountRate: number;
    };
    imageURL: string;
    brandInfo: {
        id: number;
        name: string;
        imageURL: string;
    };
}

function ProductBanner({ id }: { id: string | null }) {

    const fetchProductBasic = async (): Promise<ProductBasicInfo> => {
        const response = await api.get(`/products/${id}`);
        return response.data.data;
    }

    const { data } = useSuspenseQuery<ProductBasicInfo>({
        queryKey: [QUERY_KEY.PBASIC],
        queryFn: fetchProductBasic
    });

    // throw new Error('error');

    return (
        <ProductBannerWrapper>
            <ProductBannerImg src={data.imageURL} />
            <ProductBannerTitlePriceWrapper>
                <ProductBannerTitle>{data.name}</ProductBannerTitle>
                <ProductBannerPrice>
                    <ProductBannerPriceSpan>{data.price.sellingPrice}</ProductBannerPriceSpan>원
                </ProductBannerPrice>
            </ProductBannerTitlePriceWrapper>
            <ProductBannerBrandInfoWrapper>
                <ProductBannerBrandInfoImg src={data.brandInfo.imageURL}></ProductBannerBrandInfoImg>
                <ProductBannerBrandInfoName>{data.brandInfo.name}</ProductBannerBrandInfoName>
            </ProductBannerBrandInfoWrapper>
        </ProductBannerWrapper>
    );
}

export default ProductBanner;