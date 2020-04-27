<template>
    <div class="password">
        <LoginHeader>
            <el-form slot="container">
                <div class="title">
                    <h3>找回密码</h3>
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
    export default class Password extends Vue{

    }
</script>

<style scoped>

</style>
