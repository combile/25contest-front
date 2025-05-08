// 유저 인증이 필요한 페이지들은 여기

import LevelCheck from "../page/LevelCheck";
import LevelTest from "../page/LevelTest";

const protectedRoutes = [
  { path: "/level-check", element: <LevelCheck /> },
  { path: "/level-test", element: <LevelTest /> },
];

export default protectedRoutes;
