<template>
    <div class="login">
       <LoginHeader>
           <el-form slot="container">
               <div class="title">
                   <h3>账号密码登录</h3>
               </div>
           </el-form>
       </LoginHeader>
    </div>
</template>

<script lang="ts">
import { Component,Vue} from 'vue-property-decorator'
import LoginHeader from './LoginHeader.vue'
    @Component({
        components: {
            LoginHeader
        }
    })
    export default class Login extends Vue{

}
</script>

<style scoped lang="scss">
.title{
    margin: 0px auto 40px auto;
    text-align: center;
    color:#505458;
}
</style>
