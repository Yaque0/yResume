<!-- 首页标题栏 -->
<template>
  <div class="nav-bar-box">
    <div class="logo">
      <img src="@/assets/logo.png" alt="logo" srcset="" />
      <span>画鸦</span>
    </div>
  </div>
</template>
<script setup lang="ts">
  interface IBgcColor {
    bgColor?: string;
    fontColor?: string;
    iconColor?: string;
  }
  withDefaults(defineProps<IBgcColor>(), {
    bgColor: "",
    fontColor: "",
    iconColor: "#fff",
  });
</script>
<style lang="scss" scoped>
  .nav-bar-box {
    display: flex;
    height: 88px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    background-color: v-bind("bgColor");
    z-index: 10;
    user-select: none;
    padding: 0 40px;
    position: fixed;
    top: 0;
    transition: all 0.3s;
    .logo {
      height: 100%;
      display: flex;
      align-items: center;
      img {
        width: 80px;
        height: 80px;
      }
      span {
        letter-spacing: 4px;
        font-size: 22px;
        font-weight: 600;
        font-family: cursive;
        color: v-bind("fontColor");
      }
    }
    .right {
      display: flex;
      align-items: center;
      .contact-me {
        cursor: pointer;
        margin-right: 15px;
        font-size: 14px;
        color: v-bind("iconColor");
      }
      .svg-icon {
        cursor: pointer;
      }
      & :first-child {
        margin-left: 15px;
      }
    }
  }
  .vx-box {
    .vx-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      h1 {
        font-size: 14px;
        margin-bottom: 6px;
      }
      p {
        font-size: 12px;
        color: rgb(105, 105, 105);
      }
    }
    .vx-img {
      width: 100%;
      overflow: hidden;
      .bgc-img {
        width: 100%;
      }
    }
  }
</style>
