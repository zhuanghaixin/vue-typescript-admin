<template>
<!--    滚动条-->
   <el-scrollbar class="el-scrollbar">
<!--       菜单-->
       <el-menu class="el-menu-slide" router :default-active="$router.currentRoute.path">
           <template v-for="item in filterGetRouters"  >
<!--               只有一个子菜单-->
               <el-menu-item  v-if="item.children.length==1"  :index="item.children[0].path" :key="item.name">
                   <template slot="title">
                       <i v-if="item.children[0].meta.icon"   :class="item.children[0].meta.icon"></i>
                       <span>{{item.children[0].meta.title}}</span>
                   </template>
                   <!--               slot占位 上面写slot表明是span标签，而不是el-menu-item下的标签-->
               </el-menu-item>
<!--               多个子元素-->
               <el-submenu v-else :index="item.children[0].path" :key="item.name">
                    <template slot="title">
                        <i v-if="item.meta.icon"   :class="item.meta.icon"></i>
                        <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
                    </template>
                   <el-menu-item-group>
                       <el-menu-item v-for="child in item.children" :index="child.path" :key="child.name">

                           <template slot="title">
                               <i v-if="child.meta.icon"   :class="child.meta.icon"></i>
                               <span>{{child.meta.title}}</span>
                           </template>
                       </el-menu-item>

                   </el-menu-item-group>
               </el-submenu>
           </template>
       </el-menu>
   </el-scrollbar>
</template>

<script lang="ts">
    import {Component,Vue} from 'vue-property-decorator'
    import { State,Getter,Mutation,Action} from 'vuex-class'
    @Component({
        components:{}
    })
    export default class SideBar extends Vue{
        @Getter("routers") getRouters:any
        @Getter("user") xx:any
        created(){
            console.log('this.getRouters')
            console.log(this.getRouters)
            console.log('this.xx')
            console.log(this.xx)
            console.log(this)
        }
        //设置计算属性 获取过滤之后的，hidden为true,有children,且children长度为0的对象
        get filterGetRouters():any{
            return this.getRouters.filter((item:any)=>{
                return item.hidden&&item.children&&item.children.length>0
            }
        )
        }
        //获取计算属性
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
 
