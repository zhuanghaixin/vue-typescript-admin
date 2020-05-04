<template>
    <div class="table-data">
       <div class="search-box">
           <el-input size="small" v-model="searchVal" placeholder="请输入课程名称检索"></el-input>
           <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
       </div>
        <el-table :data="tableData" border
                  style="width: 100%" :height="tHeight" class="table-box">
            <el-table-column label="序号" type="index" width="60">

            </el-table-column>
            <el-table-column label="课程名称" prop="title"  >

            </el-table-column>
            <el-table-column label="课程等级"  prop="level" width="120" >

            </el-table-column>
            <el-table-column label="技术栈"  prop="type" width="120" >

            </el-table-column>
            <el-table-column label="报名人数"  prop="count" width="120" >

            </el-table-column>
            <el-table-column label="上线日期"  prop="date" width="180" >

            </el-table-column>
            <el-table-column label="操作" width="180">
                <template v-slot:default="scopeProps">
                    <el-button size="mini" @click="handleEdit(scopeProps.$index,scopeProps.row)">编辑</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pages" ref="page-box">
            <el-pagination
                    :page-sizes="[5,10,20]"
                    :page-size="size"
                    layout="total,sizes,prev,pager,next,jumper"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
        <EditDialog :dialogVisible="dialogVisible" :form="formData"></EditDialog>
    </div>
</template>

<script lang="ts">
    import {Component,Vue,Provide} from 'vue-property-decorator'
    import EditDialog from "./EditDialog.vue"
    @Component({
        components:{
            EditDialog
        }
    })

    export default class TableData extends Vue{
        @Provide() searchVal:string="";  //搜索框
        @Provide()tHeight:number=document.body.offsetHeight-270  //  从上边到顶部是200px 从下边到底部是70px
        @Provide() tableData:any=[]  //获取展示的表格数据
        @Provide() page:number=1  //如果数据总共有100条，从1开始取数据，当前的page
        @Provide() size:number=5 //取5条数据
        @Provide() total:number=0 //总数据条数

        @Provide() dialogVisible:Boolean=false;//是否展示编辑页面
        @Provide() formData:object={  //要编辑的表单数据
            title:'',
            type:'',
            level:'',
            count:'',
            date:''
        }


        created(){
            this.loadData()
        }
        //加载数据
        loadData(){
            (this as any).$axios(`/api/profiles/loadMore/${this.page}/${this.size}`).then((res:any)=>{
                console.log(res.data)
                this.tableData=res.data.data.list
                this.total=res.data.data.total


            })
        }
        //处理页码大小
        handleSizeChange(val:number):void{
            this.size=val;
            this.searchVal?this.loadSearchData():this.loadData()
            console.log(this.size)
            this.page=1
            this.loadData()

        }
        //当前页变动时候
        handleCurrentChange(val:number):void{
            this.page=val;
            this.searchVal?this.loadSearchData():this.loadData()
            console.log(this.page)
            this.loadData()

        }
        //点击搜索
        handleSearch():void{
            this.page=1
            this.searchVal?this.loadSearchData():this.loadData()
            this.loadSearchData()

        }
        //加载搜索数据
        loadSearchData(){
            (this as any).$axios.get(`/api/profiles/search/${this.searchVal}/${this.page}/${this.size}`).then((res:any)=>{
                console.log(res)
                this.tableData = res.data.datas.list;
                this.total = res.data.datas.total;

            }).catch((err:any)=>{
                this.$message({
                    message: err,
                    type: "error"

                })
            })
        }

        //编辑表单
        handleEdit(index:number,row:any){
            console.log('index')
            console.log(index)
            console.log('row')
            console.log(row)
            this.formData=row
            this.dialogVisible=true
        }

    }
</script>

<style scoped lang="scss">
    .table-data {
        height: 100%;
        .table-box {
            font-size: 14px;
        }
        .pages {
            background: #fff;
            margin-top: 10px;
            padding: 10px 10px;
            text-align: right;
            height: 55px;
            box-sizing: border-box;
        }
        .search-box {
            background: #fff;
            margin-bottom: 10px;
            padding: 10px 10px;
            border-radius: 4px;
            height: 55px;
            box-sizing: border-box;
            .el-input {
                width: 200px;
                margin-right: 10px;
            }
        }
    }
</style>
 
