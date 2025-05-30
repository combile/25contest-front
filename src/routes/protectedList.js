// 유저 인증이 필요한 페이지들은 여기

import ArticleDetail from "../page/ArticleDetail";
import LevelCheck from "../page/LevelCheck";
import LevelTest from "../page/LevelTest";
import ContentsMain from "../page/ContentsMain";
import ContentsBookmark from "../page/ContentsBookmark";
import ContentsTrend from "../page/ContentsTrend";
import UserValidate from "../routes/UserValidate";
import SearchPage from "../page/SearchPage";
import Test from "../page/Test";

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
        <ContentsBookmark />
      </UserValidate>
    ),
  },
  {
    path: "/comment-test/:uuid",
    element: (
      <UserValidate>
        <Test />
      </UserValidate>
    ),
  },
  {
    path: "/search",
    element: (
      <UserValidate>
        <SearchPage />
      </UserValidate>
    ),
  },
];

export default protectedRoutes;
