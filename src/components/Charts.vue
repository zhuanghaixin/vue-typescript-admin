<template>
    <div class="chart" :style="{width:chartWidth,height:chartHeight}">

    </div>
</template>

<script lang="ts">
    import {Component,Vue,Provide,Prop} from 'vue-property-decorator'
    import echarts from 'echarts'
    @Component({
        components:{}
    })
    export default class Charts extends Vue{
        //图表类型 line/bar/pie
        @Prop({type:String,default:"line"}) readonly chartType!:string
        //图表数据
        @Prop(Object) chartData!:string | null
        //
        @Provide() chartWidth:string="";
        @Provide() chartHeight:string="";

        created(){
            this.generatorWidthAndHeight();
        }
        //给图表生成宽度和高度
        generatorWidthAndHeight(){
            this.chartWidth=`${document.body.offsetWidth*0.8}px`
            this.chartHeight=`${document.body.offsetHeight*0.6}px`
        }




    }
</script>

<style scoped lang="scss">

</style>
 
