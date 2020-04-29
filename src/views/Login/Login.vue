<template>
    <div class="login">
       <LoginHeader>
           <el-form
                   slot="container"
                   :model="ruleForm"
                   label-position="left"
                   label-width="0px"
                   :rules="rules"

           >
               <div class="title">
                   <h3>账号密码登录</h3>
               </div>

<!--               username-->
               <el-form-item prop="username">
                   <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号:admin">
                       <i class="fa fa-user-o"  slot="prefix"></i>
                   </el-input>
               </el-form-item>
<!--               password-->
               <el-form-item prop="pwd">
                   <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="密码:123456">
                       <i class="fa fa-lock"  slot="prefix"></i>
                   </el-input>
               </el-form-item>
<!--               登录框-->
               <el-form-item>
                   <el-button :loading="isLogin"
                           type="primary" style="width: 100%" @click.native.prevent="handleSubmit">登录</el-button>
               </el-form-item>
<!--               7天自动登录/忘记密码-->
               <el-form-item>
                   <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">7天自动登录</el-checkbox>
                   <el-button type="text" class="forget" @click="goPassword">忘记密码？</el-button>
               </el-form-item>

           </el-form>
       </LoginHeader>
    </div>
</template>

<script lang="ts">
import { Component,Vue,Provide,Emit} from 'vue-property-decorator'
import LoginHeader from './LoginHeader.vue'
    @Component({
        components: {
            LoginHeader
        }
    })
    export default class Login extends Vue {
        @Emit()
        goPassword():void{
            this.$router.push({name:'Password'})
        }




        // isLogin
        @Provide() isLogin:boolean=false

        // 表单填写的各个属性
        @Provide() ruleForm: {
            //存储的数据类型
            username: string;
            pwd: string;
            autoLogin: boolean;
        } = {
            //存储的值
            username: "",
            pwd: "",
            autoLogin: true //是否自动登录
        }
        // 表单验证
        @Provide() rules={
            username:[{required:true,message:'请输入账号',trigger: 'blur' }],
            pwd:[{required:true,message:'请输入密码',trigger: 'blur' }]
        }

        handleSubmit():void{
            (this.$refs["ruleForm"] as any).validate((valid:boolean)=>{
              if(valid){
                  // console.log("检验通过")
                  this.isLogin=true;
                  (this as any).$axios.post('/api/users/login',this.ruleForm).then((res:any)=>{
                      this.isLogin=false;
                      console.log(res.data)
                      //存储token
                      localStorage.setItem("tsToken",res.data.token)

                  }).catch(()=>{
                      this.isLogin=false;
                  })
              }
            });
        }

    }
</script>

<style scoped lang="scss">
.title{
    margin: 0px auto 40px auto;
    text-align: center;
    color:#505458;
}
i {
    font-size: 14px;
    margin-left: 8px;
}
    .forget{
        float:right;
    }
</style>
