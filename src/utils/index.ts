// 获取系统当前时间
export const getCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  // 获取今天是星期几
  const dayOfWeek = now.getDay();
  // 星期几的中文表示
  const dayOfWeekCN = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][dayOfWeek];
  return {
    year,
    month,
    day,
    dayOfWeek,
    dayOfWeekCN,
    hours,
    minutes,
    seconds,
  };
};
