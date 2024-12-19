import avatUrl from "@/assets/images/atr.jpg";
let IMPORT_JSON = {
  TITLE: "我的简历",
  LIST: [
    {
      model: "RESUME_TITLE",
      title: "我的简历",
    },
    {
      model: "BASE_INFO",
      title: "基本资料",
      name: "鸦雀大人",
      age: 23,
      address: "湖南株洲",
      avatar: avatUrl,
      workService: 3,
      phoneNumber: "18670866870",
      email: "2332322798@qq.com",
      abstract: "我是一个没有感情的工作机器",
      degree: "本科",
    },
    {
      model: "JOB_INTENTION",
      title: "求职意向",
      intendedPositions: "前端开发工程师",
      intendedCity: "湖南",
      expectSalary: "8000-10000",
      jobStatus: "随时入职",
      jobSearchType: "求职类型",
    },
    {
      model: "EDU_BACKGROUND",
      title: "教育背景",
      LIST: [
        {
          date: ["2024-5", "20225-6"],
          schoolName: "XX大学",
          specialized: "XX专业",
          degree: "本科",
          majorCourse: "主修计算机技术、Java、c++等等",
        },
      ],
    },
    {
      model: "SKILL_SPECIALTIES",
      title: "技能特长",
      LIST: [
        {
          skillName: "JavaScript",
          proficiency: "了解",
          introduce: "熟练掌握该项技术",
        },
      ],
    },
    {
      model: "CAMPUS_EXPERIENCE",
      title: "校园经历",
      LIST: [
        {
          date: ["2025-9", "2026-10"],
          campusBriefly: "经历简要，如社团名称",
          campusDuty: "主要职责",
          campusContent: "经历描述",
        },
      ],
    },
    {
      model: "INTERNSHIP_EXPERIENCE",
      title: "实习经验",
      LIST: [
        {
          date: ["2027-9", "2028-10"],
          companyName: "XX公司",
          posts: "前端开发工程师",
          jobContent: [
            {
              content: "主要工作内容是打杂",
            },
          ],
        },
      ],
    },
    {
      model: "WORK_EXPERIENCE",
      title: "工作经验",
      LIST: [
        {
          date: ["2022-9", "2022-10"],
          companyName: "XX公司",
          posts: "前端开发工程师",
          jobContent: [
            {
              content: "主要工作内容是打杂",
            },
          ],
        },
      ],
    },
    {
      model: "PROJECT_EXPERIENCE",
      title: "项目经验",
      LIST: [
        {
          date: ["2021-9", "2022-10"],
          projectName: "项目名称",
          posts: "前端开发工程师",
          projectContent: [
            {
              content: "该项目是一个打杂项目",
            },
          ],
        },
      ],
    },
    {
      model: "AWARDS",
      title: "荣誉奖项",
      LIST: [
        {
          date: "2021-9",
          awardsName: "奖项名称",
          awardsGrade: "获奖等级",
        },
      ],
    },
    {
      model: "HOBBIES",
      title: "兴趣爱好",
      content:
        "我喜欢打杂我喜欢打杂我喜欢打杂我喜欢打杂我喜欢打杂我喜欢打杂我喜欢打杂我喜欢打杂",
    },
    {
      model: "SELF_EVALUATION",
      title: "自我评价",
      content: "我是一个没有责任感的人",
    },
  ],
};
export default IMPORT_JSON;
