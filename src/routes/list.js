import Auth from "../page/AuthPage";
import SignUpFlow from "../page/SignUpContainer"
import Tutorial from "../page/Tutorial"
import Loading from "../page/Loading"

const routes = [
  { path: "/tutorial", element: <Tutorial/> },
  { path: "/", element: <Loading/> },
  { path: "/auth", element: <Auth/> },
  { path: "/auth/signup", element: <SignUpFlow/>}
];

export default routes;
