// 유저 인증이 필요한 페이지들은 여기

import ArticleDetail from "../page/ArticleDetail";
import LevelCheck from "../page/LevelCheck";
import LevelTest from "../page/LevelTest";

const protectedRoutes = [
  { path: "/level-check", element: <LevelCheck /> },
  { path: "/level-test", element: <LevelTest /> },
  // { path: "/articles/:uuid", element: <ArticleDetail /> }, // api 연결시 활용
  { path: "/articles", element: <ArticleDetail /> },
  { path: "/dummy", element: <div>Dummy</div> },
];

export default protectedRoutes;
