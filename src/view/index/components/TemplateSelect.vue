<template>
    <div class="template-select-box" ref="templateRef">
      <div class="title">
        <h1>免费模板 + 用心设计</h1>
        <p>用心设计每一套模板，适合各行各业从业者</p>
      </div>
      <!-- 模板列表 -->
      <div class="card-list">
        <template v-for="(item, index) in templateList">
          <template-card :cardData="item" @toDesign="toDesign"> </template-card>
        </template>
      </div>
    </div>
  </template>
  <script setup lang="ts">
    import TemplateCard from './TemplateCard.vue';
    import templateList from '@/template';
    import { ITempList } from '@/template/type';
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';
  
    // 跳转至设计页面
    const router = useRouter();
    //用于处理模板卡片组件
    const toDesign = (item: ITempList) => {
      router.push({
        path: '/designer',
        query: {
          id: item.id,
          name: item.name
        }
      });
    };
  
    // 出现在可视区 获取模板选择区域的 DOM 元素。
    const templateRef = ref<any>(null);

    // 平滑滚动到模板选择区域
    const scrollIntoView = () => {
      templateRef.value.scrollIntoView({ behavior: 'smooth' });//smooth平滑滚动，auto瞬间滚动
    };
    defineExpose({
      scrollIntoView
    });
  
  </script>
  <style lang="scss">
    .template-select-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 40px;
      .title {
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h1 {
          position: relative;
          letter-spacing: 3px;
          margin-bottom: 10px;
          &::before {
            content: '';
            width: 200px;
            height: 1px;
            background-color: #bdc7d0;
            position: absolute;
            left: -250px;
            top: 50%;
          }
          &::after {
            content: '';
            width: 200px;
            height: 1px;
            background-color: #bdc7d0;
            position: absolute;
            right: -250px;
            top: 50%;
          }
        }
        p {
          font-size: 14px;
          color: #7f8b96;
        }
      }
      .card-list {
        display: flex;
      }
    }
  </style>
  