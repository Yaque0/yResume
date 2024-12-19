import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "@/style/normalize.css";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
import elementIcons from "@/components/SvgIcon/svgicon";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import component from "@/utils/registerCom";
// 引入svg
import "@/assets/iconfont/iconfont.js";
// element-plus部分组件样式
import ColorPicker from "colorpicker-v3";
import "colorpicker-v3/style.css";
import "element-plus/theme-chalk/src/message.scss";

const app = createApp(App);
const pinia = createPinia();
app.use(component);
app.use(router);
app.use(elementIcons);
app.use(ElementPlus);
app.use(pinia);
app.use(ColorPicker);
app.component("SvgIcon", SvgIcon);

// 挂载实例
app.mount("#app");
