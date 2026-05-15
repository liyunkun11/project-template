// 设置css变量
export const setCssVar = (prop: string, val: any, dom = document.documentElement) => {
  dom.style.setProperty(prop, val);
};

// 获取css变量
export const getCssVar = (prop: string, dom = document.documentElement) => {
  return getComputedStyle(dom).getPropertyValue(prop);
};

// 移除css变量
export const removeCssVar = (prop: string, dom = document.documentElement) => {
  dom.style.removeProperty(prop);
};
