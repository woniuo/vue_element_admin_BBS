<template>
  <div>
    <ad-detail :is-edit="true"></ad-detail>
  </div>
</template>
<script>
import adDetail from "./common/adDetail"
export default {
  name: "adEdit",
  components: {
      adDetail
  },
  data() {
    return {
      
    };
  },
  methods: {

  },
};
</script>
<style lang="scss" scoped>

</style>