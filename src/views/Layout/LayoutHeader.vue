<template>
    <div class="layout-header">
        <el-row>
            <el-col :xs="10" :sm="12" :md="14" :lg="16" :xl="18">
                <div class="system-info">
                    <img class="logo" src="@/assets/logo.png" alt="">
                    <span class="title">后台管理系统</span>
                </div>
            </el-col>
            <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
            <el-dropdown class="system-user" @command="userCommand">
                <span class="userinfo-inner">
<!--                    对应不同的登录身份，使用不同的头像-->
                    <img :src="require('@/assets/'+getUser.key+'.jpg')" alt="">
                    {{getUser.username}}
                </span>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item icon="el-icon-user-solid" command="usercenter">个人中心</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-s-help" command="logout" divided>注销登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
    import {Component,Vue} from 'vue-property-decorator'
    import { State,Getter,Mutation,Action} from 'vuex-class'
    @Component({
        components:{}
    })
    export default class LayoutHeader extends Vue{
        //使用Getter 重新获取token解析的对象
        @Getter("user") getUser:any
        userCommand(command:string):void{
            if(command=="logout"){
                localStorage.removeItem("tsToken")
                this.$router.replace("/login")
            }
            if(command=="usercenter"){
                console.log("个人中心")
            }
        }
        created(){
            console.log(this.getUser)
        }

    }
</script>

<style scoped lang="scss">
    .layout-header {
        background: #3378c9;
        line-height: 64px;
        height: 64px;
        .system-info {
            text-align: left;
            .logo {
                /*width: 40px;*/
                height: 40px;
                /*border-radius: 50px;*/
                margin-top: 12px;
                margin-left: 20px;
                margin-right: 10px;
                float: left;
                position: relative;
            }
            .title {
                font-size: 18px;
                font-weight: bold;
                color: azure;
                line-height: 64px;
            }
        }
        .system-user  {
            text-align: right;
            float: right;
            padding-right: 16px;
            .userinfo-inner {
                color: #fff;
                font-size: 16px;
                cursor: pointer;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin: 10px 0px 10px 10px;
                    float: right;
                }
            }
        }
    }

</style>
 
