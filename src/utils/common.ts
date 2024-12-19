import moment from "moment";
import { uuid } from "vue-uuid";

export const getAssetsFile = (url: string) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
};

export const getUuid = (): string => {
  return uuid.v4();
};
export const isJson = (str: string): boolean => {
  if (typeof str == "string") {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == "object" && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log("error：" + str + "!!!" + e);
      return false;
    }
  }
  return false;
};
// 工具方法--px转数字
export const pxTonumber = (value: string | undefined): number => {
  if (value) {
    return Number(value.split("px")[0]);
  } else {
    return 0;
  }
};

// 工具方法--时间格式化['2021-5', '2015-6'] -> 2021.05 - 2025.06
export const formatDate = (dataArry: Array<string> | string): string => {
  if (Array.isArray(dataArry)) {
    let startDate = moment(new Date(dataArry[0]))
      .format("YYYY.MM")
      .split("-")
      .join(".");
    let endDate = moment(new Date(dataArry[1]))
      .format("YYYY.MM")
      .split("-")
      .join(".");
    return `${startDate} - ${endDate}`;
  } else {
    return moment(new Date(dataArry)).format("YYYY.MM").split("-").join(".");
  }
};
