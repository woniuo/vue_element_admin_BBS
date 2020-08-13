<template>
    <div>
        <el-card>
            <gift-bag :isedit="true"></gift-bag>
        </el-card>
    </div>
</template>
<script>
import giftBag from './common/giftBag'
export default {
    name: "giftBagEdit",
    components: {
        giftBag
    },
    data () {
        return {}
    }
}
</script>
<style lang="scss" scoped>
    
</style>