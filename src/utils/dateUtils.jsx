export const getFormattedDate = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const dayNames = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const day = dayNames[now.getDay()];

  return `${month}월 ${date}일 ${day}`;
};

export const formatDateTime = (createdAt) => {
  const dateObj = new Date(createdAt);
  const date = dateObj.toLocaleDateString("ko-KR");
  const time = dateObj.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return { date, time };
};

export const getFormattedTrend = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");

  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
};
