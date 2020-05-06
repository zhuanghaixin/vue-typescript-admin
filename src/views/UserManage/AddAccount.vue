<template>
    <el-dialog title="新增账户" :visible.sync="dialogVisible" :close-on-click-modal="false"
               :before-close="handleClose" width="30%">
        <el-form ref="ruleForm" :model="account" label-width="100px" size="small" class="form-box" :rules="rules">
            <!--            prop 属性-->
            <el-form-item label="请选择角色" prop="role">
                <el-select v-model="account.role" placeholder="请选择角色" @change="selectChange">
<!--                    //把从AccountData中获取的数组数据进行遍历-->
                    <el-option v-for="option in options" :label="option.role" :value="option.role" :key="option.key"> 
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请输入账号" prop="username">
                <el-input type="text" v-model="account.username"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('closeDialog')" size="small">取 消</el-button>
            <el-button type="primary" @click="handleAdd('ruleForm')">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
    import { Component, Vue,Prop,Provide,Emit} from "vue-property-decorator";
    @Component({
        components: {}
    })
    export default class AddAccount extends Vue {
        // 属性或参数中使用 ！：表示强制解析（告诉typescript编译器，这里一定有值），常用于vue-decorator中的@Prop
        @Prop(Boolean) dialogVisible!:boolean;
        //拿到的数组
        @Prop(Array) options!:any
        @Provide() account:object= {
            key: '',
            role: '',
            username: '',
            des: ''
        }
        // 表单验证
        @Provide() rules: any = {
            username: [{ required: true, message: "请输入账号", trigger: "blur" }],
            role: [{ required: true, message: "请选择角色", trigger: "change" }]
        };
        //右上角关闭dialog
        handleClose() {
            this.$confirm('确认关闭？')
                .then(() => {
                    this.$emit('closeDialog')
                })
                .catch(()=> {});
        }
        //
        selectChange(select:string){
           this.options.map((option:any)=>{
               console.log(option)
               if(option.role==select){
                   (this as any).account.key=option.key;
                   (this as any).account.des=option.des
               }
           })
            // console.log(this.options)
            // console.log('this.account')
            // console.log(this.account)
        }


        @Emit('closeDialog')
        //提交表单
        handleAdd(formName:string){
            (this.$refs[formName] as any).validate((valid: boolean) => {
                if (valid) {
                    (this as any).$axios
                        .post("/api/users/addUser/",this.account)
                        .then((res: any) => {
                            // console.log(res.data);
                            this.$emit("update");
                            this.$message({
                                message: res.data.msg,
                                type: "success"
                            });
                        });
                }
            });
        }
        created(){
            console.log('this.dialogVisible')
            console.log(this.dialogVisible)
            console.log('this.form')
            // console.log(this.form)

        }

    }

</script>


<style lang="scss" scoped>
    .form-box {
        .el-input,
        .el-select {
            width: 60% !important;
        }
    }
</style>
