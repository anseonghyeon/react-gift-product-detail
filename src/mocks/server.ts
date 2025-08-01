import { setupServer } from 'msw/node';
import { handlers } from './handlers.ts';

// 2. 여기서는 이제 핸들러들을 서버설정을 추가
export const server = setupServer(...handlers);
