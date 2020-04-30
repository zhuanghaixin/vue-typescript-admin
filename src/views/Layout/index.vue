<template>
    <div class="layoout">
<!--      头部-->
        <LayoutHeader>
            你好
        </LayoutHeader>
<!--        内容-->
    </div>
</template>

<script lang="ts">
    import {Component,Vue} from 'vue-property-decorator'
    import LayoutHeader from './LayoutHeader.vue'
    @Component({
        components:{
            LayoutHeader
        }
    })
    export default class Layout  extends Vue{

    }
</script>

<style scoped lang="scss">
.layout{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background:#f5f5f9;



}
</style>
 
