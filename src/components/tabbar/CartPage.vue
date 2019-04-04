<template>
    <div>
        <div v-for="item of goodsList" :key="item.id">
            <div>
                id为: <span>{{item.id}}</span>
                <br>
                数量为: <span>{{item.count}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    mounted () {
        console.log(this.goodsList)
    },
    computed: {
        goodsList () {
            return this.$store.state.goods
        }
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>

</style>
