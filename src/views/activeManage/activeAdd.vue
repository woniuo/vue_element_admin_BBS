<template>
  <div>
    <active-detail :is-edit="false" />
  </div>
</template>
<script>
import activeDetail from "./common/activeDetail";
export default {
  name: "activeAdd",
  components: {
    activeDetail,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
</style>