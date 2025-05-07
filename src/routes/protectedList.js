// 유저 인증이 필요한 페이지들은 여기

import LevelTest from "../page/LevelTest";

const protectedRoutes = [{ path: "/level-check", element: <LevelTest /> }];

export default protectedRoutes;
