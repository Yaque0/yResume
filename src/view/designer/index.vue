<template>
  <div class="design-box">
    <!-- 导航栏 -->
    <design-nav @generateReport="generateReport" @reset="reset"></design-nav>
    <!-- 内容区域 -->
    <div class="bottom">
      <!-- 左侧添加模块区域 -->
      <div class="left" ref="leftRef">
        <c-scrollbar
          trigger="hover"
          :hThumbStyle="{
            background: '#0000001a',
          }"
        >
          <Title @unflodOrCollapse="unflodOrCollapse" showCollapse></Title>
          <model-list
            :leftShowStatus="leftShowStatus"
            :key="UuidStore.refreshUuid"
          ></model-list>
        </c-scrollbar>
      </div>

      <!-- 预览区域 -->
      <div class="center" :key="UuidStore.refreshUuid">
        <div class="design" ref="html2Pdf">
          <div class="design-content" ref="htmlContentPdf">
            <component
              :is="componentName"
              @contentHeightChange="contentHeightChange"
            />
          </div>
          <!-- 分页线 -->
          <template v-if="linesNumber > 0">
            <div
              class="lines"
              v-for="(item, index) in linesNumber"
              :ref="(el) => setLinesRef(el, index)"
              :style="{ top: `${1128 + 1132 * index}px` }"
            >
              <p class="tips">
                如果分割线遮挡内容，请通过调整模块上下边距以显示内容！
              </p>
              <p class="page">{{ index + 1 }}/{{ linesNumber }}</p>
            </div>
          </template>
        </div>
      </div>
      <!-- 属性设置面板 -->
      <div class="config" :key="UuidStore.refreshUuid">
        <Title :title="title"></Title>
        <component
          :is="useModel.optionsName"
          v-if="useModel.model"
          :key="useModel.id"
        />
        <!-- 全局主题样式设置 -->
        <resume-theme v-else></resume-theme>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    ref,
    nextTick,
    onMounted,
    onBeforeMount,
    onBeforeUpdate,
    onBeforeUnmount,
  } from "vue";
  import DesignNav from "./components/DesignNav.vue";
  import ModelList from "./components/ModelList.vue";
  import Title from "./components/Title.vue";
  import ResumeTheme from "@/components/ResumeTheme/ResumeTheme.vue";
  import { CScrollbar } from "c-scrollbar";
  import { useUuidStore } from "@/store/uuid";
  import { useRoute } from "vue-router";
  import TEMPLATE_JSON from "@/schema/model";
  import useAddStyle from "@/hooks/useAddStyle";
  import { useResumeModelStore, useResumeJsonStore } from "@/store/resume";
  import { storeToRefs } from "pinia";
  import { ElMessage } from "element-plus";
  import downloadPDF from "@/utils/html2pdf";

  const { title } = storeToRefs(useResumeModelStore());
  const store = useResumeJsonStore();
  const UuidStore = useUuidStore();
  const route = useRoute();
  const { name, id } = route.query;

  let { resumeJsonStore } = storeToRefs(useResumeJsonStore());

  // 展开或收起左侧栏
  const leftRef = ref<any>(null);
  const leftShowStatus = ref<boolean>(true);
  const unflodOrCollapse = (status: boolean) => {
    if (status) {
      setTimeout(() => {
        leftShowStatus.value = status;
      }, 100);
      leftRef.value.style.width = "300px";
    } else {
      setTimeout(() => {
        leftShowStatus.value = status;
      }, 100);
      leftRef.value.style.width = "70px";
    }
  };

  //重置
  const resetStroreAndLocal = () => {
    TEMPLATE_JSON.ID = id as string;
    TEMPLATE_JSON.NAME = name as string;
    let resetObj = useAddStyle(TEMPLATE_JSON); //初始数据
    store.changeResumeJsonData(resetObj);
  };

  //获取本地数据初始化Store
  const localData = localStorage.getItem("resumeDraft");
  resumeJsonStore.value.ID = id as string;
  resumeJsonStore.value.NAME = name as string;
  const componentName = ref<string>(name as string); //模板名，渲染哪个模板
  if (localData) {
    let localObj = JSON.parse(localData)[id as string];
    if (localObj) {
      store.changeResumeJsonData(localObj);
    } else {
      resetStroreAndLocal();
    }
  } else {
    resetStroreAndLocal();
  }

  //滤除掉不需要其他模板(模板2)的模块
  if (Number(id) == 2) {
    let List: any = [];
    resumeJsonStore.value.LIST.forEach((item: any) => {
      if (item.model == "RESUME_TITLE") {
        item.show = false;
      }
      List.push(item);
    });
    resumeJsonStore.value.LIST = List;
  }

  //属性设置
  const useModel = useResumeModelStore();
  //全局样式
  const globalStyleSetting = () => {
    //重置store选中的模块
    useModel.$reset();
  };

  //重置数据
  const reset = async () => {
    resetStroreAndLocal();
    globalStyleSetting();
    //删除本地该条数据
    let localData = localStorage.getItem("resumeDraft"); //本地缓存
    if (localData) {
      let allData = JSON.parse(localData);
      if (Object.keys(allData).length > 1) {
        if (allData[id as string]) {
          delete allData[id as string];
          localStorage.setItem("resumeDraft", JSON.stringify(allData));
        }
      } else {
        localStorage.removeItem("resumeDraft");
      }
    }
    ElMessage({
      message: "重置成功",
      type: "success",
      center: true,
    });
    UuidStore.setUuid(); // 重新渲染左侧列表和右侧属性面板设置
    await nextTick();
    resizeDOM();
  };

  //监听内容元素高度绘制分割线
  const htmlContentPdf = ref<any>(null);
  let observer: ResizeObserver | null = null;
  let height: number = 0;
  let linesNumber = ref<number>(0);
  const resizeDOM = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        linesNumber.value = Math.ceil(height / 1160);
        html2Pdf.value.style.height = 1160 * linesNumber.value + "px";
        htmlContentPdf.value.style.height = html2Pdf.value.style.height;
      }
    });
    observer.observe(htmlContentPdf.value);
  };
  // 子组件内容高度发生变化---需要重新计算高度，触发resizeDOM
  const contentHeightChange = (height: number) => {
    htmlContentPdf.value.style.height = height + "px";
  };

  // 点击其它区域，取消模块选择，即取消模块选中效果
  const initClickListen = () => {
    window.addEventListener("click", dealClick);
  };
  const dealClick = (e: MouseEvent) => {
    const bool = getTargetNode(htmlContentPdf.value, e.target);
    if (bool) {
      globalStyleSetting();
    }
  };
  const getTargetNode = (ele: any, target: any): boolean => {
    if (!ele || ele === document) return false;
    return ele === target ? true : getTargetNode(ele.parentNode, target);
  };

  //导出PDF
  const html2Pdf = ref<any>(null);
  let lineRefs: Array<any> = []; //分割线的ref
  const setLinesRef = (el: any, index: number) => {
    if (el) {
      if (linesNumber.value === index + 1) {
        el.style.top = linesNumber.value * 1160 + "px"; //最后一条分割线在底部
      }
      lineRefs.push(el);
    }
  };
  //生成PDF
  const generateReport = async () => {
    let temp = linesNumber.value;
    linesNumber.value = 0;
    useModel.$reset(); //重置选中模块
    await nextTick();
    downloadPDF(html2Pdf.value, resumeJsonStore.value.TITLE, false, () => {
      linesNumber.value = temp;
    });
  };

  onMounted(async () => {
    resizeDOM();
    initClickListen();
  });
  onBeforeMount(() => {
    observer?.disconnect();
  });
  onBeforeUpdate(() => {
    lineRefs = [];
  });
  onBeforeUnmount(() => {
    window.removeEventListener("click", dealClick);
  });
</script>

<style lang="scss" scoped>
  .design-box {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    .bottom {
      display: flex;
      width: 100%;

      .left {
        width: 300px;
        background-color: #fff;
        height: calc(100vh - 50px);
        overflow: auto;
        transition: all 0.3s;
      }

      .center {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex: 1;
        height: calc(100vh - 50px);
        overflow: auto;

        .design {
          background: white;
          width: 820px;
          min-height: 1160px;
          margin: 30px 0;
          display: table;
          position: relative;
          .lines {
            z-index: 10;
            width: 820px;
            height: 24px;
            background: #f3f3f3 url(@/assets/images/paging_bg.png) center top
              no-repeat;
            user-select: none;
            pointer-events: none;
            position: absolute;
            display: flex;
            align-items: center;
            .tips {
              font-size: 9px;
              color: #c7c7c7;
            }
            .page {
              font-size: 9px;
              color: #999999;
            }
            .page {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }

      .config {
        width: 350px;
        background-color: #fff;
        overflow: auto;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 50px);
      }
    }
  }
</style>
