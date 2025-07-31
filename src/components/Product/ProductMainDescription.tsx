import { api } from '../../utils/api';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/queryKeys';
import styled from '@emotion/styled';

const ProductMainDescriptionWrapper = styled.div`
    width: 100%;
`

const DescriptionTitle = styled.p`
    text-align: center;
    margin-top: ${({ theme }) => theme.spacing.spacing3};
`

const DescriptionImg = styled.img`
    width: 100%;
    height: auto;
    max-width: 100%;
`

function parseProductDescription(html: string): {
    paragraphs: string[];
    imageUrls: string[];
} {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const paragraphs = Array.from(doc.querySelectorAll('p'))
        .map(p => p.textContent?.trim() || '')
        .filter(Boolean);

    const imageUrls = Array.from(doc.querySelectorAll('img'))
        .map(img => img.getAttribute('src') || '');

    return { paragraphs, imageUrls };
}

interface ProductAnnouncement {
    name: string;
    value: string;
    displayOrder: number;
}

interface ProductDetail {
    description: string;
    announcements: ProductAnnouncement[];
}

function ProductMainDescription({ id }: { id: string | null }) {
    const fetchProductDetail = async (): Promise<ProductDetail> => {
        const response = await api.get(`/products/${id}/detail`);
        return response.data.data;
    }

    const { data } = useQuery<ProductDetail>({
        queryKey: [QUERY_KEY.PDETAIL('productDetail')],
        queryFn: fetchProductDetail
    });

    if (!data?.description) return null;

    const { paragraphs, imageUrls } = parseProductDescription(data.description);

    return (
        <ProductMainDescriptionWrapper>
            {paragraphs.map((text, i) => (
                <DescriptionTitle key={`text-${i}`}>{text}</DescriptionTitle>
            ))}
            {imageUrls.map((src, i) => (
                <DescriptionImg key={`img-${i}`} src={src} alt={`상품 설명 이미지 ${i + 1}`} />
            ))}
        </ProductMainDescriptionWrapper>
    );
}

export default ProductMainDescription;