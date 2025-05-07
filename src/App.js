import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 라우팅
import routes from "./routes/list.js";
import protectedRoutes from "./routes/protectedList.js";
import UserValidate from "./routes/UserValidate.jsx";

// 전역 스타일
import GlobalStyle from "./styles/styledComponents/GlobalStyle.jsx";
import { ThemeProvider } from "styled-components";

// 테마 설정 스타일 (다크모드 화이트 모드) => 이건 시간 남으면
import theme from "./styles/styledComponents/theme.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* 공개 라우트 */}
          {routes.map((route) => (
            // key 값은 인덱스가 아닌 변하지 않는 고유 값을 추천함. 리액트 자체적으로 그걸 권장. 참고 바람.
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          {/* 보호 라우트, 유저 검증 필요 */}
          {protectedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<UserValidate>{route.element}</UserValidate>}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
