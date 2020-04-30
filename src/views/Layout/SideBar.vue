<template>
<!--    滚动条-->
   <el-scrollbar class="el-scrollbar">
<!--       菜单-->
       <el-menu class="el-menu-slide">
           <el-menu-item index="1">
             <template slot="title">
                 <i class="el-icon-menu"></i>
                 <span >首页</span>
             </template>
<!--               slot占位 上面写slot表明是span标签，而不是el-menu-item下的标签-->
           </el-menu-item>
       </el-menu>
   </el-scrollbar>
</template>

<script lang="ts">
    import {Component,Vue} from 'vue-property-decorator'
    @Component({
        components:{}
    })
    export default class SideBar extends Vue{

    }
</script>

<style scoped lang="scss">
    .el-scrollbar {
        height: 100vh;
        border-right: 1px solid #e6e6e6;
        background: #fff;
        .el-menu-slide {
            border-right: none;
            i {
                margin-right: 5px;
                width: 24px;
                text-align: center;
                font-size: 18px;
            }
        }
    }
</style>
 
