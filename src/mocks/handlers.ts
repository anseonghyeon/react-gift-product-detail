import { http, HttpResponse } from 'msw';
const testBaseURL = 'http://localhost:3000/api';

// 1. 여기에 목데이터들을 가져올 핸들러 설정하면댐 이제 여기에 테스트에 쓸 여러 핸들러들을 만들어 두는거지
// 이제 아래의 핸들러들의 url에 요청하는 작업은 여기서 가로채서 목데이터를 주게됨 테스트 코드에선

export const handlers = [
  // 상품 요약 정보 핸들러
  http.get(`${testBaseURL}/products/:id/summary`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      data: {
        brandName: 'MockBrand',
        imageURL: 'https://mock.image/mock.jpg',
        name: `mock상품 (${id})`,
        price: 12345,
      },
    });
  }),

  // 주문 요청 핸들러
  http.post(`${testBaseURL}/order`, async () => {
    return HttpResponse.json({
      success: true,
    });
  }),

  // 로그인 핸들러
  http.post(`${testBaseURL}/login`, async ({ request }) => {
    const { email } = (await request.json()) as { email: string };
    if (!email.endsWith('@kakao.com')) {
      return HttpResponse.json(
        { message: '@kakao.com 이메일 주소만 가능합니다' },
        { status: 400 },
      );
    }
    return HttpResponse.json({
      data: {
        email: 'mock@kakao.com',
        name: '목목목',
        authToken: 'mockToken123',
      },
    });
  }),

  // 실시간 상승 아이템 가져오는 핸들러
  http.get('/products/ranking', () => {
    const mockRanking = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `상품 ${i + 1}`,
      imageURL: `https://mock.com/image${i + 1}.jpg`,
      price: {
        basicPrice: 1000 * (i + 1),
        sellingPrice: 1000 * (i + 1),
        discountRate: i,
      },
      brandInfo: {
        id: i + 1,
        name: `브랜드 ${i + 1}`,
        imageURL: `https://mock.com/brandInfoimage${i + 1}.jpg`,
      },
    }));

    return HttpResponse.json({ data: mockRanking });
  }),

  // 서머리
  http.get('/products/:id/summary', () => {
    return HttpResponse.json({
      data: {
        id: 123,
        name: '목 케이크',
        brandName: '목플레이스',
        imageURL: 'https://example.com/image.jpg',
        price: 20000,
      },
    });
  }),
];
