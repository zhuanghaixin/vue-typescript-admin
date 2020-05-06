<template>
    <div class="account-data">
        <div class="add-box">
            <el-button type="primary" @click="addAccount">新增账户</el-button>
        </div>
        <el-table :data="tableData" border style="width:100%">
            <el-table-column label="角色" widht="180">
                <template v-slot:default="scopeProps">
                    <el-select v-if="scopeProps.row.edit" v-model="scopeProps.row.role"
                               @change="selectChange(scopeProps.row)">
                        <el-option
                                v-for="option in options"
                                :label="option.role"
                                :value="option.role"
                                :key="option.key"> 
                        </el-option>
                    </el-select>
                    <span v-else>{{scopeProps.row.role}}</span>
                </template>
            </el-table-column>
            <el-table-column label="账户" widht="180">
                <template v-slot:default="scopeProps">
                    <el-input v-model="scopeProps.row.username" v-if="scopeProps.row.edit"></el-input>
                    <span v-else>{{scopeProps.row.username}}</span>
                </template>
            </el-table-column>
            <el-table-column label="描述" widht="180">
                <template v-slot:default="scopeProps">
                    <span>{{scopeProps.row.des}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template v-slot:default="scopeProps">
                    <template v-if="scopeProps.row.username!=='admin'">
                        <el-button size="mini" @click="handleEdit(scopeProps.$index,scopeProps.row)"
                                   v-if="!scopeProps.row.edit">编辑
                        </el-button>
                        <el-button size="mini" type="success" v-else
                                   @click="handleComplete(scopeProps.$index,scopeProps.row)">完成
                        </el-button>

                        <el-button size="mini" type="danger" @click="handleDelete(scopeProps.$index,scopeProps.row)">
                            删除
                        </el-button>
                    </template>

                </template>
            </el-table-column>
        </el-table>
        <AddAccount :dialogVisible="dialogVisible" :options="options" @update="getData"
                    @closeDialog="closeDialog"></AddAccount>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Provide} from 'vue-property-decorator'
    import AddAccount from './AddAccount.vue'

    @Component({
        components: {
            AddAccount
        }
    })
    export default class AccountData extends Vue {
        @Provide() tableData: any = [];
        @Provide() dialogVisible: Boolean = false;//是否展示编辑页面
        //select数据
        @Provide() options: any = [
            {
                key: 'admin',
                role: '管理员',
                des: 'Super Administrator. Have access to view all pages.'
            },
            {
                key: 'editor',
                role: '客服',
                des: 'Normal Editor. Can see all pages except permission page'
            },
            {
                key: 'visitor',
                role: '游客',
                des: 'Just a visitor. Can only see the home page and the document page'
            }
        ]

        created() {
            this.getData()

        }

        getData() {
            (this as any).$axios("/api/users/allUsers").then((res: any) => {
                //设置编辑状态
                res.data.datas.forEach((item: any) => {
                    item.edit = false
                })

                // console.log(res.data.datas)
                this.tableData = res.data.datas

            })
        }

        //新增账户
        addAccount() {
            this.dialogVisible = true
        }

        //关闭Dialog
        closeDialog() {
            console.log(111111111)
            this.dialogVisible = false
        }

        //编辑表单
        handleEdit(index: number, row: any) {
            // console.log('index')
            // console.log(index)
            // console.log('row')
            // console.log(row.edit)
            row.edit = true

        }

        //当我们选择的时候，需要对el-select的change事件进行监听
        selectChange(item: any) {
            this.options.map((option: any) => {
                if (option.role == item.role) {
                    item.key = option.key;
                    item.des = option.des;
                }
            })
            // console.log('this.option')
            // console.log(this.options)

        }

        //完成表单
        handleComplete(index: number, row: any) {

            row.edit = false;
            (this as any).$axios.post(`/api/users/editUser/${row._id}`, row)
                .then((res: any) => {
               this.$message({
                   message:res.data.msg,
                   type:"success"
               })
            })
        }


        //删除数据
        handleDelete(index: number, row: any): void {
            // 删除
            console.log(row._id);
            (this as any).$axios
                .delete(`/api/users/deleteUser/${row._id}`)
                .then((res: any) => {
                    this.$message({
                        message: res.data.msg,
                        type: "success"
                    });

                    this.tableData.splice(index, 1);
                    this.getData()
                });
        }
    }
</script>

<style scoped lang="scss">
    .account-data {
        height: 100%;
        overflow: auto;

        .add-box {
            margin-bottom: 10px;
        }
    }
</style>
 
