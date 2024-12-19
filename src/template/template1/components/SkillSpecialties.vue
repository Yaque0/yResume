<template>
  <skill-specialties-com :modelData="modelData">
    <!-- 标题 -->
    <template v-slot:model-title>
      <model-title
        :title="modelData.title"
        :iconfont="modelData.iconfont"
      ></model-title>
    </template>
  </skill-specialties-com>
</template>

<script lang="ts" setup>
  import SkillSpecialtiesCom from "@/components/ModelComs/SkillSpecialtiesCom.vue";
  import ModelTitle from "./ModelTitle.vue";
  import { ISKILLSPECIALTIES } from "@/interface/model";
  defineProps<{
    modelData: ISKILLSPECIALTIES;
  }>();
</script>
