// 样式接口
interface ISTYLE {
  height?: string;
  width?: string;
  titleColor?: string;
  titleFontSize?: string;
  titleFontWeight?: number;

  textColor?: string;
  textFontSize?: string;
  textFontWeight?: number;

  backgroundColor?: string;

  align?: string;
  mTop?: string;
  mRight?: string;
  mLeft?: string;
  mBottom?: string;
  pTop?: string;
  pRight?: string;
  pLeft?: string;
  pBottom?: string;
}

//简历标题接口
interface IRESUMETITLE {
  id: string;
  model: string;
  show: boolean;
  title: string;
  [propNams: string]: any; //接口的索引签名   表示可以有任意数量的额外属性，并且只要它们不是 title 或 show 或 id 或 model ，那么它们就都是任意类型
}

//基础资料
interface IBASEINFO {
  id: string;
  iconfont: string;
  model: string;
  show: boolean;
  title: string;
  name: string;
  age: number;
  address: string; // 所在地址
  avatar: string; // 头像地址
  workService: string; // 工作年限
  phoneNumber: string; // 联系电话
  email: string; // 邮箱
  abstract: string; // 简介
  degree: string;
  isShow: {
    age: boolean;
    address: boolean; // 所在地址
    avatar: boolean; // 头像地址
    workService: boolean; // 工作年限
    phoneNumber: boolean; // 联系电话
    email: boolean; // 邮箱
    abstract: boolean; // 简介
    degree: boolean;
  };
  [propNams: string]: any;
}

// 求职意向
interface IJOBINTENTION {
  id: string;
  iconfont: string;
  model: string;
  show: boolean;
  title: string;
  intendedPositions: string; // 意向岗位
  intendedCity: string; // 意向城市
  expectSalary: string; // 期望薪资
  jobStatus: string; // 求职状态
  jobSearchType: string; // 求职类型
  isShow: {
    intendedPositions: boolean;
    intendedCity: boolean;
    expectSalary: boolean;
    jobStatus: boolean;
    jobSearchType: boolean;
  };
  [propNams: string]: any;
}
//教育背景
interface IEDUBACKGROUND {
  id: string;
  iconfont: string;
  model: string;
  show: boolean;
  title: string;
  LIST: Array<{
    date: Array<string>;
    schoolName: string; // 学校名称
    specialized: string; // 专业
    degree: string; // 学历
    majorCourse: string; // 主修课程
  }>;
  isShow: {
    date: boolean;
    schoolName: boolean;
    specialized: boolean;
    degree: boolean;
    majorCourse: boolean;
  };
  [propNams: string]: any;
}

// 技能特长
interface ISKILLSPECIALTIES {
  id: string;
  iconfont: string;
  model: string;
  show: boolean;
  title: string;
  LIST: Array<{
    skillName: string; // 技能名称
    proficiency: string; // 熟练度
    introduce: string; // 介绍
  }>;
  [propNams: string]: any;
}

// 校园经历
interface ICAMPUSEXPERIENCE {
  id: string;
  iconfont: string;
  model: string;
  show: boolean;
  title: string;
  LIST: Array<{
    date: Array<string>; // 经历时间
    campusBriefly: string;
    campusDuty: string;
    campusContent: string;
  }>;
  isShow: {
    date: boolean; // 经历时间
    campusBriefly: boolean;
    campusDuty: boolean;
    campusContent: boolean;
  };
  [propNams: string]: any;
}
// 实习经验
interface IINTERNSHIPEXPERIENCE {
  id: string;
  iconfont: string;
  model: string;
  show: boolean;
  title: string;
  LIST: Array<{
    date: Array<string>; // 实习时间
    companyName: string; // 公司名称
    posts: string; // 职位
    jobContent: Array<{
      content: string;
    }>;
  }>;
  isShow: {
    date: boolean;
    companyName: boolean;
    posts: boolean;
    jobContent: boolean;
  };
  [propNams: string]: any;
}
// 项目经验
interface IPROJECTEXPERIENCE {
  id: string;
  iconfont: string;
  model: string;
  show: boolean;
  title: string;
  LIST: Array<{
    date: Array<string>; // 项目时间
    projectName: string; // 项目名称
    posts: string; // 项目职责
    projectContent: Array<{
      content: string;
    }>;
  }>;
  isShow: {
    date: boolean;
    projectName: boolean;
    posts: boolean;
  };
  [propNams: string]: any;
}

// 所获奖项
interface IAWARDS {
  id: string;
  iconfont: string;
  model: string;
  show: boolean;
  title: string;
  LIST: Array<{
    date: string; // 获奖时间
    awardsName: string;
    awardsGrade: string;
  }>;
  isShow: {
    date: boolean;
    awardsName: boolean;
    awardsGrade: boolean;
  };
  [propNams: string]: any;
}
// 兴趣爱好
interface IHOBBIES {
  id: string;
  iconfont: string;
  model: string;
  show: boolean;
  title: string;
  content: string;
  [propNams: string]: any;
}
// 自我评价
interface ISELFEVALUATION {
  id: string;
  iconfont: string;
  model: string;
  show: boolean;
  title: string;
  content: string;
  [propNams: string]: any;
}

// 全局样式主题
interface IGlobalStyle {
  themeColor: string; // 主题色
  firstTitleFontSize: string; // 一级标题
  secondTitleFontSize: string; // 二级标题
  textFontSize: string; // 正文
  secondTitleColor: string; // 二级标题字体颜色
  textFontColor: string; // 正文字体颜色
  secondTitleWeight: number; // 二级标题字体粗细
  textFontWeight: number; // 正文字体粗细
  modelMarginTop: string;
  modelMarginBottom: string;
}

// resume格式接口
interface IResumeJson {
  ID: string; // 模板id
  NAME: string; // 模板名
  TITLE: string; // 模板名称
  LIST: [
    IRESUMETITLE, // 简历标题
    IBASEINFO, // 基础信息
    IJOBINTENTION, // 求职意向
    IEDUBACKGROUND, // 教育背景
    ISKILLSPECIALTIES, // 技能特长
    ICAMPUSEXPERIENCE, // 校园经历
    IINTERNSHIPEXPERIENCE, // 实习经验
    IPROJECTEXPERIENCE, // 项目经验
    IAWARDS, // 所获奖项
    IHOBBIES, // 兴趣爱好
    ISELFEVALUATION, // 自我评价
  ];
  GLOBAL_STYLE: IGlobalStyle;
}
// 列表模块接口
type TModelList = Array<
  [
    IRESUMETITLE,
    IBASEINFO,
    IJOBINTENTION,
    IEDUBACKGROUND,
    ISKILLSPECIALTIES,
    ICAMPUSEXPERIENCE,
    IINTERNSHIPEXPERIENCE,
    IPROJECTEXPERIENCE,
    IAWARDS,
    IHOBBIES,
    ISELFEVALUATION,
  ]
>;
export {
  ISTYLE,
  IResumeJson,
  IRESUMETITLE,
  IBASEINFO,
  IJOBINTENTION,
  IEDUBACKGROUND,
  ISKILLSPECIALTIES,
  ICAMPUSEXPERIENCE,
  IPROJECTEXPERIENCE,
  IINTERNSHIPEXPERIENCE,
  IAWARDS,
  IHOBBIES,
  ISELFEVALUATION,
  TModelList,
  IGlobalStyle,
};
