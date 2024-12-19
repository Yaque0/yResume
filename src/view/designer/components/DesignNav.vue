<template>
  <nav class="nav-box">
    <div class="nav-left" @click="toHome">
      <img src="@/assets/logo.png" alt="logo" @click="toHome" />
      <span @click="toHome">画鸦</span>
    </div>
    <div class="nav-center">
      <span class="draft-tips">{{ draftTips }}</span>
      <p v-show="!isShowIpt">
        {{ resumeJsonStore.TITLE }}
        <el-icon :size="20" color="#409eff" @click="changeTitle">
          <Edit />
        </el-icon>
      </p>
      <el-input
        ref="titleIpf"
        v-show="isShowIpt"
        v-model="resumeJsonStore.TITLE"
        autofocus
        placeholder="请输入标题"
        @blur="blurTitle"
      />
    </div>
    <div class="nav-right">
      <el-tooltip
        class="box-item"
        effect="drak"
        content="保存草稿"
        placement="bottom"
      >
        <div class="icon-box" @click="savaDraft">
          <svg-icon
            iconName="icon-caogaoxiang1"
            color="#fff"
            size="17px"
          ></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="drak"
        content="PDF导出"
        placement="bottom"
      >
        <div class="icon-box" @click="generateReport">
          <svg-icon iconName="icon-pdf" color="#fff" size="17px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="drak"
        content="导出Json"
        placement="bottom"
      >
        <div class="icon-box" @click="exportJSON">
          <svg-icon iconName="icon-xiazai" color="#fff" size="17px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="drak"
        content="导入Json"
        placement="bottom"
      >
        <div class="icon-box" @click="importJson">
          <svg-icon
            iconName="icon-yunduanshangchuan"
            color="#fff"
            size="17px"
          ></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="drak"
        content="重置设置"
        placement="bottom"
      >
        <div class="icon-box" @click="reset">
          <svg-icon
            iconName="icon-yunduanshangchuan"
            color="#fff"
            size="17px"
          ></svg-icon>
        </div>
      </el-tooltip>
    </div>
  </nav>

  <!-- Json编译器 -->
  <import-json-dialog
    :dialogVisible="dialogVisible"
    @cancle="cancleJsonDialog"
  ></import-json-dialog>
</template>

<script setup lang="ts">
  import { ref, watch } from "vue";
  import { useRouter } from "vue-router";
  import { useResumeJsonStore } from "@/store/resume";
  import { storeToRefs } from "pinia";
  import moment from "moment";
  import { ElMessage, ElMessageBox } from "element-plus";
  import { debounce } from "lodash";
  import { Edit } from "@element-plus/icons-vue";
  import FileSaver from "file-saver";
  import ImportJsonDialog from "@/components/ImportJsonDialog/ImportJsonDialog.vue";

  const emit = defineEmits(["generateReport", "reset", "saveDataToLocal"]);
  let { resumeJsonStore } = storeToRefs(useResumeJsonStore()); // store里的模板数据
  const router = useRouter();
  const toHome = () => {
    router.push({
      path: "/",
    });
  };

  //更改标题
  const titleIpf = ref<any>("");
  const isShowIpt = ref<boolean>(false);

  const changeTitle = () => {
    //显示并聚焦编辑框
    isShowIpt.value = true;
    titleIpf.value.focus();
  };
  //失去焦点
  const blurTitle = () => {
    isShowIpt.value = false;
  };

  //数据存储本地
  const draftTips = ref<string>("");
  const saveDataToLocal = () => {
    let key = resumeJsonStore.value.ID;
    let savaData: { [key: string]: Object } = {}; //需要存储的数据
    let localData = localStorage.getItem("resumeDraft");

    if (localData) {
      savaData = JSON.parse(localData);
      savaData[key] = resumeJsonStore.value;
    } else {
      savaData[key] = resumeJsonStore.value;
    }
    localStorage.setItem("resumeDraft", JSON.stringify(savaData));
    const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    draftTips.value = `已保存:${date}`;
  };
  //保存草稿
  const savaDraft = () => {
    saveDataToLocal();
    ElMessage({
      message: "保存成功",
      type: "success",
      center: true,
    });
  };

  //自动保存
  const debounced = debounce(() => {
    saveDataToLocal();
  }, 3000);
  watch(
    resumeJsonStore.value, // JSON数据发生变化，则保存草稿
    () => {
      debounced();
    },
    {
      deep: true,
    },
  );

  //导出PDF
  const generateReport = () => {
    emit("generateReport");
  };

  //导出Json
  const exportJSON = () => {
    const data = JSON.stringify(resumeJsonStore.value);
    const blob = new Blob([data], { type: "" });
    FileSaver.saveAs(blob, resumeJsonStore.value.TITLE + ".json");
  };
  //导入Json
  const dialogVisible = ref<boolean>(false);
  const importJson = () => {
    dialogVisible.value = true;
  };
  const cencleJsonDialog = () => {
    dialogVisible.value = false;
  };
  //重置
  const reset = () => {
    ElMessageBox.confirm("确定将简历重置吗？", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        emit("reset");
        draftTips.value = "";
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "已取消",
        });
      });
  };
  // 取消上传JSON
  const cancleJsonDialog = () => {
    dialogVisible.value = false;
  };
</script>

<style lang="scss" scoped>
  .nav-box {
    height: 60px;
    width: 100%;
    background-color: #fff;
    position: sticky;
    top: 0;
    display: flex;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 5%);
    z-index: 20;

    .nav-left {
      width: 300px;
      display: flex;
      align-items: center;
      user-select: none;

      img {
        width: 60px;
        height: 60px;
        margin-left: 30px;
        cursor: pointer;
      }

      span {
        letter-spacing: 4px;
        font-size: 22px;
        font-weight: 600;
        font-family: cursive;
        color: green;
        cursor: pointer;
      }
    }

    .nav-center {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .draft-tips {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
        font-size: 10px;
        color: #999999;
      }

      p {
        display: flex;
        align-items: center;
        font-size: 16px;

        .el-icon {
          margin-left: 10px;
          cursor: pointer;
        }
      }

      .el-input {
        width: 200px;
      }
    }

    .nav-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;

      .el-button {
        margin-right: 20px;
        margin-left: 0;
      }

      .icon-box {
        width: 35px;
        height: 35px;
        background-color: #74a274;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-right: 15px;
        transition: all 0.3s;

        &:hover {
          background-color: rgba(0, 192, 145, 0.8);
        }
      }
    }
  }
</style>
