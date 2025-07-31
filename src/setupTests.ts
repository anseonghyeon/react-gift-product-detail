import "@testing-library/jest-dom"
// 3. 여기서 테스트 설정 파일을 설정함
import { beforeAll, afterEach, afterAll} from "vitest";
import { server } from './mocks/server'

// 모든 테스트 전에 API 모킹 설정
beforeAll(() => server.listen());

// 각 테스트 후에 모든 핸들러 리셋
afterEach(() => server.resetHandlers());

// 테스트 후에 클린업
afterAll(() => server.close());


// export const server = setupServer();

// beforeEach(() => {
//   queryClient.clear();
// });
// beforeAll(() => server.listen());
// afterEach(() => {
//   server.resetHandlers();
// });
// afterAll(() => server.close());

// export const renderWithTheme = (children: React.ReactNode) => {
//   return render(
//     <BrowserRouter>
//       <QueryClientProvider client={queryClient}>
//         <AuthProvider>
//           <ThemeProvider theme={theme}>{children}</ThemeProvider>
//         </AuthProvider>
//       </QueryClientProvider>
//     </BrowserRouter>
//   );
// };