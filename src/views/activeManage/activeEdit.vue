<template>
  <div>
    <active-detail :is-edit="true" />
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
    return {
        id: undefined
    };
  },
  methods: {},
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
</style>