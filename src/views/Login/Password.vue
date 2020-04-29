<template>
    <div class="password">
        <LoginHeader>
            <el-form
                    slot="container"
                    :model="ruleForm"
                    label-position="left"
                    label-width="0px"
                    :rules="rules"
                    ref="ruleForm"
            >
                <div class="title">
                    <h3>找回密码</h3>
                </div>

                <!--               username-->
                <el-form-item prop="username">
                    <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号:admin">
                        <i class="fa fa-user-o"  slot="prefix"></i>
                    </el-input>
                </el-form-item>
                <!--               email-->
                <el-form-item prop="email">
                    <el-input type="text" v-model="ruleForm.email" auto-complete="off" placeholder="邮箱:27732357@qq.com">
                        <i class="fa fa-envelope-o"  slot="prefix"></i>
                    </el-input>
                </el-form-item>
                <!--               确定框-->
                <el-form-item>
                    <el-button type="primary" style="width: 100%" :loading="loading" @click.native.prevent="handleSubmit">确定</el-button>
                </el-form-item>

            </el-form>
        </LoginHeader>
    </div>
</template>

<script lang="ts">
    import { Component,Vue,Provide} from 'vue-property-decorator'
    import LoginHeader from './LoginHeader.vue'
    @Component({
        components: {
            LoginHeader
        }
    })
    export default class Password extends Vue{
        @Provide() loading:boolean=false;//是否发起网络请求
        @Provide() ruleForm: {
            //存储的数据类型
            username: string;
            email: string;
        } = {
            //存储的值
            username: "",
            email: "",
        }


        // 表单验证
        @Provide() rules={
            username:[{required:true,message:'请输入账号:admin',trigger: 'blur' }],
            email:[
                {required:true,message:'请输入邮箱',trigger: 'blur' },
                {
                    type:"email",
                    message:'请输入正确的邮箱地址',
                    trigger: 'change,blur',

                },
                {
                    type:"email",
                    message:'请输入正确的邮箱地址',
                    trigger: 'blur',

                }
            ]
        }
        handleSubmit():void{
            (this.$refs["ruleForm"] as any).validate((valid:boolean)=>{
                if(valid){
                    this.loading=true;
                    (this as any).$axios.post("/api/users/findPwd",this.ruleForm).then((res:any)=>{
                        this.loading=false;
                        console.log(res.data)
                        this.$message({
                            message:res.data.msg,
                            type:"success"
                        })
                        this.$router.push({name:'Login'})
                    }).catch((err:any)=>{
                        this.loading=true;
                    });
                }
            })
        }

    }
</script>

<style scoped>
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
