import { http, HttpResponse } from 'msw'
const testBaseURL = 'http://localhost:3000/api'

// 1. 여기에 목데이터들을 가져올 핸들러 설정하면댐 이제 여기에 테스트에 쓸 여러 핸들러들을 만들어 두는거지
// 이제 아래의 핸들러들의 url에 요청하는 작업은 여기서 가로채서 목데이터를 주게됨 테스트 코드에선

export const handlers = [
    // 상품 요약 정보 핸들러
    http.get(`${testBaseURL}/products/:id/summary`, ({ params }) => {
        const { id } = params;
        return HttpResponse.json({
            data: {
                brandName: 'MockBrand',
                imageURL: 'https://mock.image/url.jpg',
                name: `상품 이름 (${id})`,
                price: 12345,
            }
        });
    }),

    // 주문 요청 핸들러
    http.post(`${testBaseURL}/order`, async () => {

        return HttpResponse.json({
            success: true,
        });
    }),
];
