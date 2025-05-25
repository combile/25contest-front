// 유저 인증이 필요한 페이지들은 여기

import ArticleDetail from "../page/ArticleDetail";
import LevelCheck from "../page/LevelCheck";
import LevelTest from "../page/LevelTest";
import ContentsMain from "../page/ContentsMain";
import ContentsTrend from "../page/ContentsTrend";
import UserValidate from "../routes/UserValidate"; // 경로 확인 필요

const protectedRoutes = [
  {
    path: "/level-check",
    element: (
      <UserValidate>
        <LevelCheck />
      </UserValidate>
    ),
  },
  {
    path: "/level-test",
    element: (
      <UserValidate>
        <LevelTest />
      </UserValidate>
    ),
  },
  {
    path: "/article/:uuid",
    element: (
      <UserValidate>
        <ArticleDetail />
      </UserValidate>
    ),
  },
  // {
  //   path: "/article",
  //   element: (
  //     <UserValidate>
  //       <ArticleDetail />
  //     </UserValidate>
  //   ),
  // },
  {
    path: "/dummy",
    element: (
      <UserValidate>
        <div>Dummy</div>
      </UserValidate>
    ),
  },
  {
    path: "/main",
    element: (
      <UserValidate>
        <ContentsMain />
      </UserValidate>
    ),
  },
  {
    path: "/trend",
    element: (
      <UserValidate>
        <ContentsTrend />
      </UserValidate>
    ),
  },
  {
    path: "/bookmark",
    element: (
      <UserValidate>
        <div>북마크페이지</div>
      </UserValidate>
    ),
  },
];

export default protectedRoutes;
