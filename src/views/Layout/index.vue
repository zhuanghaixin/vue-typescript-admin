<template>
    <div class="layoout">
<!--      头部-->
        <LayoutHeader>
        </LayoutHeader>
<!--        内容-->
<!--        插槽-->
        <Contents>
            <SideBar slot="left"></SideBar>
            <router-view slot="content"></router-view>
        </Contents>
    </div>
</template>

<script lang="ts">
    import {Component,Vue} from 'vue-property-decorator'
    import LayoutHeader from './LayoutHeader.vue'
    import Contents from './Contents.vue'
    import SideBar from './SideBar.vue'
    @Component({
        components:{
            LayoutHeader,
            Contents,
            SideBar
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
 
