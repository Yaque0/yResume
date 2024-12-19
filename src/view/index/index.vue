<template>
  <div class="index-box" @scroll="handlerScroll">
    <!-- 导航 -->
    <nav-bar
      :bgColor="navColor"
      :fontColor="fontColor"
      :icon-color="iconColor"
    ></nav-bar>
    <!-- 内容 -->
    <div>
      <project-introduce @free-make="freeMake"></project-introduce>
    </div>
    <!-- 模板选择 -->
    <template-select ref="templeTef"></template-select>
    <!-- 底部 -->
    <footer-com></footer-com>
  </div>
</template>
<script setup lang="ts">
  import throttle from "lodash/throttle";
  import { onMounted, ref, onBeforeUnmount } from "vue";
  import NavBar from "@/components/NavBar/NavBar.vue";
  import ProjectIntroduce from "./components/ProjectIntroduce.vue";
  import TemplateSelect from "./components/TemplateSelect.vue";
  import FooterCom from "@/components//FooterCom/FooterCom.vue";
  const navColor = ref<string>("");
  const fontColor = ref<string>("#fff");
  const iconColor = ref<string>("#fff");

  //监听滚动改变导航栏样式
  const handlerScroll = () => {
    if (document.documentElement.scrollTop > 0) {
      navColor.value = "#fff";
      fontColor.value = "#000";
      iconColor.value = "#000";
    } else {
      navColor.value = "";
      fontColor.value = "#fff";
      iconColor.value = "#fff";
    }
  };
  //滚动节流
  const throttleHandle = throttle(handlerScroll, 500);
  //监听滚动
  onMounted(() => {
    window.addEventListener("scroll", throttleHandle);
  });
  //卸载时清除滚动事件
  onBeforeUnmount(() => {
    window.removeEventListener("scroll", throttleHandle);
  });
  //project-introduce的dom元素
  const templeTef = ref<any>(null);
  const freeMake = () => {
    templeTef.value.scrollIntoView();
  };
</script>
