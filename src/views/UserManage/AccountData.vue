<template>
    <div class="account-data">
        <div class="add-box">
            <el-button type="primary">新增账户</el-button>
        </div>
            <el-table :data="tableData" border style="width:100%">
                <el-table-column label="角色" widht="180">
                    <template v-slot:default="scopeProps">
                        <span>{{scopeProps.row.role}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="账户" widht="180">
                    <template v-slot:default="scopeProps">
                        <span>{{scopeProps.row.username}}</span>
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
                            <el-button size="mini" @click="handleEdit(scopeProps.$index,scopeProps.row)">编辑</el-button>
                            <el-button size="mini" type="danger"   @click="handleDelete(scopeProps.$index,scopeProps.row)">删除</el-button>
                        </template>

                    </template>
                </el-table-column>
            </el-table>

    </div>
</template>

<script lang="ts">
    import {Component, Vue, Provide} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class AccountData extends Vue {
        @Provide() tableData: any = [];

        created() {
            this.getData()

        }

        getData() {
            (this as any).$axios("/api/users/allUsers").then((res: any) => {
                console.log(res.data.datas)
                this.tableData = res.data.datas

            })
        }
        //编辑表单
        handleEdit(index:number,row:any){
            console.log('index')
            console.log(index)
            console.log('row')
            console.log(row)

        }


        //删除数据
        handleDelete(index:number, row:any){
            console.log(row._id);
            (this as any).$axios.delete(`/api/profiles/delete/${row._id}`).then((res:any)=>{
                this.$message({
                    message:res.data.msg,
                    type:"success"
                })
            })
            this.tableData.splice(index,1)
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
 
