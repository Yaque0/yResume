<template>
  <el-dialog
    :model-value="dialogVisible"
    width="60%"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    custom-class="import-json"
  >
    <!-- 头部 -->
    <template #header>
      <div class="header">
        <div class="header-left">
          <h1 class="title">请在编辑器内输入简历JSON数据，格式如下：</h1>
          <span>
            <svg-icon
              iconName="icon-xianshi_jinggao"
              color="red"
              size="14px"
            ></svg-icon>
            注意：示例中的所有字段都需要保留，若无值为空即可，不可删除字段！
          </span>
        </div>
        <div class="header-right">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="JSON示例"
            placement="bottom"
          >
            <div class="icon-box" @click="openTip">
              <svg-icon
                iconName="icon-daimashili"
                color="#fff"
                size="17px"
              ></svg-icon>
            </div>
          </el-tooltip>
          <el-tooltip iconName="icon-zhongzhi" color="#fff" size="17px">
            <div class="icon-box" @click="resetJson">
              <svg-icon
                iconName="icon-zhongzhi"
                color="#fff"
                size="17px"
              ></svg-icon>
            </div>
          </el-tooltip>
        </div>
      </div>
    </template>
    <!-- 代码编辑器 -->
    <div class="code-mirror-box">
      <codemirror
        v-model="code"
        placeholder="请将你的简历JSON写在此处～～"
        :style="{ height: '400px' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tabSize="2"
        :extensions="extensions"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- JSON提示弹窗 -->
  <tip-json-dialog
    :tipDialogVisible="tipDialogVisible"
    @close-tip-dialog="closeTipDialog"
  ></tip-json-dialog>
</template>

<script lang="ts" setup>
  import { useUuidStore } from "@/store/uuid";
  import { ref } from "vue";
  import { useRoute } from "vue-router";

  import { useResumeJsonStore, useResumeModelStore } from "@/store/resume";
  import { Codemirror } from "vue-codemirror";
  import { javascript } from "@codemirror/lang-javascript";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { json } from "@codemirror/lang-json";
  import IMPORT_JSON from "@/schema/import";
  import { ElMessage } from "element-plus";
  import { isJson } from "@/utils/common";
  import TEMPLATE_JSON from "@/schema/model";
  import useAddStyle from "@/hooks/useAddStyle";
  import tipJsonDialog from "@/components/TipJsonDialog/TipJsonDialog.vue";
  const emit = defineEmits(["cancle"]);
  interface TDialog {
    dialogVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    dialogVisible: false,
  });
  const tipDialogVisible = ref<boolean>(false);
  const openTip = () => {
    tipDialogVisible.value = true;
  };
  // 提示弹窗
  // 关闭提示弹窗
  const closeTipDialog = () => {
    tipDialogVisible.value = false;
  };
  const resetJson = () => {
    code.value = JSON.stringify(IMPORT_JSON, null, 4);
    ElMessage({
      message: "已重置",
      type: "success",
      center: true,
    });
  };
  const cancle = () => {
    emit("cancle");
  };

  //代码编辑器
  const code = ref<string>(JSON.stringify(IMPORT_JSON, null, 4));
  const extensions = [javascript(), oneDark, json()];
  //提交Json
  const UuidStroe = useUuidStore();
  const route = useRoute();
  const store = useResumeJsonStore();
  const useModel = useResumeModelStore();
  const confirm = () => {
    //TODO
    if (!code.value) {
      ElMessage({
        message: "请输入简历数据",
        type: "error",
        center: true,
      });
      return;
    }
    let iscurrentJson = isJson(code.value);
    if (!iscurrentJson) {
      ElMessage({
        message: "请输入正确的Json数据",
        type: "error",
        center: true,
      });
      return;
    }
    let importJson = JSON.parse(code.value);
    // console.log(code.value);
    const { id, name } = route.query; //模板的id名称
    importJson.ID = id;
    importJson.NAME = name;
    // 合并基础json和导入json
    // console.log(importJson.LIST.length);

    for (let i = 0; i < importJson.LIST.length; i++) {
      for (let j = 0; j < TEMPLATE_JSON.LIST.length; j++) {
        if (TEMPLATE_JSON.LIST[j].model === importJson.LIST[i].model) {
          importJson.LIST[i] = {
            ...TEMPLATE_JSON.LIST[j],
            ...importJson.LIST[i],
          };
        }
      }
    }

    //合并样式
    const afterStyleJson = useAddStyle(importJson);
    console.log(afterStyleJson);
    store.changeResumeJsonData(afterStyleJson); // 更改store的数据
    UuidStroe.setUuid(); //重新渲染左侧列表和右侧属性面板
    useModel.$reset(); //重置
    emit("cancle");
  };
</script>
<style lang="scss">
  .import-json {
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-left {
        display: flex;
        flex-direction: column;
        height: 48px;
        justify-content: space-between;
        .title {
          font-size: 20px;
        }
        span {
          font-size: 12px;
          color: red;
          display: flex;
          align-items: center;
          .svg-icon {
            margin-right: 5px;
          }
        }
      }
      .header-right {
        display: flex;
        .icon-box {
          width: 35px;
          height: 35px;
          background-color: #74a274;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-left: 15px;
          transition: all 0.3s;
          &:hover {
            background-color: rgba(0, 192, 145, 0.8);
          }
        }
      }
    }
    .el-dialog__header {
      padding: 20px;
    }
    .el-dialog__body {
      padding: 0;
    }
    .el-dialog__footer {
      padding: 20px;
    }
  }

  .cm-editor {
    height: 70vh;
  }
  .el-overlay-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-dialog {
      padding: 0;
      margin: 0;
    }
  }
</style>
