import {GetterTree} from 'vuex';
const getters:GetterTree<any,any>={
    //user里面得到state,返回值也是any
    user(state:any): any{
    return state.user
},
    //获取路由
    routers(state:any): any{
        return state.routers
    }
}

export default getters;


