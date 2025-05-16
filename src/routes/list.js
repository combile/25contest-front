import Auth from "../page/Auth/AuthPage";
import SignUpFlow from "../page/Auth/SignUp/SignUpContainer"
import Tutorial from "../page/Tutorial"
import Loading from "../page/Loading"

// 유저 인증이 필요 없는 페이지들은 여기
const routes = [
  { path: "/tutorial", element: <Tutorial/> },
  { path: "/", element: <Loading/> },
  { path: "/auth", element: <Auth/> },
  { path: "/auth/signup", element: <SignUpFlow/>}
];

export default routes;
