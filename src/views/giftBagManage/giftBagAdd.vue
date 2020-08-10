<template>
    <div>
        <el-card>
            <gift-bag></gift-bag>
        </el-card>
    </div>
</template>
<script>
import giftBag from "./common/giftBag"
export default {
    name: "giftBagAdd",
    components: {
        giftBag
    },
    data() {
        return {}
    }
}
</script>
<style lang="scss" scoped>
    
</style>