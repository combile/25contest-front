// 유저 인증이 필요한 페이지들은 여기

import ArticleDetail from "../page/ArticleDetail";
import LevelCheck from "../page/LevelCheck";
import LevelTest from "../page/LevelTest";
import ContentsMain from "../page/ContentsMain";

const protectedRoutes = [
  { path: "/level-check", element: <LevelCheck /> },
  { path: "/level-test", element: <LevelTest /> },
  // { path: "/articles/:uuid", element: <ArticleDetail /> }, // api 연결시 활용
  { path: "/article", element: <ArticleDetail /> },
  { path: "/dummy", element: <div>Dummy</div> },
  { path: "/main", element: <ContentsMain /> },
  { path: "/trend", element: <div>트렌트페이지</div> },
  { path: "/bookmark", element: <div>북마크페이지</div> },
];

export default protectedRoutes;
