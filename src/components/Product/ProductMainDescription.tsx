import styled from "@emotion/styled";


const ProductMainDescriptionWrapper = styled.div`
    width: 100%;
    height: 900px;
    display: flex;
    justify-content: center;
    align-items: center;
`

function ProductMainDescription() {

    return (
        <ProductMainDescriptionWrapper>
            이곳은 상품 설명 이미지가 들어가야 할곳임
        </ProductMainDescriptionWrapper>
    );
}

export default ProductMainDescription;