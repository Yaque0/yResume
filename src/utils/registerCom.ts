// 模板组件
import Template1Vue from "@/template/template1/template1.vue"; // 前端开发简历模板组件

// 模板之间通用的属性设置面板
import COMBaseInfoOptionsVue from "@/components/CommonOptions/BaseInfoOptions.vue"; // 基础信息属性设置面板
import COMResumeTitleOptionsVue from "@/components/CommonOptions/ResumeTitleOptions.vue"; // 简历标题属性设置面板

// 模板1属性设置组件
import JobIntentionOptions from "@/template/template1/options/JobIntentionOptions.vue";
import EduBackgroundOptionsVue from "@/template/template1/options/EduBackgroundOptions.vue";
import SkillSpecialtiesOptionsVue from "@/template/template1/options/SkillSpecialtiesOptions.vue";
import CampusExperienceOptionsVue from "@/template/template1/options/CampusExperienceOptions.vue";
import InternshipExperienceOptionsVue from "@/template/template1/options/InternshipExperienceOptions.vue";
import ProjectExperienceOptionsVue from "@/template/template1/options/ProjectExperienceOptions.vue";
import AwardsOptionsVue from "@/template/template1/options/AwardsOptions.vue";
import HobbiesOptionsVue from "@/template/template1/options/HobbiesOptions.vue";
import SelfEvalutionOptionsVue from "@/template/template1/options/SelfEvalutionOptions.vue";

const componentList: Array<any> = [
  Template1Vue,
  COMResumeTitleOptionsVue,
  COMBaseInfoOptionsVue,
  JobIntentionOptions,
  EduBackgroundOptionsVue,
  SkillSpecialtiesOptionsVue,
  CampusExperienceOptionsVue,
  InternshipExperienceOptionsVue,
  ProjectExperienceOptionsVue,
  AwardsOptionsVue,
  HobbiesOptionsVue,
  SelfEvalutionOptionsVue,
];

export default {
  install(app: any) {
    componentList.map((component) => {
      // console.log(component.name, component);
      app.component(component.name, component);
    });
  },
};
