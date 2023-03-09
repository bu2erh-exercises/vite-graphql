<script setup>
import * as dayjs from 'dayjs'
import { defStore } from '../store/index'
// import { useQuery } from '@vue/apollo-composable'
// import { grant } from '@/graphql/grant.gql'
// import axios from 'axios'

// const a = async () => {
//   let res = await fetch(`./api/posts`).then((res) => res.json())
// let res = await axios.get('/api/posts')

// console.log('res', res)
// }
// onMounted(() => {
// a()
// })

// const { result } = useQuery(grant)
// watch([result], (value) => {
//     console.log(value)
// })
const add = () => {
    defStore().$patch((state) => state.count++)
}
</script>

<template>
    <div class="home" style="width: 100%">
        <t-button type="" @click="add">按钮+</t-button>
        <div class="abc">{{ defStore().count }}</div>
        <div class="abc">{{ dayjs().format('YYYY-MM-DD HH:mm:ss') }}</div>
    </div>
</template>
<style lang="less" scoped>
.home {
    text-align: center;
}

.abc {
    font-size: 33px;
    color: @primary-color;
    font-weight: 700;
    background: @aaa-bg;
}
</style>
