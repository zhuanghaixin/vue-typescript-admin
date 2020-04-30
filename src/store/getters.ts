import {GetterTree} from 'vuex';
const getters:GetterTree<any,any>={
    //user里面得到state,返回值也是any
    user(state:any): any{
    return state.user
}
}

export default getters;


